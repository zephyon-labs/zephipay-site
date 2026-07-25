import {
  CreatorMonetizationWorkspace,
  CreatorStudioPageShell,
} from "@/components/marketing/creator-studio";

export const metadata = {
  title: "Creator Monetization | ZephiPay",
  description:
    "Configure tips, memberships, subscriptions, products, creator payment links, and commissions.",
};

export default function CreatorMonetizationPage() {
  return (
    <CreatorStudioPageShell
      eyebrow="Creator Studio"
      title="Monetization"
      description="Build the ways your community can support, subscribe to, commission, or purchase from your work."
    >
      <CreatorMonetizationWorkspace />

      <section className="mt-14 grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Flexible by design
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Use only what fits your work.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Creators can combine one-time support, recurring access,
            products, commissions, or focused payment links without
            forcing every business into the same model.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Connected context
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Know why each payment happened.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            Tips, subscriptions, purchases, and commissions remain
            connected to their offer, supporter relationship, receipt,
            and settlement record.
          </p>
        </article>

        <article className="rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Honest preview
          </p>

          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            Configuration without fabrication.
          </h2>

          <p className="mt-3 leading-7 text-foreground-secondary">
            This interface demonstrates the intended workflow without
            pretending drafts are published, payments are enabled, or
            creator data already exists.
          </p>
        </article>
      </section>
    </CreatorStudioPageShell>
  );
}
