import Link from "next/link";

import { Button } from "@/components/ui/Button";

const metrics = [
  {
    label: "Revenue",
    value: "$0.00",
    detail: "Verified creator earnings.",
  },
  {
    label: "Supporters",
    value: "—",
    detail: "People supporting your work.",
  },
  {
    label: "Active members",
    value: "—",
    detail: "Recurring creator relationships.",
  },
  {
    label: "Available balance",
    value: "$0.00",
    detail: "Settled funds ready to withdraw.",
  },
];

const summaryItems = [
  "No monetization configured",
  "Storefront not published",
  "Payout setup incomplete",
];

const quickActions = [
  {
    title: "Create a tip link",
    description:
      "Give supporters a direct way to recognize your work.",
    href: "/creators/monetization",
  },
  {
    title: "Build a membership",
    description:
      "Create recurring support tiers and benefits.",
    href: "/creators/monetization",
  },
  {
    title: "Add a product",
    description:
      "Prepare downloads, commissions, licenses, or services.",
    href: "/creators/monetization",
  },
  {
    title: "Customize storefront",
    description:
      "Shape the public experience your supporters will see.",
    href: "/creators/storefront",
  },
];

const workspaceStatus = [
  {
    label: "Storefront",
    value: "Not published",
  },
  {
    label: "Monetization",
    value: "Not configured",
  },
  {
    label: "Payout method",
    value: "Not connected",
  },
  {
    label: "Creator verification",
    value: "Sign in to begin",
  },
];

function TrendIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 17 10 11l4 4 6-8" />
      <path d="M15 7h5v5" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 18V9M10 18V5M16 18v-7M22 18V3" />
    </svg>
  );
}

export function CreatorStudioDashboard() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border-subtle bg-surface-elevated/70 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:p-6 lg:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent"
      />

      <div className="rounded-[1.5rem] border border-border-subtle bg-background/75 p-5 sm:p-6">
        <header className="flex flex-col gap-5 border-b border-border-subtle pb-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-foreground-muted">
              Creator Studio
            </p>

            <h2 className="mt-3 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Your creator business starts here.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-muted sm:text-base">
              Configure how people support your work, publish your
              storefront, understand your community, and manage your
              finances through one connected workspace.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {summaryItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border-subtle bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="min-w-[12rem] rounded-2xl border border-border-subtle bg-surface-elevated/60 p-4 lg:text-right">
            <p className="text-xs font-medium text-foreground-muted">
              Today&apos;s revenue
            </p>

            <p className="mt-2 text-3xl font-medium tracking-tight text-foreground">
              $0.00
            </p>

            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-foreground-muted">
              <TrendIcon />
              No verified activity yet
            </p>
          </div>
        </header>

        <div className="grid gap-3 py-5 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-2xl border border-border-subtle bg-surface-elevated/50 p-4"
            >
              <p className="text-xs font-medium text-foreground-muted">
                {metric.label}
              </p>

              <p className="mt-3 text-2xl font-medium tracking-tight text-foreground">
                {metric.value}
              </p>

              <p className="mt-2 text-xs leading-5 text-foreground-subtle">
                {metric.detail}
              </p>
            </article>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.45fr_0.75fr]">
          <section className="rounded-2xl border border-border-subtle bg-surface-elevated/45 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Recent activity
                </p>

                <p className="mt-1 text-xs leading-5 text-foreground-muted">
                  Tips, memberships, purchases, refunds, and payouts
                  will remain connected to their purpose and settlement
                  record.
                </p>
              </div>

              <span className="rounded-full border border-border-subtle px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Preview
              </span>
            </div>

            <div className="mt-8 flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-border-default bg-background/40 px-6 py-10 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
                <ActivityIcon />
              </div>

              <p className="mt-5 text-base font-medium text-foreground">
                No creator activity yet
              </p>

              <p className="mt-2 max-w-md text-sm leading-6 text-foreground-muted">
                Verified creator activity will appear after you sign in,
                configure monetization, and begin receiving support or
                purchases.
              </p>
            </div>
          </section>

          <aside className="rounded-2xl border border-border-subtle bg-surface-elevated/45 p-4 sm:p-5">
            <p className="text-sm font-medium text-foreground">
              Workspace status
            </p>

            <p className="mt-1 text-xs leading-5 text-foreground-muted">
              See what is ready and what still needs attention.
            </p>

            <dl className="mt-5 space-y-3">
              {workspaceStatus.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-border-subtle bg-background/60 p-3"
                >
                  <dt className="text-xs text-foreground-muted">
                    {item.label}
                  </dt>

                  <dd className="mt-1 text-sm font-medium text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5">
              <Button
                href="/creators/storefront"
                variant="outline"
                className="w-full"
              >
                Open storefront
              </Button>
            </div>
          </aside>
        </div>

        <section className="mt-5 border-t border-border-subtle pt-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Quick actions
              </p>

              <p className="mt-1 text-xs leading-5 text-foreground-muted">
                Start shaping how your creator business will operate.
              </p>
            </div>

            <Link
              href="/creators/monetization"
              className="text-sm font-medium text-brand-secondary transition-colors hover:text-brand-primary"
            >
              Open monetization →
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-2xl border border-border-subtle bg-surface-elevated/45 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-surface-elevated"
              >
                <p className="text-sm font-medium text-foreground">
                  {action.title}
                </p>

                <p className="mt-2 text-xs leading-5 text-foreground-muted">
                  {action.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-secondary">
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
      </div>
    </div>
  );
}
