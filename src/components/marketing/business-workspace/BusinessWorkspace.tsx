import Link from "next/link";

import type {
  BusinessActivityStatus,
  BusinessMetricTone,
  BusinessWorkspaceData,
} from "./types";

interface BusinessWorkspaceProps {
  data: BusinessWorkspaceData;
}

const metricToneClasses: Record<BusinessMetricTone, string> = {
  positive:
    "border-emerald-400/15 bg-emerald-400/[0.045] text-emerald-300",
  informational:
    "border-sky-400/15 bg-sky-400/[0.045] text-sky-300",
  neutral:
    "border-white/10 bg-white/[0.035] text-foreground-secondary",
  attention:
    "border-amber-300/15 bg-amber-300/[0.04] text-amber-200",
};

const statusClasses: Record<BusinessActivityStatus, string> = {
  Settled: "border-emerald-400/15 bg-emerald-400/[0.06] text-emerald-300",
  Verified: "border-sky-400/15 bg-sky-400/[0.06] text-sky-300",
  Pending: "border-amber-300/15 bg-amber-300/[0.06] text-amber-200",
  Scheduled: "border-violet-400/15 bg-violet-400/[0.06] text-violet-300",
  Refunded: "border-white/10 bg-white/[0.04] text-foreground-secondary",
};

function ActionIcon({
  icon,
}: {
  icon: BusinessWorkspaceData["quickActions"][number]["icon"];
}) {
  const sharedProps = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.65,
  };

  if (icon === "receive") {
    return (
      <svg {...sharedProps}>
        <path d="M12 4v11" />
        <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
        <path d="M5 20h14" />
      </svg>
    );
  }

  if (icon === "invoice") {
    return (
      <svg {...sharedProps}>
        <path d="M7 3h8l4 4v14H7z" />
        <path d="M15 3v5h5" />
        <path d="M10 12h6M10 16h6" />
      </svg>
    );
  }

  if (icon === "link") {
    return (
      <svg {...sharedProps}>
        <path d="M9.5 14.5 14.5 9.5" />
        <path d="M7.2 16.8 5.8 18.2a3.4 3.4 0 0 1-4.8-4.8l3.4-3.4a3.4 3.4 0 0 1 4.8 0" />
        <path d="m16.8 7.2 1.4-1.4A3.4 3.4 0 0 1 23 10.6L19.6 14a3.4 3.4 0 0 1-4.8 0" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20H2" />
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

function ActivityIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M5 12h14" />
      <path d="m15 8 4 4-4 4" />
      <path d="M5 6h5M5 18h5" />
    </svg>
  );
}

export function BusinessWorkspace({
  data,
}: BusinessWorkspaceProps) {
  return (
    <div className="relative overflow-hidden rounded-[2.25rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-2xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,rgba(72,207,255,0.12),transparent_62%)]"
      />

      <div className="relative border-b border-border-subtle px-6 py-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Business workspace
            </p>

            <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                {data.businessName}
              </p>

              <p className="text-sm text-foreground-muted">
                {data.periodLabel}
              </p>
            </div>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.055] px-3 py-1.5 text-xs font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
            Payments operating normally
          </div>
        </div>
      </div>

      <div className="relative p-4 sm:p-6 lg:p-8">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {data.metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-[1.5rem] border border-border-subtle bg-background/55 p-5 shadow-[var(--shadow-soft)]"
            >
              <div
                className={`inline-flex rounded-full border px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] ${metricToneClasses[metric.tone]}`}
              >
                {metric.label}
              </div>

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
            <div className="flex items-center justify-between border-b border-border-subtle px-5 py-5 sm:px-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.17em] text-foreground-muted">
                  Recent activity
                </p>

                <p className="mt-1 text-sm text-foreground-secondary">
                  Payments, invoices, vendors, and refunds.
                </p>
              </div>

              <span className="hidden rounded-full border border-border-subtle bg-white/[0.025] px-3 py-1.5 text-xs text-foreground-muted sm:inline-flex">
                Updated moments ago
              </span>
            </div>

            <div>
              {data.activity.map((activity) => (
                <article
                  key={activity.id}
                  className="grid gap-4 border-b border-border-subtle px-5 py-5 last:border-b-0 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border-subtle bg-white/[0.035] text-brand-secondary">
                    <ActivityIcon />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="truncate text-sm font-semibold sm:text-base">
                        {activity.title}
                      </h3>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-medium ${statusClasses[activity.status]}`}
                      >
                        {activity.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-foreground-muted">
                      {activity.description}
                      <span className="mx-2 text-border-default">•</span>
                      {activity.timestamp}
                    </p>
                  </div>

                  <p
                    className={`text-sm font-semibold sm:text-right ${
                      activity.amount.startsWith("+")
                        ? "text-emerald-300"
                        : "text-foreground"
                    }`}
                  >
                    {activity.amount}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <aside className="rounded-[1.75rem] border border-border-subtle bg-background/55 p-5 shadow-[var(--shadow-soft)] sm:p-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.17em] text-foreground-muted">
                Quick actions
              </p>

              <p className="mt-1 text-sm leading-6 text-foreground-secondary">
                Common business workflows, ready when you are.
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              {data.quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex items-center gap-4 rounded-[1.25rem] border border-border-subtle bg-white/[0.025] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-brand-secondary/25 hover:bg-white/[0.045]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-brand-secondary/15 bg-brand-secondary/[0.055] text-brand-secondary">
                    <ActionIcon icon={action.icon} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      {action.label}
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-foreground-muted">
                      {action.description}
                    </span>
                  </span>

                  <span className="text-foreground-muted transition group-hover:translate-x-0.5 group-hover:text-brand-secondary">
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-[1.5rem] border border-border-subtle bg-background/45 px-5 py-4 text-sm text-foreground-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            Every payment preserves settlement status, purpose, participant,
            and receipt history.
          </p>

          <span className="shrink-0 text-xs font-medium uppercase tracking-[0.15em] text-brand-secondary">
            Verified by ZephiPay
          </span>
        </div>
      </div>
    </div>
  );
}
