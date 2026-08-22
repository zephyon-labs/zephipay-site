"use client";

import Link from "next/link";

import { useAccountHydration } from "@/components/auth/AccountHydrationProvider";
import { useZpHydration, type ZpHydration } from "@/components/auth/ZpHydrationProvider";
import { cn } from "@/utils/cn";

export function AccountProgressStatus({ className }: Readonly<{ className?: string }>) {
  const { account, status: accountStatus } = useAccountHydration();
  const zpState = useZpHydration();
  if (!shouldShowAccountProgress(Boolean(account), accountStatus, zpState)) return null;
  return <AccountProgressStatusView state={zpState} className={className} />;
}

export function shouldShowAccountProgress(accountPresent: boolean, accountStatus: string, zpState: ZpHydration): boolean {
  return (accountPresent && accountStatus === "authenticated")
    || (accountStatus === "authenticated-unavailable" && zpState.preview === true);
}

export function AccountProgressStatusView({ state, className }: Readonly<{ state: ZpHydration; className?: string }>) {
  const ready = state.status === "ready";
  const zpText = ready ? state.zp.totalPoints : "—";
  const zpLabel = ready ? `${state.zp.totalPoints} Zephyon Points` : state.status === "error" ? "Zephyon Points temporarily unavailable" : "Loading Zephyon Points";
  return <Link href="/personal#zephyon-progress" aria-label={`${zpLabel}; Zephyon Trust Score not available yet`} className={cn("group inline-flex min-h-10 shrink-0 items-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-border-default bg-background/45 px-2.5 text-[0.68rem] transition-colors hover:border-border-strong hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/45 sm:px-3", className)}>
    <span className="inline-flex items-center gap-1 text-foreground"><span className="font-medium uppercase tracking-[0.1em] text-brand-secondary">ZP</span>{state.status === "loading" ? <span className="h-3 w-7 animate-pulse rounded bg-surface-secondary" aria-hidden="true" /> : <span className="max-w-20 overflow-x-auto font-semibold sm:max-w-28" aria-label={zpLabel}>{zpText}</span>}</span>
    <span aria-hidden="true" className="text-border-strong">·</span>
    <span className="inline-flex items-center gap-1 text-foreground-muted" aria-label="Zephyon Trust Score not available yet"><span className="font-medium uppercase tracking-[0.1em]">ZTS</span><span aria-hidden="true">—</span></span>
  </Link>;
}
