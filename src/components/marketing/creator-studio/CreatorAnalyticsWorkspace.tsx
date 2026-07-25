"use client";

import { useMemo, useState } from "react";

type TimeRange = "7d" | "30d" | "90d" | "12m";
type AnalyticsMetric =
  | "revenue"
  | "supporters"
  | "conversion"
  | "retention";

type MetricDefinition = {
  id: AnalyticsMetric;
  label: string;
  value: string;
  description: string;
  chartLabel: string;
};

const ranges: Array<{
  id: TimeRange;
  label: string;
}> = [
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "90d", label: "90 days" },
  { id: "12m", label: "12 months" },
];

const metrics: MetricDefinition[] = [
  {
    id: "revenue",
    label: "Revenue",
    value: "$0.00",
    description:
      "Verified creator revenue during the selected period.",
    chartLabel: "Revenue over time",
  },
  {
    id: "supporters",
    label: "Supporters",
    value: "—",
    description:
      "Unique people who completed verified creator activity.",
    chartLabel: "Supporter growth",
  },
  {
    id: "conversion",
    label: "Conversion",
    value: "—",
    description:
      "Visitors who completed a support action or purchase.",
    chartLabel: "Conversion performance",
  },
  {
    id: "retention",
    label: "Retention",
    value: "—",
    description:
      "Recurring supporters who remained active over time.",
    chartLabel: "Relationship retention",
  },
];

const summaryMetrics = [
  {
    label: "Revenue",
    value: "$0.00",
    detail: "Verified revenue for the selected period.",
  },
  {
    label: "Conversion",
    value: "—",
    detail: "Requires visits and completed activity.",
  },
  {
    label: "Retention",
    value: "—",
    detail: "Requires recurring relationship history.",
  },
  {
    label: "Average support",
    value: "—",
    detail: "Requires verified creator payments.",
  },
];

const revenueMix = [
  "Tips",
  "Memberships",
  "Subscriptions",
  "Products",
  "Payment links",
  "Commissions",
];

function ChartIcon() {
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
      <path d="M4 19V9M10 19V5M16 19v-7M22 19V3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function EmptyChart({
  label,
}: {
  label: string;
}) {
  return (
    <div className="relative mt-6 min-h-[22rem] overflow-hidden rounded-[1.5rem] border border-border-default bg-background/45 p-5">
      <div
        aria-hidden="true"
        className="absolute inset-5 grid grid-rows-4"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="border-t border-border-subtle"
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-8 bottom-10 h-24"
      >
        <svg
          viewBox="0 0 800 120"
          className="h-full w-full text-foreground-muted"
          preserveAspectRatio="none"
        >
          <path
            d="M0 92 C90 92 120 80 190 82 C270 84 320 70 390 73 C470 76 520 58 590 62 C665 66 710 45 800 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="7 9"
            opacity="0.28"
          />
        </svg>
      </div>

      <div className="relative flex min-h-[19rem] flex-col items-center justify-center px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
          <ChartIcon />
        </div>

        <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
          Not enough activity to calculate trends
        </h3>

        <p className="mt-3 max-w-lg text-sm leading-6 text-foreground-secondary">
          {label} will appear after verified creator activity is
          available for the selected period.
        </p>
      </div>
    </div>
  );
}

