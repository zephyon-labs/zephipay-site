import type { CreatorMetric } from "./types";

type CreatorMetricGridProps = {
  metrics: CreatorMetric[];
};

export function CreatorMetricGrid({
  metrics,
}: CreatorMetricGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className="rounded-[1.6rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
            {metric.label}
          </p>

          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
            {metric.value}
          </p>

          <p className="mt-3 text-sm leading-6 text-foreground-secondary">
            {metric.detail}
          </p>
        </article>
      ))}
    </div>
  );
}
