"use client";

import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";

import { useAccountHydration } from "@/components/auth/AccountHydrationProvider";
import { parseZpResponse, type ZpSummary } from "@/lib/zp/contract";

export type ZpHydration = Readonly<{ status: "idle"; zp: null; preview?: true }> | Readonly<{ status: "loading"; zp: null; preview?: true }> | Readonly<{ status: "error"; zp: null; preview?: true }> | Readonly<{ status: "ready"; zp: ZpSummary; preview?: true }>;
type StoredZpHydration = ZpHydration & Readonly<{ accountKey?: string }>;
type ZpPreviewMode = "populated" | "zero" | "loading" | "error";
type AccountStatus = "loading" | "authenticated" | "authenticated-unavailable" | "signed-out" | "error";

const idle: ZpHydration = { status: "idle", zp: null };
const ZpHydrationContext = createContext<ZpHydration | null>(null);

function subscribeToLocation(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}
function currentSearch() { return window.location.search; }
function serverSearch() { return ""; }

export function resolveZpHydration(accountStatus: AccountStatus, accountKey: string | undefined, stored: StoredZpHydration, preview?: ZpHydration): ZpHydration {
  if (preview) return preview;
  if (accountStatus === "loading") return { status: "loading", zp: null };
  if (accountStatus === "signed-out") return idle;
  if (accountStatus === "authenticated-unavailable" || accountStatus === "error" || !accountKey) return { status: "error", zp: null };
  if (stored.accountKey !== accountKey) return { status: "loading", zp: null };
  return stored.status === "ready" ? { status: "ready", zp: stored.zp } : { status: stored.status, zp: null };
}

export function getDevelopmentZpPreview(search: string): ZpHydration | undefined {
  if (process.env.NODE_ENV !== "development") return undefined;
  const mode = new URLSearchParams(search).get("zpPreview") as ZpPreviewMode | null;
  if (mode === "loading" || mode === "error") return { status: mode, zp: null, preview: true };
  if (mode === "populated") return { status: "ready", preview: true, zp: {
    totalPoints: "340", sentCount: "17", receivedCount: "3", policyVersion: 1,
    unlockedMilestones: ["FIRST_PAYMENT_SENT", "FIRST_PAYMENT_RECEIVED", "TEN_PAYMENTS_SENT"],
    pendingMilestones: [{ milestone: "TWENTY_FIVE_PAYMENTS_SENT", dimension: "SENT", current: "17", target: "25", progressPercent: 68 }],
  } };
  if (mode === "zero") return { status: "ready", preview: true, zp: {
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

export function shouldRequestZp(accountStatus: AccountStatus, accountKey: string | undefined, preview?: ZpHydration): boolean {
  return accountStatus === "authenticated" && Boolean(accountKey) && !preview;
}

export function ZpHydrationProvider({ children }: Readonly<{ children: ReactNode }>) {
  const { account, status: accountStatus } = useAccountHydration();
  const locationSearch = useSyncExternalStore(subscribeToLocation, currentSearch, serverSearch);
  const [stored, setStored] = useState<StoredZpHydration>(idle);
  const accountKey = accountStatus === "authenticated" ? account?.id : undefined;
  const previewSearch = process.env.NODE_ENV === "development" ? locationSearch : "";
  const previewEligible = accountStatus === "authenticated" || accountStatus === "authenticated-unavailable";
  const preview = previewEligible ? getDevelopmentZpPreview(previewSearch) : undefined;

  useEffect(() => {
    if (!shouldRequestZp(accountStatus, accountKey, preview) || !accountKey) return;
    const controller = new AbortController();
    void (async () => {
      try {
        const response = await fetch("/api/account/zp", { cache: "no-store", credentials: "same-origin", signal: controller.signal });
        const raw: unknown = await response.json().catch(() => undefined), data = parseZpResponse(raw);
        if (!response.ok || !data) throw new Error("unavailable");
        if (!controller.signal.aborted) setStored({ status: "ready", zp: data.zp, accountKey });
      } catch { if (!controller.signal.aborted) setStored({ status: "error", zp: null, accountKey }); }
    })();
    return () => controller.abort();
  }, [accountKey, accountStatus, preview]);

  const value = useMemo<ZpHydration>(() => resolveZpHydration(accountStatus, accountKey, stored, preview), [accountKey, accountStatus, preview, stored]);
  return <ZpHydrationContext.Provider value={value}>{children}</ZpHydrationContext.Provider>;
}

export function useZpHydration(): ZpHydration {
  const value = useContext(ZpHydrationContext);
  if (!value) throw new Error("useZpHydration must be used within ZpHydrationProvider.");
  return value;
}
