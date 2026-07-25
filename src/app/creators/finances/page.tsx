import {
  CreatorFinancesWorkspace,
  CreatorStudioPageShell,
} from "@/components/marketing/creator-studio";

export const metadata = {
  title: "Creator Finances | ZephiPay",
  description:
    "Manage creator balances, settlements, payouts, fees, and tax-ready records.",
};

export default function CreatorFinancesPage() {
  return (
    <CreatorStudioPageShell
      eyebrow="Creator Studio"
      title="Finances"
      description="Review balances, settlement activity, payouts, fees, and records through one connected financial workspace."
    >
      <CreatorFinancesWorkspace />

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Traceable settlement
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Follow money from payment to payout.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Creator earnings remain connected to verification,
            settlement status, available balance, fees, and final payout.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Clear costs
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Understand every deduction.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Platform, network, processing, refund, and settlement costs
            should remain visible instead of disappearing into a single
            unexplained total.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Tax-ready organization
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Better records throughout the year.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Verified earnings, refunds, fees, and payouts can be
            organized into exportable records for bookkeeping and
            professional tax review.
          </p>
        </article>
      </section>
    </CreatorStudioPageShell>
  );
}
