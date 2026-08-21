"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { useAccountHydration } from "@/components/auth/AccountHydrationProvider";
import { parseZpResponse, type ZpSummary } from "@/lib/zp/contract";

export type ZpHydration = Readonly<{ status: "idle"; zp: null }> | Readonly<{ status: "loading"; zp: null }> | Readonly<{ status: "error"; zp: null }> | Readonly<{ status: "ready"; zp: ZpSummary }>;
type StoredZpHydration = ZpHydration & Readonly<{ accountKey?: string }>;
type ZpPreviewMode = "populated" | "zero" | "loading" | "error";

const idle: ZpHydration = { status: "idle", zp: null };
const ZpHydrationContext = createContext<ZpHydration | null>(null);

export function getDevelopmentZpPreview(search: string): ZpHydration | undefined {
  if (process.env.NODE_ENV !== "development") return undefined;
  const mode = new URLSearchParams(search).get("zpPreview") as ZpPreviewMode | null;
  if (mode === "loading" || mode === "error") return { status: mode, zp: null };
  if (mode === "populated") return { status: "ready", zp: {
    totalPoints: "340", sentCount: "17", receivedCount: "3", policyVersion: 1,
    unlockedMilestones: ["FIRST_PAYMENT_SENT", "FIRST_PAYMENT_RECEIVED", "TEN_PAYMENTS_SENT"],
    pendingMilestones: [{ milestone: "TWENTY_FIVE_PAYMENTS_SENT", dimension: "SENT", current: "17", target: "25", progressPercent: 68 }],
  } };
  if (mode === "zero") return { status: "ready", zp: {
    totalPoints: "0", sentCount: "0", receivedCount: "0", policyVersion: 1, unlockedMilestones: [],
    pendingMilestones: [
      { milestone: "FIRST_PAYMENT_SENT", dimension: "SENT", current: "0", target: "1", progressPercent: 0 },
      { milestone: "FIRST_PAYMENT_RECEIVED", dimension: "RECEIVED", current: "0", target: "1", progressPercent: 0 },
      { milestone: "TEN_PAYMENTS_SENT", dimension: "SENT", current: "0", target: "10", progressPercent: 0 },
      { milestone: "TWENTY_FIVE_PAYMENTS_SENT", dimension: "SENT", current: "0", target: "25", progressPercent: 0 },
    ],
  } };
  return undefined;
}

export function ZpHydrationProvider({ children }: Readonly<{ children: ReactNode }>) {
  const { account, status: accountStatus } = useAccountHydration();
  const [stored, setStored] = useState<StoredZpHydration>(idle);
  const accountKey = accountStatus === "authenticated" ? account?.id : undefined;

  useEffect(() => {
    if (!accountKey) return;
    const controller = new AbortController();
    const preview = getDevelopmentZpPreview(window.location.search);
    if (preview) {
      const previewTimer = window.setTimeout(() => setStored({ ...preview, accountKey }), 0);
      return () => { window.clearTimeout(previewTimer); controller.abort(); };
    }
    void (async () => {
      try {
        const response = await fetch("/api/account/zp", { cache: "no-store", credentials: "same-origin", signal: controller.signal });
        const raw: unknown = await response.json().catch(() => undefined), data = parseZpResponse(raw);
        if (!response.ok || !data) throw new Error("unavailable");
        if (!controller.signal.aborted) setStored({ status: "ready", zp: data.zp, accountKey });
      } catch { if (!controller.signal.aborted) setStored({ status: "error", zp: null, accountKey }); }
    })();
    return () => controller.abort();
  }, [accountKey]);

  const value = useMemo<ZpHydration>(() => {
    if (!accountKey) return idle;
    if (stored.accountKey !== accountKey) return { status: "loading", zp: null };
    return stored.status === "ready" ? { status: "ready", zp: stored.zp } : { status: stored.status, zp: null };
  }, [accountKey, stored]);
  return <ZpHydrationContext.Provider value={value}>{children}</ZpHydrationContext.Provider>;
}

export function useZpHydration(): ZpHydration {
  const value = useContext(ZpHydrationContext);
  if (!value) throw new Error("useZpHydration must be used within ZpHydrationProvider.");
  return value;
}
