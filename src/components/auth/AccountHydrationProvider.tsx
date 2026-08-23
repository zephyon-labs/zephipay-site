"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { isAccountResponse, isAuthenticatedAccountFailure, type AccountResponse } from "@/lib/accountResponse";
import { AccountHydrationFence } from "@/lib/auth/accountHydrationFence";
import { AUTH_STATE_HEADER, browserAuthenticationFailure, type BrowserAuthenticationFailure } from "@/lib/auth/authFailure";
import { authenticatedRequests } from "@/lib/auth/authenticatedRequests";
import { AUTHORITY_REVALIDATION_INTERVAL_MS, authorityRevalidationDelay } from "@/lib/auth/authorityRevalidation";
import {
  authenticatedBoundaryKey,
  crossTabAuthAction,
  initialAuthLifecycle,
  transitionAuthLifecycle,
  type AuthLifecycleEvent,
  type AuthLifecycleState,
  type AuthLifecycleStatus,
  type CrossTabAuthMessage,
} from "@/lib/auth/authLifecycle";

export type AccountHydrationStatus = AuthLifecycleStatus;
type Snapshot = AuthLifecycleState & Readonly<{ account: AccountResponse["account"] | null }>;
type AccountHydration = Readonly<{
  account: AccountResponse["account"] | null;
  status: AccountHydrationStatus;
  generation: number;
  boundaryKey?: string;
  refresh: () => Promise<void>;
  beginLogout: () => void;
  clear: () => void;
}>;

export const ACCOUNT_HYDRATION_REFRESH_EVENT = "zephipay:account-hydration-refresh";
const AUTH_LIFECYCLE_CHANNEL = "zephipay:authenticated-lifecycle-v1";

const AccountHydrationContext = createContext<AccountHydration | null>(null);

