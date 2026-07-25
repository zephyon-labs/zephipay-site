import {
  CreatorEmptyState,
  CreatorStudioPageShell,
} from "@/components/marketing/creator-studio";

const earningMethods = [
  {
    title: "Tips",
    description:
      "Accept one-time support with suggested amounts, custom messages, and shareable payment links.",
  },
  {
    title: "Memberships",
    description:
      "Create recurring support tiers with pricing, benefits, and access rules.",
  },
  {
    title: "Subscriptions",
    description:
      "Offer recurring access to services, education, content, or ongoing creator experiences.",
  },
  {
    title: "Products",
    description:
      "Sell digital work, commissions, downloads, licenses, and creator-owned goods.",
  },
];

export const metadata = {
  title: "Creator Monetization | ZephiPay",
  description:
    "Configure tips, memberships, subscriptions, products, and creator payment links.",
};

export default function CreatorMonetizationPage() {
  return (
    <CreatorStudioPageShell
      eyebrow="Creator Studio"
      title="Monetization"
      description="Build the ways your community can support, subscribe to, or purchase from your work."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {earningMethods.map((method) => (
          <article
            key={method.title}
            className="rounded-[1.8rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl"
          >
            <p className="text-xl font-semibold tracking-[-0.03em]">
              {method.title}
            </p>

            <p className="mt-4 leading-7 text-foreground-secondary">
              {method.description}
            </p>

            <button
              type="button"
              disabled
              className="mt-7 rounded-full border border-border-default bg-surface-secondary px-4 py-2 text-sm text-foreground-muted"
            >
              Sign in to configure
            </button>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <CreatorEmptyState
          eyebrow="Honest state"
          title="No monetization methods configured"
          description="After authentication is available, creators will configure pricing, benefits, checkout links, availability, and payment rules here."
        />
      </div>
    </CreatorStudioPageShell>
  );
}
