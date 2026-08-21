"use client";

import Link from "next/link";

import { useAccountHydration } from "@/components/auth/AccountHydrationProvider";
import { useZpHydration, type ZpHydration } from "@/components/auth/ZpHydrationProvider";
import { cn } from "@/utils/cn";

export function AccountProgressStatus({ className }: Readonly<{ className?: string }>) {
  const { account, status: accountStatus } = useAccountHydration();
  const zpState = useZpHydration();
  if (!account || accountStatus !== "authenticated") return null;
  return <AccountProgressStatusView state={zpState} className={className} />;
}

export function AccountProgressStatusView({ state, className }: Readonly<{ state: ZpHydration; className?: string }>) {
  const ready = state.status === "ready";
  const zpText = ready ? state.zp.totalPoints : "—";
  const zpLabel = ready ? `${state.zp.totalPoints} Zephyon Points` : state.status === "error" ? "Zephyon Points temporarily unavailable" : "Loading Zephyon Points";
  return <Link href="/personal#zephyon-progress" aria-label={`${zpLabel}; Zephyon Trust Score not available yet`} className={cn("group inline-flex min-h-10 shrink-0 items-center overflow-hidden rounded-full border border-border-default bg-background/55 text-[0.68rem] shadow-[var(--shadow-soft)] transition-colors hover:border-border-strong hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/45", className)}>
    <span className="inline-flex items-center gap-1.5 border-r border-border-subtle px-2.5 py-2 text-foreground sm:px-3"><span className="font-medium uppercase tracking-[0.12em] text-brand-secondary">ZP</span>{state.status === "loading" ? <span className="h-3 w-8 animate-pulse rounded bg-surface-secondary" aria-hidden="true" /> : <span className="max-w-20 overflow-x-auto whitespace-nowrap font-semibold sm:max-w-28" aria-label={zpLabel}>{zpText}</span>}</span>
    <span className="inline-flex items-center gap-1.5 px-2.5 py-2 text-foreground-muted sm:px-3" aria-label="Zephyon Trust Score not available yet"><span className="font-medium uppercase tracking-[0.12em]">ZTS</span><span aria-hidden="true">—</span></span>
  </Link>;
}