export function AccountHydrationProvider({ children }: Readonly<{ children: ReactNode }>) {
  const initial: Snapshot = { ...initialAuthLifecycle, account: null };
  const [snapshot, setSnapshot] = useState<Snapshot>(initial);
  const snapshotRef = useRef<Snapshot>(initial);
  const hydrationFence = useRef(new AccountHydrationFence());
  const lastAuthorityCheckAt = useRef(0);
  const trailingAuthorityCheck = useRef<number | undefined>(undefined);
  const channel = useRef<BroadcastChannel | null>(null);

  const commit = useCallback((event: AuthLifecycleEvent, account: AccountResponse["account"] | null = null) => {
    const previous = snapshotRef.current;
    const lifecycle = transitionAuthLifecycle(previous, event);
    const next: Snapshot = { ...lifecycle, account: event.type === "authenticated" ? account : null };
    if (next.generation !== previous.generation) {
      hydrationFence.current.invalidate();
      authenticatedRequests.invalidate();
    }
    snapshotRef.current = next;
    setSnapshot(next);
    if (event.type === "authenticated" && previous.accountId !== event.accountId) {
      channel.current?.postMessage({ type: "principal", accountId: event.accountId } satisfies CrossTabAuthMessage);
    }
  }, []);

  const broadcastLogout = useCallback(() => {
    channel.current?.postMessage({ type: "logout" } satisfies CrossTabAuthMessage);
  }, []);

  const broadcastAuthenticationFailure = useCallback((failure: BrowserAuthenticationFailure) => {
    channel.current?.postMessage({ type: failure === "reauthentication-required" ? "reauthentication-required" : "logout" } satisfies CrossTabAuthMessage);
  }, []);

  const hydrate = useCallback(async (foreground: boolean) => {
    if (foreground) commit({ type: "loading" });
    const ticket = hydrationFence.current.begin(snapshotRef.current);
    lastAuthorityCheckAt.current = Date.now();
    try {
      const response = await fetch("/api/account", {
        cache: "no-store",
        credentials: "same-origin",
        signal: ticket.controller.signal,
      });
      const body: unknown = await response.json().catch(() => undefined);
      if (!hydrationFence.current.mayCommit(ticket, snapshotRef.current)) return;
      if (response.ok && isAccountResponse(body)) {
        commit({ type: "authenticated", accountId: body.account.id }, body.account);
      } else if (response.status === 401) {
        const failure = browserAuthenticationFailure(response) ?? (response.headers.get(AUTH_STATE_HEADER) === "reauthentication-required" ? "reauthentication-required" : "signed-out");
        commit({ type: failure });
        broadcastAuthenticationFailure(failure);
      } else if (isAuthenticatedAccountFailure(body) && !foreground) {
        commit({ type: "authenticated-unavailable" });
      } else if (foreground) {
        commit({ type: "transient-error" });
      } else {
        commit({ type: "authenticated-unavailable" });
      }
    } catch {
      if (!hydrationFence.current.mayCommit(ticket, snapshotRef.current)) return;
      if (foreground) commit({ type: "transient-error" });
      else commit({ type: "authenticated-unavailable" });
    } finally {
      hydrationFence.current.finish(ticket);
    }
  }, [broadcastAuthenticationFailure, commit]);

  const refresh = useCallback(() => hydrate(true), [hydrate]);
  const revalidate = useCallback(() => hydrate(false), [hydrate]);

  const clear = useCallback(() => {
    commit({ type: "signed-out" });
  }, [commit]);

  const beginLogout = useCallback(() => {
    commit({ type: "logout" });
    broadcastLogout();
  }, [broadcastLogout, commit]);

  useEffect(() => authenticatedRequests.subscribeToUnauthorized((failure) => {
    commit({ type: failure });
    broadcastAuthenticationFailure(failure);
  }), [broadcastAuthenticationFailure, commit]);

  useEffect(() => {
    if (!("BroadcastChannel" in window)) return;
    const authChannel = new BroadcastChannel(AUTH_LIFECYCLE_CHANNEL);
    channel.current = authChannel;
    authChannel.onmessage = (message: MessageEvent<CrossTabAuthMessage>) => {
      if (!message.data || !["logout", "reauthentication-required", "principal"].includes(message.data.type)) return;
      const action = crossTabAuthAction(snapshotRef.current, message.data);
      if (action === "invalidate") clear();
      else if (action === "reauthenticate") commit({ type: "reauthentication-required" });
      else if (action === "refresh") void refresh();
      else if (action === "reload") {
        hydrationFence.current.invalidate();
        authenticatedRequests.invalidate();
        window.location.reload();
      }
    };
    return () => {
      channel.current = null;
      authChannel.close();
    };
  }, [clear, commit, refresh]);

  useEffect(() => {
    const activeHydrationFence = hydrationFence.current;
    const initialHydration = window.setTimeout(() => { void refresh(); }, 0);
    const requestedRefresh = () => { void revalidate(); };
    window.addEventListener(ACCOUNT_HYDRATION_REFRESH_EVENT, requestedRefresh);
    return () => {
      window.clearTimeout(initialHydration);
      activeHydrationFence.invalidate();
      window.removeEventListener(ACCOUNT_HYDRATION_REFRESH_EVENT, requestedRefresh);
    };
  }, [refresh, revalidate]);

  useEffect(() => {
    const runAuthorityCheck = () => {
      trailingAuthorityCheck.current = undefined;
      const delay = authorityRevalidationDelay(snapshotRef.current.status, Date.now(), lastAuthorityCheckAt.current);
      if (delay !== 0) return;
      void revalidate();
    };
    const requestAuthorityCheck = () => {
      const now = Date.now();
      const delay = authorityRevalidationDelay(snapshotRef.current.status, now, lastAuthorityCheckAt.current);
      if (delay === undefined) return;
      if (snapshotRef.current.status === "authenticated") commit({ type: "authenticated-unavailable" });
      if (trailingAuthorityCheck.current !== undefined) window.clearTimeout(trailingAuthorityCheck.current);
      if (delay === 0) runAuthorityCheck();
      else trailingAuthorityCheck.current = window.setTimeout(runAuthorityCheck, delay);
    };
    const onVisible = () => { if (document.visibilityState === "visible") requestAuthorityCheck(); };
    window.addEventListener("focus", requestAuthorityCheck);
    window.addEventListener("pageshow", requestAuthorityCheck);
    document.addEventListener("visibilitychange", onVisible);
    const interval = window.setInterval(requestAuthorityCheck, AUTHORITY_REVALIDATION_INTERVAL_MS);
    return () => {
      window.removeEventListener("focus", requestAuthorityCheck);
      window.removeEventListener("pageshow", requestAuthorityCheck);
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(interval);
      if (trailingAuthorityCheck.current !== undefined) window.clearTimeout(trailingAuthorityCheck.current);
    };
  }, [commit, revalidate]);

  const lifecycle = useMemo<AuthLifecycleState>(() => ({ status: snapshot.status, accountId: snapshot.accountId, generation: snapshot.generation }), [snapshot.accountId, snapshot.generation, snapshot.status]);
  const value = useMemo<AccountHydration>(() => ({
    account: snapshot.account,
    status: snapshot.status,
    generation: snapshot.generation,
    boundaryKey: authenticatedBoundaryKey(lifecycle),
    refresh,
    beginLogout,
    clear,
  }), [beginLogout, clear, lifecycle, refresh, snapshot.account, snapshot.generation, snapshot.status]);
  return <AccountHydrationContext.Provider value={value}>{children}</AccountHydrationContext.Provider>;
}

export function useAccountHydration(): AccountHydration {
  const value = useContext(AccountHydrationContext);
  if (!value) throw new Error("useAccountHydration must be used within AccountHydrationProvider.");
  return value;
}
