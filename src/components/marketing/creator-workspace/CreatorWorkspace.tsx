import type { CreatorWorkspaceProps } from "./types";

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

function VerifiedIcon() {
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
      <path d="m9 12 2 2 4-5" />
      <path d="M12 3 5.5 6v5c0 4.2 2.7 8 6.5 10 3.8-2 6.5-5.8 6.5-10V6L12 3Z" />
    </svg>
  );
}

export function CreatorWorkspace({
  creatorName,
  message,
  earnings,
  summary,
  metrics,
  activity,
  records,
}: CreatorWorkspaceProps) {
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
              Creator workspace
            </p>

            <h3 className="mt-3 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Good morning, {creatorName}.
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-6 text-foreground-muted sm:text-base">
              {message}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {summary.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border-subtle bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="min-w-[11rem] rounded-2xl border border-border-subtle bg-surface-elevated/60 p-4 lg:text-right">
            <p className="text-xs font-medium text-foreground-muted">
              Today&apos;s earnings
            </p>

            <p className="mt-2 text-3xl font-medium tracking-tight text-foreground">
              {earnings}
            </p>

            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-foreground-muted">
              <TrendIcon />
              Verified activity
            </p>
          </div>
        </header>

        <div className="grid gap-3 py-5 md:grid-cols-3">
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

        <div className="grid gap-4 lg:grid-cols-[1.45fr_0.75fr]">
          <section className="rounded-2xl border border-border-subtle bg-surface-elevated/45 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Recent supporter activity
                </p>

                <p className="mt-1 text-xs leading-5 text-foreground-muted">
                  Payments remain connected to purpose, access, and settlement.
                </p>
              </div>

              <span className="rounded-full border border-border-subtle px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Live
              </span>
            </div>

            <div className="mt-5 divide-y divide-border-subtle">
              {activity.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[1fr_1.5fr_auto]"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.supporter}
                    </p>

                    <p className="mt-1 text-xs text-foreground-muted">
                      {item.event}
                    </p>
                  </div>

                  <p className="text-xs leading-5 text-foreground-muted sm:text-sm">
                    {item.context}
                  </p>

                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <p className="text-sm font-medium text-foreground">
                      {item.amount}
                    </p>

                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-foreground-muted">
                      <VerifiedIcon />
                      {item.status}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="rounded-2xl border border-border-subtle bg-surface-elevated/45 p-4 sm:p-5">
            <p className="text-sm font-medium text-foreground">
              Records and payouts
            </p>

            <p className="mt-1 text-xs leading-5 text-foreground-muted">
              A clear operational view of what happened and what comes next.
            </p>

            <dl className="mt-5 space-y-3">
              {records.map((record) => (
                <div
                  key={record.label}
                  className="rounded-xl border border-border-subtle bg-background/60 p-3"
                >
                  <dt className="text-xs text-foreground-muted">
                    {record.label}
                  </dt>

                  <dd className="mt-1 text-sm font-medium text-foreground">
                    {record.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 rounded-xl border border-border-subtle bg-background/60 p-3">
              <p className="text-xs font-medium text-foreground">
                Workspace preview
              </p>

              <p className="mt-1 text-xs leading-5 text-foreground-muted">
                Live controls become available after signing in.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
