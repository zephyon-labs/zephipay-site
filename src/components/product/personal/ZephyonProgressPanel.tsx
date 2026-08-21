"use client";

import { useZpHydration } from "@/components/auth/ZpHydrationProvider";
import { ZP_MILESTONE_LABELS, type ZpPendingMilestone, type ZpSummary } from "@/lib/zp/contract";

export type ZpViewState = Readonly<{ status: "loading" | "error"; zp?: never }> | Readonly<{ status: "ready"; zp: ZpSummary }>;

export function selectPrimaryPendingMilestone(milestones: readonly ZpPendingMilestone[]): ZpPendingMilestone | undefined {
  return milestones.reduce<ZpPendingMilestone | undefined>((selected, milestone) =>
    !selected || milestone.progressPercent > selected.progressPercent ? milestone : selected, undefined);
}

export function ZephyonProgressPanel() {
  const hydrated = useZpHydration();
  const state: ZpViewState = hydrated.status === "ready" ? hydrated : { status: hydrated.status === "error" ? "error" : "loading" };
  return <ZephyonProgressView state={state} />;
}

export function ZephyonProgressView({ state }: Readonly<{ state: ZpViewState }>) {
  return <section id="zephyon-progress" aria-labelledby="zephyon-progression-heading" className="scroll-mt-28 border-b border-border-subtle bg-background/55 p-6 sm:p-8">
    <div className="mb-6 max-w-2xl"><p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">Account progression</p><h2 id="zephyon-progression-heading" className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-foreground">Your Zephyon progress</h2></div>
    <div className="grid gap-4 lg:grid-cols-[1.45fr_0.55fr]"><ZpCard state={state} /><ZtsCard /></div>
  </section>;
}

function ZpCard({ state }: Readonly<{ state: ZpViewState }>) {
  return <article aria-labelledby="zp-card-heading" className="min-w-0 overflow-hidden rounded-[1.5rem] border border-brand-primary/25 bg-surface-glass p-6 shadow-[var(--shadow-soft)] sm:p-7">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">ZP</p><h3 id="zp-card-heading" className="mt-2 text-lg font-semibold text-foreground">Zephyon Points</h3></div><span className="rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1 text-xs text-brand-secondary">Activity progression</span></div>
    {state.status === "loading" ? <div className="mt-7 min-h-72" aria-busy="true" aria-label="Loading ZP progress"><div className="h-14 w-40 max-w-full animate-pulse rounded-xl bg-surface-secondary" /><div className="mt-7 h-3 animate-pulse rounded-full bg-surface-secondary" /><div className="mt-4 h-5 w-56 max-w-full animate-pulse rounded-lg bg-surface-secondary" /><div className="mt-8 grid gap-3"><div className="h-11 animate-pulse rounded-2xl bg-surface-secondary" /><div className="h-11 animate-pulse rounded-2xl bg-surface-secondary" /></div></div> : null}
    {state.status === "error" ? <div className="mt-7 min-h-72"><div className="h-14 w-40 max-w-full rounded-xl bg-surface-secondary/70" aria-hidden="true" /><div className="mt-7 h-3 overflow-hidden rounded-full border border-border-subtle bg-surface-secondary/70" aria-hidden="true"><span className="block h-full w-0" /></div><div className="mt-5 rounded-2xl border border-border-subtle bg-background/45 p-5"><p role="status" className="text-sm text-foreground-secondary">ZP progress is temporarily unavailable.</p></div></div> : null}
    {state.status === "ready" ? <ZpDetails zp={state.zp} /> : null}
  </article>;
}

function ZpDetails({ zp }: Readonly<{ zp: ZpSummary }>) {
  const primary = selectPrimaryPendingMilestone(zp.pendingMilestones);
  const remaining = primary ? zp.pendingMilestones.filter((item) => item !== primary) : [];
  return <div className="mt-7">
    <p className="break-words text-5xl font-semibold tracking-[-0.055em] text-foreground sm:text-6xl"><span>{zp.totalPoints}</span> <span className="text-2xl tracking-[-0.03em] text-foreground-secondary">ZP</span></p>
    <p className="mt-3 max-w-xl text-sm leading-6 text-foreground-secondary">{zp.totalPoints === "0" ? "Your Zephyon progression starts with meaningful activity." : "Progress reflects qualifying activity recorded for your account."}</p>
    {primary ? <div className="mt-7 rounded-2xl border border-brand-primary/20 bg-background/55 p-5 sm:p-6"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">Toward</p><p className="mt-2 text-lg font-semibold text-foreground">{ZP_MILESTONE_LABELS[primary.milestone]}</p></div><p className="text-sm text-foreground-secondary"><span className="font-medium text-foreground">{primary.current}</span> / {primary.target}</p></div><div role="progressbar" aria-label={`${ZP_MILESTONE_LABELS[primary.milestone]} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={primary.progressPercent} className="mt-5 h-3 overflow-hidden rounded-full bg-surface-secondary"><span className="block h-full rounded-full bg-brand-primary" style={{ width: `${primary.progressPercent}%` }} /></div><p className="mt-2 text-right text-sm font-medium text-brand-secondary">{primary.progressPercent}%</p></div> : <div className="mt-7 rounded-2xl border border-border-default bg-background/55 p-5 sm:p-6"><p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">Current milestones</p><p className="mt-2 text-lg font-semibold text-foreground">Progress achieved</p><p className="mt-2 text-sm text-foreground-secondary">All currently available milestones are unlocked.</p></div>}
    {zp.unlockedMilestones.length ? <div className="mt-7"><p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">Unlocked</p><ul className="mt-3 flex flex-wrap gap-2">{zp.unlockedMilestones.map((item) => <li key={item} className="inline-flex items-center gap-2 rounded-full border border-border-default bg-background/65 px-3 py-2 text-sm"><span aria-hidden="true" className="text-brand-secondary">✓</span><span>{ZP_MILESTONE_LABELS[item]}</span><span className="sr-only"> unlocked</span></li>)}</ul></div> : null}
    {remaining.length ? <div className="mt-7"><p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">Also in progress</p><ul className="mt-4 grid gap-4">{remaining.map((item) => <li key={item.milestone} className="min-w-0"><div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm"><span className="text-foreground">{ZP_MILESTONE_LABELS[item.milestone]}</span><span className="text-foreground-secondary">{item.current} / {item.target}</span></div><div role="progressbar" aria-label={`${ZP_MILESTONE_LABELS[item.milestone]} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.progressPercent} className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-secondary"><span className="block h-full rounded-full bg-brand-primary/75" style={{ width: `${item.progressPercent}%` }} /></div></li>)}</ul></div> : null}
  </div>;
}

function ZtsCard() {
  return <article aria-labelledby="zts-card-heading" className="min-w-0 rounded-[1.5rem] border border-border-default bg-surface-secondary/45 p-6 sm:p-7"><p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">ZTS</p><h3 id="zts-card-heading" className="mt-2 text-lg font-semibold text-foreground">Zephyon Trust Score</h3><div className="mt-10 border-l-2 border-border-strong pl-5"><p className="text-xl font-semibold tracking-[-0.025em] text-foreground">Trust profile coming soon</p><p className="mt-3 text-sm leading-6 text-foreground-secondary">A future view of account trust and confidence signals. No trust score is available yet.</p></div></article>;
}
