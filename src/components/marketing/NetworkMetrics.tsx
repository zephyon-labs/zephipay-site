type MetricItem = {
  label: string;
  value: string;
};

const metrics: MetricItem[] = [
  {
    label: "Volume processed",
    value: "—",
  },
  {
    label: "Completed transactions",
    value: "—",
  },
  {
    label: "Verified receipts",
    value: "—",
  },
  {
    label: "Successful settlements",
    value: "—",
  },
];

const futureTelemetry = [
  "Verified transaction volume",
  "Completed settlements",
  "Verified receipts",
  "Settlement reliability",
];

export function NetworkMetrics() {
  return (
    <section
      aria-labelledby="network-metrics-heading"
      className="overflow-hidden rounded-[1.65rem] border border-border-default bg-surface-glass shadow-[var(--shadow-soft)] backdrop-blur-2xl"
    >
      <div className="flex flex-col gap-4 border-b border-border-subtle px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full bg-neutral-500"
            />

            <p className="text-sm font-medium uppercase tracking-[0.16em] text-brand-secondary">
              Verified network activity
            </p>
          </div>

          <h2
            id="network-metrics-heading"
            className="mt-2 text-xl font-semibold tracking-[-0.03em] sm:text-2xl"
          >
            Live activity will appear here
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
            Every number shown here will come from verified transactions
            processed through the Zephyon Runtime.
          </p>
        </div>

        <div className="inline-flex w-fit items-center rounded-full border border-border-default bg-surface-secondary px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-foreground-muted">
          Status pending
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="border-b border-border-subtle p-5 sm:p-6 xl:border-b-0 xl:border-r last:xl:border-r-0"
          >
            <p className="font-mono text-2xl font-semibold tracking-[-0.04em] text-foreground-muted sm:text-3xl">
              {metric.value}
            </p>

            <p className="mt-3 text-sm text-foreground-muted">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 px-5 py-6 sm:px-7 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-foreground-muted">
            Activity status
          </p>

          <p className="mt-2 text-lg font-semibold">
            No verified public activity yet
          </p>

          <p className="mt-3 max-w-sm text-sm leading-6 text-foreground-secondary">
            Test and development transactions are never presented as
            production usage.
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-foreground-muted">
            Live activity will display
          </p>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {futureTelemetry.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border-subtle bg-surface-secondary px-4 py-3 text-sm text-foreground-secondary"
              >
                <span className="mr-2 text-brand-primary">◇</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border-subtle px-5 py-4 sm:px-7">
        <p className="text-xs leading-5 text-foreground-muted">
          Powered by verified Zephyon Runtime telemetry. Development and beta
          activity is never presented as production usage.
        </p>
      </div>
    </section>
  );
}
