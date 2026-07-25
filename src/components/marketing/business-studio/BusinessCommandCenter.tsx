import Link from "next/link";

const metrics = [
  {
    label: "Revenue",
    value: "$0.00",
    detail: "Verified business revenue today.",
  },
  {
    label: "Available balance",
    value: "$0.00",
    detail: "Settled funds currently available.",
  },
  {
    label: "Pending settlement",
    value: "$0.00",
    detail: "Funds still completing settlement.",
  },
  {
    label: "Outstanding invoices",
    value: "$0.00",
    detail: "Open invoice balances awaiting payment.",
  },
];

const quickActions = [
  {
    label: "Accept payment",
    description:
      "Open checkout, present a QR code, or prepare point of sale.",
    href: "/business/payments",
  },
  {
    label: "Send payment",
    description:
      "Pay a vendor, contractor, employee, or partner.",
    href: "/business/payments",
  },
  {
    label: "Create invoice",
    description:
      "Prepare professional terms and request payment.",
    href: "/business/invoices",
  },
  {
    label: "Create payment link",
    description:
      "Generate a focused shareable checkout destination.",
    href: "/business/checkout",
  },
];

const operatingStatus = [
  {
    label: "Business verification",
    value: "Sign in to begin",
  },
  {
    label: "Settlement destination",
    value: "Not connected",
  },
  {
    label: "Checkout",
    value: "Not configured",
  },
  {
    label: "Team access",
    value: "No members configured",
  },
];

function ActivityIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m15 8 4 4-4 4" />
      <path d="M5 6h5M5 18h5" />
    </svg>
  );
}

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

export function BusinessCommandCenter() {
  return (
    <section className="relative overflow-hidden rounded-[2.25rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-2xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,rgba(72,207,255,0.12),transparent_62%)]"
      />

      <header className="relative border-b border-border-subtle px-6 py-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Business command center
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
              Your business starts here.
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Accept payments, follow settlement, manage customers,
              create invoices, and preserve dependable operational
              records through one connected workspace.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border-default bg-surface-secondary px-3 py-2 text-xs font-medium text-foreground-muted">
            <span className="h-2 w-2 rounded-full bg-foreground-muted" />
            No live business connected
          </div>
        </div>
      </header>

      <div className="relative p-4 sm:p-6 lg:p-8">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-[1.5rem] border border-border-subtle bg-background/55 p-5 shadow-[var(--shadow-soft)]"
            >
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-foreground-muted">
                {metric.label}
              </p>

              <p className="mt-5 text-3xl font-semibold tracking-[-0.045em]">
                {metric.value}
              </p>

              <p className="mt-2 text-sm leading-6 text-foreground-muted">
                {metric.detail}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.45fr_0.75fr]">
          <section className="overflow-hidden rounded-[1.75rem] border border-border-subtle bg-background/55 shadow-[var(--shadow-soft)]">
            <div className="flex items-start justify-between gap-4 border-b border-border-subtle px-5 py-5 sm:px-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.17em] text-foreground-muted">
                  Recent activity
                </p>

                <p className="mt-1 text-sm text-foreground-secondary">
                  Payments, invoices, refunds, deposits, and settlement.
                </p>
              </div>

              <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted">
                No verified records
              </span>
            </div>

            <div className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
                <ActivityIcon />
              </div>

              <h4 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
                No business activity yet
              </h4>

              <p className="mt-3 max-w-lg text-sm leading-6 text-foreground-secondary">
                Verified payments, customer activity, invoices, refunds,
                fees, and settlement events will appear after a business
                account begins operating.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  "Verified payments",
                  "Settlement status",
                  "Receipt history",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <aside className="rounded-[1.75rem] border border-border-subtle bg-background/55 p-5 shadow-[var(--shadow-soft)] sm:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.17em] text-foreground-muted">
              Operating status
            </p>

            <p className="mt-2 text-sm leading-6 text-foreground-secondary">
              See what is ready and what still requires setup.
            </p>

            <dl className="mt-5 space-y-3">
              {operatingStatus.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-border-subtle bg-surface-elevated/45 p-3"
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

            <Link
              href="/business/finances"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-default bg-surface-secondary px-5 py-3 text-sm font-medium transition hover:bg-surface-elevated"
            >
              Review finances
              <ArrowIcon />
            </Link>
          </aside>
        </div>

        <section className="mt-4 rounded-[1.75rem] border border-border-subtle bg-background/45 p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.17em] text-foreground-muted">
                Quick actions
              </p>

              <p className="mt-2 text-sm text-foreground-secondary">
                Start common business workflows from one place.
              </p>
            </div>

            <Link
              href="/business/payments"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-secondary"
            >
              Open payments
              <ArrowIcon />
            </Link>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="group rounded-[1.3rem] border border-border-subtle bg-surface-elevated/35 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-surface-elevated"
              >
                <p className="text-sm font-semibold">
                  {action.label}
                </p>

                <p className="mt-2 text-xs leading-5 text-foreground-muted">
                  {action.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-brand-secondary">
                  Open workspace
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-4 flex flex-col gap-3 rounded-[1.5rem] border border-border-subtle bg-background/45 px-5 py-4 text-sm text-foreground-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            Every payment is designed to preserve purpose, participant,
            decision state, settlement status, and receipt history.
          </p>

          <span className="shrink-0 text-xs font-medium uppercase tracking-[0.15em] text-brand-secondary">
            Powered by Zephyon
          </span>
        </div>
      </div>
    </section>
  );
}
