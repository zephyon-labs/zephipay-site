import {
  BusinessAnalyticsWorkspace,
  BusinessStudioPageShell,
} from "@/components/marketing/business-studio";

export const metadata = {
  title: "Analytics | ZephiPay Business",
  description:
    "Turn verified payments, customers, checkout activity, and settlement records into useful business signals.",
};

export default function BusinessAnalyticsPage() {
  return (
    <BusinessStudioPageShell
      title="Analytics"
      description="Turn verified payments, customers, checkout activity, and settlement records into useful business signals."
    >
      <BusinessAnalyticsWorkspace />

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Verified foundation
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Build insight from real activity.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Revenue, orders, customers, checkout sessions, and
            settlement records remain grounded in verified business
            events rather than disconnected estimates.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Operational context
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Understand why performance changed.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Payment channels, customers, checkout behavior, and
            settlement outcomes can be evaluated together instead of
            across isolated reporting systems.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Honest signals
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Never manufacture the story.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Trends and recommendations appear only when enough verified
            history exists to support them, preserving clarity and trust
            as the business grows.
          </p>
        </article>
      </section>
    </BusinessStudioPageShell>
  );
}
