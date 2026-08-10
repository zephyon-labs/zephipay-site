"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { isAccountResponse, type AccountResponse } from "@/lib/accountResponse";

type AccountHydrationStatus = "loading" | "authenticated" | "signed-out" | "error";
type AccountHydration = Readonly<{
  account: AccountResponse["account"] | null;
  status: AccountHydrationStatus;
  refresh: () => Promise<void>;
  clear: () => void;
}>;

export const ACCOUNT_HYDRATION_REFRESH_EVENT = "zephipay:account-hydration-refresh";

const AccountHydrationContext = createContext<AccountHydration | null>(null);

export function AccountHydrationProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [account, setAccount] = useState<AccountResponse["account"] | null>(null);
  const [status, setStatus] = useState<AccountHydrationStatus>("loading");
  const activeRequest = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    setStatus("loading");
    try {
      const response = await fetch("/api/account", {
        cache: "no-store",
        credentials: "same-origin",
        signal: controller.signal,
      });
      const body: unknown = await response.json().catch(() => undefined);
      if (controller.signal.aborted) return;
      if (response.ok && isAccountResponse(body)) {
        setAccount(body.account);
        setStatus("authenticated");
      } else {
        setAccount(null);
        setStatus(response.status === 401 ? "signed-out" : "error");
      }
    } catch {
      if (!controller.signal.aborted) {
        setAccount(null);
        setStatus("error");
      }
    }
  }, []);

  const clear = useCallback(() => {
    activeRequest.current?.abort();
    activeRequest.current = null;
    setAccount(null);
    setStatus("signed-out");
  }, []);

  useEffect(() => {
    const initialHydration = window.setTimeout(() => { void refresh(); }, 0);
    const revalidate = () => { void refresh(); };
    window.addEventListener(ACCOUNT_HYDRATION_REFRESH_EVENT, revalidate);
    return () => {
      window.clearTimeout(initialHydration);
      activeRequest.current?.abort();
      window.removeEventListener(ACCOUNT_HYDRATION_REFRESH_EVENT, revalidate);
    };
  }, [refresh]);

  const value = useMemo(() => ({ account, status, refresh, clear }), [account, status, refresh, clear]);
  return <AccountHydrationContext.Provider value={value}>{children}</AccountHydrationContext.Provider>;
}

export function useAccountHydration(): AccountHydration {
  const value = useContext(AccountHydrationContext);
  if (!value) throw new Error("useAccountHydration must be used within AccountHydrationProvider.");
  return value;
}
