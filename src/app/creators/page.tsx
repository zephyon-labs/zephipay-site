import {
  CreatorStudioDashboard,
  CreatorStudioPageShell,
} from "@/components/marketing/creator-studio";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const connectedWorkspaces = [
  {
    number: "01",
    title: "Monetization",
    description:
      "Configure tips, memberships, subscriptions, products, commissions, and payment links.",
    href: "/creators/monetization",
  },
  {
    number: "02",
    title: "Community",
    description:
      "Understand supporters, members, customers, and long-term relationships.",
    href: "/creators/community",
  },
  {
    number: "03",
    title: "Analytics",
    description:
      "Explore verified revenue, conversion, retention, and growth signals.",
    href: "/creators/analytics",
  },
  {
    number: "04",
    title: "Finances",
    description:
      "Manage balances, settlements, payouts, fees, and tax-ready records.",
    href: "/creators/finances",
  },
  {
    number: "05",
    title: "Storefront",
    description:
      "Shape the public experience where supporters discover and purchase from your work.",
    href: "/creators/storefront",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export const metadata = {
  title: "Creator Studio | ZephiPay",
  description:
    "Manage creator monetization, community, analytics, finances, and storefront experiences through one connected workspace.",
};

export default function CreatorsPage() {
  return (
    <CreatorStudioPageShell
      eyebrow="Creator Studio"
      title="Run your creator business with confidence."
      description="Manage monetization, supporter relationships, performance, finances, and your public storefront through one connected operating environment."
      actions={
        <>
          <Button
            href={siteConfig.betaUrl}
            external
            size="lg"
            rightIcon={<ArrowIcon />}
          >
            Join creator beta
          </Button>

          <Button
            href="/creators/storefront"
            variant="outline"
            size="lg"
          >
            Preview storefront
          </Button>
        </>
      }
    >
      <section>
        <CreatorStudioDashboard />
      </section>

      <section className="mt-16">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Connected workspaces
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Every part of the creator business stays connected.
          </h2>

          <p className="mt-5 text-lg leading-8 text-foreground-secondary">
            Earnings, relationships, records, and performance should not
            live in disconnected tools. Creator Studio keeps them attached
            to the same economic activity.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {connectedWorkspaces.map((workspace) => (
            <a
              key={workspace.title}
              href={workspace.href}
              className="group rounded-[1.7rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-surface-elevated"
            >
              <p className="text-xs font-medium tracking-[0.18em] text-foreground-muted">
                {workspace.number}
              </p>

              <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
                {workspace.title}
              </h3>

              <p className="mt-3 leading-7 text-foreground-secondary">
                {workspace.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-secondary">
                Open workspace
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-medium)] backdrop-blur-xl sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Built around economic relationships
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Support becomes more useful when its context stays attached.
            </h2>

            <p className="mt-5 max-w-3xl leading-8 text-foreground-secondary">
              ZephiPay connects creator earnings with verified receipts,
              supporter relationships, settlement evidence, analytics, and
              future intelligent-commerce capabilities.
            </p>
          </div>

          <Button
            href={siteConfig.betaUrl}
            external
            size="lg"
            rightIcon={<ArrowIcon />}
          >
            Join creator beta
          </Button>
        </div>
      </section>
    </CreatorStudioPageShell>
  );
}
