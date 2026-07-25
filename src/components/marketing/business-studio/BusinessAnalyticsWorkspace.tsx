"use client";

import { useMemo, useState } from "react";

type AnalyticsView =
  | "revenue"
  | "orders"
  | "customers"
  | "conversion"
  | "settlement";

type AnalyticsRange = "7d" | "30d" | "90d" | "12m";

type AnalyticsViewDefinition = {
  id: AnalyticsView;
  label: string;
  metricLabel: string;
  value: string;
  description: string;
  chartLabel: string;
};

const views: AnalyticsViewDefinition[] = [
  {
    id: "revenue",
    label: "Revenue",
    metricLabel: "Verified revenue",
    value: "$0.00",
    description:
      "Revenue recorded through verified business payments.",
    chartLabel: "Revenue over time",
  },
  {
    id: "orders",
    label: "Orders",
    metricLabel: "Completed orders",
    value: "—",
    description:
      "Completed payments connected to business orders.",
    chartLabel: "Orders over time",
  },
  {
    id: "customers",
    label: "Customers",
    metricLabel: "Active customers",
    value: "—",
    description:
      "People and businesses with verified activity.",
    chartLabel: "Customer activity over time",
  },
  {
    id: "conversion",
    label: "Conversion",
    metricLabel: "Checkout conversion",
    value: "—",
    description:
      "The share of checkout sessions completed successfully.",
    chartLabel: "Conversion over time",
  },
  {
    id: "settlement",
    label: "Settlement",
    metricLabel: "Settled volume",
    value: "$0.00",
    description:
      "Verified payment volume that completed settlement.",
    chartLabel: "Settlement over time",
  },
];

const ranges: Array<{
  id: AnalyticsRange;
  label: string;
  description: string;
}> = [
  {
    id: "7d",
    label: "7 days",
    description: "Daily activity from the last seven days.",
  },
  {
    id: "30d",
    label: "30 days",
    description: "Daily activity from the last thirty days.",
  },
  {
    id: "90d",
    label: "90 days",
    description: "Weekly activity from the last ninety days.",
  },
  {
    id: "12m",
    label: "12 months",
    description: "Monthly activity from the last twelve months.",
  },
];

const metrics = [
  {
    label: "Revenue",
    value: "$0.00",
    detail: "Verified business revenue.",
  },
  {
    label: "Orders",
    value: "—",
    detail: "Completed business payments.",
  },
  {
    label: "Conversion",
    value: "—",
    detail: "Requires checkout and completion activity.",
  },
  {
    label: "Repeat customers",
    value: "—",
    detail: "Requires verified customer history.",
  },
];

const emptyChartBars = [
  28, 44, 34, 58, 42, 66, 48, 72, 52, 62, 46, 56,
];

function AnalyticsIcon() {
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
      <path d="M4 19V9" />
      <path d="M10 19V5" />
      <path d="M16 19v-7" />
      <path d="M22 19V3" />
      <path d="M2 19h20" />
    </svg>
  );
}

function InsightIcon() {
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
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M8.2 14.8A7 7 0 1 1 15.8 14.8C14.7 15.6 14 16.5 14 18h-4c0-1.5-.7-2.4-1.8-3.2Z" />
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
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </svg>
  );
}

