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
    label: "Verified payments",
    value: "—",
  },
  {
    label: "Verified receipts",
    value: "—",
  },
  {
    label: "Runtime success",
    value: "—",
  },
];

const futureTelemetry = [
  "Live network volume",
  "Verified settlements",
  "Deterministic receipts",
  "Runtime performance",
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
              Zephyon telemetry
            </p>
          </div>

          <h2
            id="network-metrics-heading"
            className="mt-2 text-xl font-semibold tracking-[-0.03em] sm:text-2xl"
          >
            Awaiting First Verified Settlement
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
            Public runtime telemetry activates automatically after the first
            verified settlement through the Zephyon Runtime.
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
            Current status
          </p>

          <p className="mt-2 text-lg font-semibold">
            Awaiting First Verified Settlement
          </p>

          <p className="mt-3 max-w-sm text-sm leading-6 text-foreground-secondary">
            No simulated transactions. No inflated activity. Every future
            number shown here will come from verified runtime telemetry.
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-foreground-muted">
            Telemetry will display
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
          Devnet and beta values represent test activity only and do not
          indicate production funds or mainnet transaction volume.
        </p>
      </div>
    </section>
  );
}
