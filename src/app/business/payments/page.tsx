import {
  BusinessPaymentsWorkspace,
  BusinessStudioPageShell,
} from "@/components/marketing/business-studio";

export const metadata = {
  title: "Payments | ZephiPay Business",
  description:
    "Accept, send, request, refund, and track business payments through one coordinated workspace.",
};

export default function BusinessPaymentsPage() {
  return (
    <BusinessStudioPageShell
      title="Payments"
      description="Accept, send, request, refund, and track business payments through one coordinated workspace."
    >
      <BusinessPaymentsWorkspace />

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            One payment workspace
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Move money without losing context.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Incoming payments, outgoing transfers, requests, refunds,
            links, and in-person commerce can share the same dependable
            operating model.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Policy before execution
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Apply controls before value moves.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Identity, permissions, compliance, risk, limits, and
            business policy can be evaluated before a payment becomes
            irreversible.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Verified records
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Preserve evidence of what happened.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Purpose, participant, decision state, settlement status,
            timestamps, and receipt history remain connected to the
            payment.
          </p>
        </article>
      </section>
    </BusinessStudioPageShell>
  );
}
