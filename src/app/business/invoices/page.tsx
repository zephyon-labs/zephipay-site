import {
  BusinessInvoicesWorkspace,
  BusinessStudioPageShell,
} from "@/components/marketing/business-studio";

export const metadata = {
  title: "Invoices | ZephiPay Business",
  description:
    "Create professional invoices, track payment status, manage reminders, and preserve reconciliation records.",
};

export default function BusinessInvoicesPage() {
  return (
    <BusinessStudioPageShell
      title="Invoices"
      description="Create professional invoices, track payment status, manage reminders, and preserve reconciliation records."
    >
      <BusinessInvoicesWorkspace />

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Invoice lifecycle
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Keep every status visible.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Draft, sent, paid, overdue, and recurring invoices remain
            organized without separating creation from payment history.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Verified reconciliation
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Connect invoices to real payments.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Payment status, settlement, and verified receipts can remain
            attached to the invoice instead of being reconciled manually.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Customer clarity
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Preserve the full relationship.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Customer identity, terms, reminders, notes, and transaction
            records can stay connected throughout the billing process.
          </p>
        </article>
      </section>
    </BusinessStudioPageShell>
  );
}