export function BusinessAnalyticsWorkspace() {
  const [activeView, setActiveView] =
    useState<AnalyticsView>("revenue");
  const [activeRange, setActiveRange] =
    useState<AnalyticsRange>("30d");

  const activeViewDefinition = useMemo(
    () =>
      views.find((view) => view.id === activeView) ??
      views[0],
    [activeView],
  );

  const activeRangeDefinition = useMemo(
    () =>
      ranges.find((range) => range.id === activeRange) ??
      ranges[1],
    [activeRange],
  );

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-xl">
      <header className="border-b border-border-subtle px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Analytics workspace
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              Turn verified activity into useful signals
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Understand revenue, orders, customers, checkout
              performance, and settlement without separating business
              insight from the underlying payment records.
            </p>
          </div>

          <div
            className="flex w-fit gap-1 rounded-full border border-border-default bg-background/55 p-1"
            aria-label="Analytics time range"
          >
            {ranges.map((range) => {
              const isActive = range.id === activeRange;

              return (
                <button
                  key={range.id}
                  type="button"
                  onClick={() => setActiveRange(range.id)}
                  className={[
                    "rounded-full px-3 py-2 text-xs font-medium transition sm:px-4",
                    isActive
                      ? "bg-foreground text-background"
                      : "text-foreground-muted hover:text-foreground",
                  ].join(" ")}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Business analytics views"
        >
          {views.map((view) => {
            const isActive = view.id === activeView;

            return (
              <button
                key={view.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveView(view.id)}
                className={[
                  "shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "border-foreground/20 bg-foreground text-background"
                    : "border-border-default bg-surface-secondary text-foreground-secondary hover:bg-surface-elevated hover:text-foreground",
                ].join(" ")}
              >
                {view.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="p-5 sm:p-7">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
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

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
          <section className="overflow-hidden rounded-[1.7rem] border border-border-default bg-background/45">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border-subtle px-5 py-4 sm:px-6">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {activeViewDefinition.chartLabel}
                </p>

                <p className="mt-1 text-xs leading-5 text-foreground-muted">
                  {activeRangeDefinition.description}
                </p>
              </div>

              <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
                No verified data
              </span>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                    {activeViewDefinition.metricLabel}
                  </p>

                  <p className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
                    {activeViewDefinition.value}
                  </p>

                  <p className="mt-3 max-w-lg text-sm leading-6 text-foreground-secondary">
                    {activeViewDefinition.description}
                  </p>
                </div>

                <div className="rounded-2xl border border-border-default bg-surface-secondary px-4 py-3 text-right">
                  <p className="text-xs text-foreground-muted">
                    Change
                  </p>

                  <p className="mt-1 text-sm font-medium text-foreground">
                    —
                  </p>
                </div>
              </div>

              <div className="relative mt-8 min-h-[18rem] overflow-hidden rounded-2xl border border-border-subtle bg-surface-glass p-5">
                <div className="pointer-events-none absolute inset-0">
                  {[20, 40, 60, 80].map((position) => (
                    <div
                      key={position}
                      className="absolute left-5 right-5 border-t border-border-subtle"
                      style={{ top: `${position}%` }}
                    />
                  ))}
                </div>

                <div className="relative flex h-[14rem] items-end gap-2 sm:gap-3">
                  {emptyChartBars.map((height, index) => (
                    <div
                      key={`${activeView}-${activeRange}-${index}`}
                      className="flex h-full flex-1 items-end"
                    >
                      <div
                        className="w-full rounded-t-md border border-border-subtle bg-surface-elevated/50 opacity-45"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="relative mt-3 flex items-center justify-between text-[0.65rem] text-foreground-muted">
                  <span>Start</span>
                  <span>{activeRangeDefinition.label}</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                  <div className="max-w-sm rounded-2xl border border-border-default bg-background/85 p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                      <AnalyticsIcon />
                    </div>

                    <h3 className="mt-4 text-lg font-semibold tracking-[-0.025em]">
                      Not enough activity to calculate trends
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-foreground-secondary">
                      This visualization will activate after verified
                      business activity exists within the selected range.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "Previous period",
                    value: "—",
                  },
                  {
                    label: "Average",
                    value: "—",
                  },
                  {
                    label: "Highest period",
                    value: "—",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-border-subtle bg-surface-glass p-4"
                  >
                    <p className="text-xs text-foreground-muted">
                      {item.label}
                    </p>

                    <p className="mt-2 text-lg font-semibold text-foreground">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[1.7rem] border border-border-default bg-background/45 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                  <ActivityIcon />
                </span>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Channel performance
                  </p>

                  <p className="mt-1 text-xs text-foreground-muted">
                    Verified payment origins
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Hosted checkout",
                  "Payment links",
                  "QR",
                  "Point of sale",
                  "Embedded",
                ].map((channel) => (
                  <div
                    key={channel}
                    className="rounded-2xl border border-border-subtle bg-surface-glass p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-foreground-secondary">
                        {channel}
                      </span>

                      <span className="text-sm font-medium text-foreground">
                        —
                      </span>
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-secondary">
                      <div className="h-full w-0 rounded-full bg-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.7rem] border border-border-default bg-background/45 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                  <InsightIcon />
                </span>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Business insights
                  </p>

                  <p className="mt-1 text-xs text-foreground-muted">
                    Signals that need verified history
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  {
                    title: "Revenue movement",
                    description:
                      "Requires verified payments across multiple periods.",
                  },
                  {
                    title: "Customer retention",
                    description:
                      "Requires returning customer relationships.",
                  },
                  {
                    title: "Checkout performance",
                    description:
                      "Requires checkout sessions and completion records.",
                  },
                  {
                    title: "Settlement reliability",
                    description:
                      "Requires completed settlement history.",
                  },
                ].map((insight) => (
                  <article
                    key={insight.title}
                    className="rounded-2xl border border-border-subtle bg-surface-glass p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {insight.title}
                        </p>

                        <p className="mt-2 text-xs leading-5 text-foreground-muted">
                          {insight.description}
                        </p>
                      </div>

                      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-foreground-muted/30" />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <section className="mt-6 rounded-[1.7rem] border border-border-default bg-background/45 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Analytics readiness
              </p>

              <p className="mt-1 text-xs leading-5 text-foreground-muted">
                Business signals activate only when the underlying
                verified records exist.
              </p>
            </div>

            <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
              Awaiting activity
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Payment records", "Not available"],
              ["Customer history", "Not available"],
              ["Checkout sessions", "Not available"],
              ["Settlement records", "Not available"],
            ].map(([label, status]) => (
              <div
                key={label}
                className="rounded-2xl border border-border-subtle bg-surface-glass p-4"
              >
                <p className="text-xs text-foreground-muted">
                  {label}
                </p>

                <p className="mt-2 text-sm font-medium text-foreground">
                  {status}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
