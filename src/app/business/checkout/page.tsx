import {
  BusinessCheckoutWorkspace,
  BusinessStudioPageShell,
} from "@/components/marketing/business-studio";

export const metadata = {
  title: "Checkout | ZephiPay Business",
  description:
    "Configure hosted checkout, payment links, QR experiences, point of sale, and embedded payment flows.",
};

export default function BusinessCheckoutPage() {
  return (
    <BusinessStudioPageShell
      title="Checkout"
      description="Configure hosted checkout, payment links, QR experiences, point of sale, and embedded payment flows."
    >
      <BusinessCheckoutWorkspace />

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Every channel
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Accept payment wherever business happens.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Hosted pages, links, QR codes, point of sale, and embedded
            checkout can share one consistent payment foundation.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Customer experience
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Keep checkout calm and recognizable.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Business details, payment methods, confirmation behavior,
            and receipts can remain consistent across every checkout surface.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Verified completion
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Connect checkout to real settlement.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Customer confirmation, payment status, receipts, and
            settlement records can remain linked from start to finish.
          </p>
        </article>
      </section>
    </BusinessStudioPageShell>
  );
}
