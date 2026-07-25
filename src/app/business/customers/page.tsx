import {
  BusinessCustomersWorkspace,
  BusinessStudioPageShell,
} from "@/components/marketing/business-studio";

export const metadata = {
  title: "Customers | ZephiPay Business",
  description:
    "Understand customer relationships, payment history, receipts, notes, and communication permissions.",
};

export default function BusinessCustomersPage() {
  return (
    <BusinessStudioPageShell
      title="Customers"
      description="Understand customer relationships, payment history, receipts, notes, and communication permissions."
    >
      <BusinessCustomersWorkspace />

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Relationship history
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Keep customer context connected.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Payments, invoices, refunds, receipts, and support history
            can remain attached to the same verified relationship.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Operational clarity
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            See what needs attention.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Outstanding invoices, open requests, refunds, and
            relationship notes can surface without reconstructing
            context across disconnected tools.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Permission-aware
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Respect how customer data is used.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Communication preferences, permissions, and business
            purpose should remain visible before teams act on customer
            information.
          </p>
        </article>
      </section>
    </BusinessStudioPageShell>
  );
}
