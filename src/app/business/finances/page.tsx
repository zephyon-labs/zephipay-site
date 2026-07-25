import {
  BusinessFinancesWorkspace,
  BusinessStudioPageShell,
} from "@/components/marketing/business-studio";

export const metadata = {
  title: "Finances | ZephiPay Business",
  description:
    "Review balances, settlement, deposits, fees, bank destinations, exports, and accounting records.",
};

export default function BusinessFinancesPage() {
  return (
    <BusinessStudioPageShell
      title="Finances"
      description="Review balances, settlement, deposits, fees, bank destinations, exports, and accounting records."
    >
      <BusinessFinancesWorkspace />

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Financial clarity
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Know where every dollar stands.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Available funds, pending settlement, deposits, refunds, and
            fees remain visible without forcing businesses to reconcile
            disconnected payment records.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Settlement continuity
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Follow funds from payment to deposit.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Payment confirmation, settlement status, availability, and
            destination transfers can remain connected as one auditable
            financial flow.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Accounting ready
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Preserve records before reporting begins.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Verified receipts, fee summaries, settlement reports, and
            activity exports can remain structured for bookkeeping,
            reconciliation, and future tax workflows.
          </p>
        </article>
      </section>
    </BusinessStudioPageShell>
  );
}
