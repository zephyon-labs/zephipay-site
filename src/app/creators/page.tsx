import Link from "next/link";

import {
  CreatorEmptyState,
  CreatorMetricGrid,
  CreatorStudioPageShell,
} from "@/components/marketing/creator-studio";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const dashboardMetrics = [
  {
    label: "Revenue",
    value: "$0.00",
    detail: "Verified creator earnings across all monetization methods.",
  },
  {
    label: "Supporters",
    value: "—",
    detail: "People who have supported, subscribed to, or purchased your work.",
  },
  {
    label: "Members",
    value: "—",
    detail: "Active recurring creator relationships.",
  },
  {
    label: "Available balance",
    value: "$0.00",
    detail: "Settled funds currently available for withdrawal.",
  },
];

const quickActions = [
  {
    title: "Create a tip link",
    description:
      "Give supporters a direct way to recognize and support your work.",
    href: "/creators/monetization",
  },
  {
    title: "Build a membership",
    description:
      "Create recurring support tiers with pricing and benefits.",
    href: "/creators/monetization",
  },
  {
    title: "Add a product",
    description:
      "Prepare digital products, commissions, downloads, or licenses.",
    href: "/creators/monetization",
  },
  {
    title: "Customize storefront",
    description:
      "Shape the public experience your supporters will see.",
    href: "/creators/storefront",
  },
];

const workspaceCards = [
  {
    eyebrow: "Monetization",
    title: "No earning methods configured",
    description:
      "Tips, memberships, subscriptions, products, and payment links will appear here after setup.",
    href: "/creators/monetization",
    linkLabel: "Open monetization",
  },
  {
    eyebrow: "Community",
    title: "No supporter relationships yet",
    description:
      "Supporters, members, customers, and relationship history will appear after verified activity begins.",
    href: "/creators/community",
    linkLabel: "Open community",
  },
  {
    eyebrow: "Analytics",
    title: "Not enough activity for trends",
    description:
      "Revenue, conversion, retention, and growth signals will appear after creator activity is available.",
    href: "/creators/analytics",
    linkLabel: "Open analytics",
  },
  {
    eyebrow: "Finances",
    title: "No payout destination connected",
    description:
      "Balances, settlement records, fees, payouts, and tax-ready exports will live here.",
    href: "/creators/finances",
    linkLabel: "Open finances",
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

function ActivityIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 18V9M10 18V5M16 18v-7M22 18V3" />
    </svg>
  );
}

export const metadata = {
  title: "Creator Studio | ZephiPay",
  description:
    "Manage creator monetization, supporters, analytics, finances, and storefront experiences through one connected workspace.",
};

export default function CreatorsPage() {
  return (
    <CreatorStudioPageShell
      eyebrow="Creator Studio"
      title="Run your creator business with confidence."
      description="Manage monetization, supporter relationships, performance, finances, and your public storefront through one connected operating environment."
    >
      <div className="flex flex-wrap gap-3">
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
      </div>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Overview
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
              Your creator business at a glance
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-foreground-secondary">
            Live information will appear after authentication and verified
            creator activity are available.
          </p>
        </div>

        <div className="mt-6">
          <CreatorMetricGrid metrics={dashboardMetrics} />
        </div>
      </section>

      <section className="mt-14">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Quick actions
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
            Start building your creator economy
          </h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-[1.6rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-surface-elevated"
            >
              <p className="text-lg font-semibold tracking-[-0.025em]">
                {action.title}
              </p>

              <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                {action.description}
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-secondary">
                Configure
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="creator-activity"
        className="mt-14 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]"
      >
        <CreatorEmptyState
          eyebrow="Recent activity"
          title="No creator activity yet"
          description="Verified tips, memberships, product sales, subscriptions, refunds, and payouts will appear here after your creator account begins receiving activity."
        />

        <aside className="rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
            <ActivityIcon />
          </div>

          <p className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Storefront status
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
            Not published
          </h2>

          <p className="mt-4 leading-7 text-foreground-secondary">
            Add your public identity, creator description, offers, and
            support options before publishing a storefront.
          </p>

          <div className="mt-7">
            <Button
              href="/creators/storefront"
              variant="outline"
            >
              Customize storefront
            </Button>
          </div>
        </aside>
      </section>

      <section className="mt-14">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Workspaces
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
            Everything connected to the same economic record
          </h2>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {workspaceCards.map((workspace) => (
            <article
              key={workspace.eyebrow}
              className="rounded-[1.8rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-soft)] backdrop-blur-xl"
            >
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                {workspace.eyebrow}
              </p>

              <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
                {workspace.title}
              </h3>

              <p className="mt-4 leading-7 text-foreground-secondary">
                {workspace.description}
              </p>

              <Link
                href={workspace.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-secondary transition-colors hover:text-brand-primary"
              >
                {workspace.linkLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-[2rem] border border-border-default bg-surface-glass p-8 shadow-[var(--shadow-medium)] backdrop-blur-xl sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              One connected creator system
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Support becomes more useful when its context stays attached.
            </h2>

            <p className="mt-5 max-w-3xl leading-8 text-foreground-secondary">
              ZephiPay is designed to connect creator earnings with verified
              receipts, supporter relationships, settlement evidence,
              analytics, and future intelligent commerce capabilities.
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
