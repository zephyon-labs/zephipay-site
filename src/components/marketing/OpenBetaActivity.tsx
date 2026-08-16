import { formatMockUsdc, type OpenBetaActivity as OpenBetaActivityData } from "@/lib/openBetaActivity/contract";
import { readOpenBetaActivity } from "@/lib/openBetaActivity/serverClient";

export async function OpenBetaActivity() {
  return <OpenBetaActivityPanel activity={await readOpenBetaActivity()} />;
}

export function OpenBetaActivityPanel({ activity }: { activity?: OpenBetaActivityData }) {
  const available = activity !== undefined;
  const zero = activity?.paymentCompletionRate.initiated === 0;
  const metrics = [
    ["Beta testers", available ? String(activity.betaTesters) : "—"],
    ["Payments completed", available ? String(activity.paymentsCompleted) : "—"],
    ["Mock USDC processed", available ? `${formatMockUsdc(activity.mockUsdcProcessed.amountRaw)} Mock USDC` : "—"],
    ["Durable receipts", available ? String(activity.durableReceipts) : "—"],
  ] as const;
  const completionRate = !available ? "—" : zero ? "Not yet available" : `${(activity.paymentCompletionRate.basisPoints! / 100).toFixed(2)}%`;
  const qa = activity?.devnetQa;
  const qaStatus = !available || !qa
    ? "Live QA telemetry syncing"
    : qa.totalLiveRuns === 0
      ? "Live Devnet reporting is being connected"
      : `${qa.passed} live P2P ${qa.passed === 1 ? "test" : "tests"} passed · ${qa.invariantViolationCount} invariant ${qa.invariantViolationCount === 1 ? "violation" : "violations"}`;
  const qaDetail = !available || !qa
    ? "Synthetic Solana Devnet testing is tracked separately from human Open Beta activity."
    : qa.totalLiveRuns === 0
      ? "Synthetic Solana Devnet testing remains separate from human Open Beta metrics."
      : `${qa.passed}/${qa.totalLiveRuns} recorded live Devnet runs passed. Synthetic QA does not affect human beta activity metrics.`;

  return (
    <section aria-labelledby="open-beta-activity-heading" className="mt-6 overflow-hidden rounded-[1.65rem] border border-brand-primary/25 bg-surface-glass shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:mt-8">
      <div className="flex flex-col gap-4 border-b border-border-subtle px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-brand-secondary">Open Beta Activity</p>
          <h2 id="open-beta-activity-heading" className="mt-2 text-xl font-semibold tracking-[-0.03em] sm:text-2xl">Real testing across Mock Rail and Solana Devnet.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">Human Open Beta metrics use simulated Mock Rail settlement; Devnet testing is reported separately. No production or Mainnet funds are transferred.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-brand-secondary">Open Beta</span>
          <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-foreground-muted">Mock Rail</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([label, value]) => <div key={label} className="border-b border-border-subtle p-5 sm:p-6 xl:border-b-0 xl:border-r last:xl:border-r-0">
          <p className="font-mono text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{value}</p>
          <p className="mt-3 text-sm text-foreground-secondary">{label}</p>
        </div>)}
      </div>

      <div className="grid gap-6 border-t border-border-subtle px-5 py-6 sm:px-7 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-foreground-muted">Payment completion rate</p>
          <p className="mt-2 text-lg font-semibold">{completionRate}</p>
          <p className="mt-3 text-sm leading-6 text-foreground-secondary">Settled Mock Rail executions divided by every Mock Rail execution initiated during Open Beta.</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-foreground-muted">Activity status</p>
          <p className="mt-2 text-lg font-semibold">{available ? zero ? "Open Beta activity will appear here" : "Open Beta activity measured" : "Beta activity is temporarily unavailable."}</p>
          <p className="mt-3 text-sm leading-6 text-foreground-secondary">{available ? zero ? "Metrics will populate as authenticated testers complete payments." : "These aggregate metrics come from durable Mock Rail execution and receipt records." : "The homepage and payment experience remain available while telemetry recovers."}</p>
        </div>
      </div>
      <div className="border-t border-brand-primary/20 bg-brand-primary/[0.035] px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-brand-secondary">Solana Devnet Testing</p>
            <p className="mt-2 text-lg font-semibold tracking-[-0.02em] sm:text-xl">{qaStatus}</p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground-secondary">{qaDetail}</p>
          </div>
          <span className="w-fit rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-brand-secondary">
            Devnet testing
          </span>
        </div>
      </div>
    </section>
  );
}