export function CreatorAnalyticsWorkspace() {
  const [timeRange, setTimeRange] =
    useState<TimeRange>("30d");
  const [activeMetric, setActiveMetric] =
    useState<AnalyticsMetric>("revenue");

  const selectedMetric = useMemo(
    () =>
      metrics.find((metric) => metric.id === activeMetric) ??
      metrics[0],
    [activeMetric],
  );

  const selectedRange =
    ranges.find((range) => range.id === timeRange)?.label ??
    "30 days";

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-xl">
      <header className="border-b border-border-subtle px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Analytics workspace
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              Understand what is changing
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Turn verified revenue, supporter activity, purchases, and
              recurring relationships into useful business signals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {ranges.map((range) => {
              const isActive = timeRange === range.id;

              return (
                <button
                  key={range.id}
                  type="button"
                  onClick={() => setTimeRange(range.id)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "border-foreground/20 bg-foreground text-background"
                      : "border-border-default bg-surface-secondary text-foreground-secondary hover:bg-surface-elevated hover:text-foreground",
                  ].join(" ")}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="p-5 sm:p-7">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {summaryMetrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-2xl border border-border-subtle bg-surface-elevated/45 p-4"
            >
              <p className="text-xs font-medium text-foreground-muted">
                {metric.label}
              </p>

              <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                {metric.value}
              </p>

              <p className="mt-2 text-xs leading-5 text-foreground-subtle">
                {metric.detail}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[1.38fr_0.62fr]">
          <section className="rounded-[1.7rem] border border-border-default bg-background/35 p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                  Performance
                </p>

                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                  {selectedMetric.chartLabel}
                </h3>

                <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                  {selectedMetric.description}
                </p>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {metrics.map((metric) => {
                  const isActive =
                    activeMetric === metric.id;

                  return (
                    <button
                      key={metric.id}
                      type="button"
                      onClick={() =>
                        setActiveMetric(metric.id)
                      }
                      className={[
                        "shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition",
                        isActive
                          ? "border-foreground/20 bg-foreground text-background"
                          : "border-border-default bg-surface-secondary text-foreground-secondary hover:bg-surface-elevated hover:text-foreground",
                      ].join(" ")}
                    >
                      {metric.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold tracking-[-0.04em]">
                  {selectedMetric.value}
                </p>

                <p className="mt-2 text-xs text-foreground-muted">
                  Selected period: {selectedRange}
                </p>
              </div>

              <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
                No trend available
              </span>
            </div>

            <EmptyChart label={selectedMetric.chartLabel} />
          </section>

          <aside className="space-y-5">
            <section className="rounded-[1.7rem] border border-border-default bg-background/35 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                Revenue mix
              </p>

              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                No monetization breakdown yet
              </h3>

              <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                Revenue distribution will show how each monetization
                method contributes to creator earnings.
              </p>

              <div className="mt-5 space-y-3">
                {revenueMix.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-border-subtle bg-surface-elevated/45 p-3"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-foreground-muted">
                        {item}
                      </span>

                      <span className="text-xs font-medium text-foreground">
                        —
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-secondary">
                      <div className="h-full w-0 rounded-full bg-foreground-muted" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.7rem] border border-border-default bg-background/35 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                Reporting
              </p>

              <h3 className="mt-3 text-lg font-semibold tracking-[-0.025em]">
                Export verified analytics
              </h3>

              <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                Downloadable reports will be generated from verified
                activity rather than estimates or invented projections.
              </p>

              <button
                type="button"
                disabled
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-default bg-surface-secondary px-5 py-3 text-sm font-medium text-foreground-muted opacity-65"
              >
                <DownloadIcon />
                Export after sign-in
              </button>
            </section>
          </aside>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="rounded-[1.7rem] border border-border-default bg-background/35 p-5 sm:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Conversion journey
            </p>

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
              From discovery to verified activity
            </h3>

            <p className="mt-3 text-sm leading-6 text-foreground-secondary">
              Conversion analytics will connect storefront visits,
              offer views, checkout starts, and completed payments.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {[
                "Storefront visits",
                "Offer views",
                "Checkout starts",
                "Completed payments",
              ].map((stage, index) => (
                <div
                  key={stage}
                  className="rounded-2xl border border-border-subtle bg-surface-elevated/45 p-4"
                >
                  <p className="text-xs text-foreground-muted">
                    0{index + 1}
                  </p>

                  <p className="mt-3 text-sm font-medium text-foreground">
                    {stage}
                  </p>

                  <p className="mt-3 text-xl font-semibold">
                    —
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.7rem] border border-border-default bg-background/35 p-5 sm:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Community health
            </p>

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
              Relationships over time
            </h3>

            <p className="mt-3 text-sm leading-6 text-foreground-secondary">
              Retention signals will help creators understand recurring
              support without reducing community health to follower
              growth alone.
            </p>

            <div className="mt-5 space-y-3">
              {[
                ["New relationships", "—"],
                ["Returning supporters", "—"],
                ["Active members", "—"],
                ["Member cancellations", "—"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle bg-surface-elevated/45 px-4 py-3"
                >
                  <span className="text-sm text-foreground-secondary">
                    {label}
                  </span>

                  <span className="text-sm font-medium text-foreground">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
