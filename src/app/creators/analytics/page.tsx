import {
  CreatorAnalyticsWorkspace,
  CreatorStudioPageShell,
} from "@/components/marketing/creator-studio";

export const metadata = {
  title: "Creator Analytics | ZephiPay",
  description:
    "Explore creator revenue, conversion, retention, growth, and product performance.",
};

export default function CreatorAnalyticsPage() {
  return (
    <CreatorStudioPageShell
      eyebrow="Creator Studio"
      title="Analytics"
      description="Turn verified economic activity into understandable signals about revenue, growth, conversion, and community health."
    >
      <CreatorAnalyticsWorkspace />

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Verified signals
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Measure activity that actually happened.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Analytics should remain grounded in verified payments,
            relationships, receipts, settlements, and storefront
            activity.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Useful context
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Understand why performance changes.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Revenue becomes more useful when connected to monetization
            method, supporter type, conversion path, and recurring
            relationship history.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Honest visualization
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Empty charts instead of fictional growth.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            The workspace demonstrates future reporting behavior
            without inventing traffic, conversions, revenue, or
            retention.
          </p>
        </article>
      </section>
    </CreatorStudioPageShell>
  );
}
