"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { cn } from "@/utils/cn";

type Metrics = {
  volumeUsd: number;
  verifiedPayments: number;
  verifiedReceipts: number;
  runtimeSuccessRate: number;
  averageProcessingMs: number;
};

type ActivityEvent = {
  id: number;
  amountUsd: number;
  type: string;
  durationMs: number;
};

const INITIAL_METRICS: Metrics = {
  volumeUsd: 4287.42,
  verifiedPayments: 184,
  verifiedReceipts: 184,
  runtimeSuccessRate: 99.98,
  averageProcessingMs: 412,
};

const activityTypes = [
  "Peer payment verified",
  "Creator payment verified",
  "Merchant payment verified",
  "Agent payment verified",
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function createActivity(id: number): ActivityEvent {
  const amountUsd =
    Math.round((4 + Math.random() * 196) * 100) / 100;

  const durationMs =
    Math.round(260 + Math.random() * 360);

  const type =
    activityTypes[
      Math.floor(Math.random() * activityTypes.length)
    ];

  return {
    id,
    amountUsd,
    type,
    durationMs,
  };
}

export function NetworkMetrics() {
  const [metrics, setMetrics] =
    useState<Metrics>(INITIAL_METRICS);

  const [activities, setActivities] =
    useState<ActivityEvent[]>([
      {
        id: 1,
        amountUsd: 42.17,
        type: "Peer payment verified",
        durationMs: 384,
      },
      {
        id: 2,
        amountUsd: 18.5,
        type: "Creator payment verified",
        durationMs: 421,
      },
      {
        id: 3,
        amountUsd: 91.25,
        type: "Merchant payment verified",
        durationMs: 397,
      },
    ]);

  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const activity = createActivity(Date.now());

      setActivities((current) => [
        activity,
        ...current,
      ].slice(0, 4));

      setMetrics((current) => {
        const nextPayments =
          current.verifiedPayments + 1;

        const nextAverage =
          Math.round(
            (
              current.averageProcessingMs *
                current.verifiedPayments +
              activity.durationMs
            ) / nextPayments,
          );

        return {
          volumeUsd:
            Math.round(
              (
                current.volumeUsd +
                activity.amountUsd
              ) * 100,
            ) / 100,

          verifiedPayments: nextPayments,

          verifiedReceipts:
            current.verifiedReceipts + 1,

          runtimeSuccessRate:
            current.runtimeSuccessRate,

          averageProcessingMs: nextAverage,
        };
      });
    }, 4200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRunning]);

  const metricItems = useMemo(
    () => [
      {
        label: "Beta volume processed",
        value: formatCurrency(metrics.volumeUsd),
      },
      {
        label: "Verified payments",
        value: metrics.verifiedPayments.toLocaleString(),
      },
      {
        label: "Verified receipts",
        value: metrics.verifiedReceipts.toLocaleString(),
      },
      {
        label: "Runtime success",
        value: `${metrics.runtimeSuccessRate.toFixed(2)}%`,
      },
    ],
    [metrics],
  );

  return (
    <section
      aria-labelledby="network-metrics-heading"
      className={cn(
        "overflow-hidden rounded-[1.65rem]",
        "border border-border-default",
        "bg-surface-glass",
        "shadow-[var(--shadow-soft)]",
        "backdrop-blur-2xl",
      )}
    >
      <div className="flex flex-col gap-4 border-b border-border-subtle px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                isRunning
                  ? "bg-success shadow-[0_0_14px_var(--success)]"
                  : "bg-foreground-muted",
              )}
            />

            <p className="text-sm font-medium uppercase tracking-[0.16em] text-brand-secondary">
              Beta telemetry preview
            </p>
          </div>

          <h2
            id="network-metrics-heading"
            className="mt-2 text-xl font-semibold tracking-[-0.03em] sm:text-2xl"
          >
            The network is moving.
          </h2>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsRunning((current) => !current)
          }
          aria-pressed={!isRunning}
          className={cn(
            "inline-flex h-10 items-center justify-center",
            "rounded-full border border-border-default",
            "bg-surface-secondary px-4",
            "text-sm font-medium text-foreground-secondary",
            "transition-all duration-200",
            "hover:border-border-strong",
            "hover:text-foreground",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-brand-primary/45",
          )}
        >
          {isRunning
            ? "Pause preview"
            : "Resume preview"}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4">
        {metricItems.map((metric) => (
          <div
            key={metric.label}
            className="border-b border-border-subtle p-5 sm:p-6 xl:border-b-0 xl:border-r last:xl:border-r-0"
          >
            <p className="font-mono text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
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
            Average runtime processing
          </p>

          <p className="mt-2 font-mono text-2xl font-semibold">
            {metrics.averageProcessingMs} ms
          </p>

          <p className="mt-3 max-w-sm text-sm leading-6 text-foreground-secondary">
            Demonstration values update locally. Production
            metrics will be supplied by verified Zephyon
            Runtime telemetry.
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-foreground-muted">
            Recent beta activity
          </p>

          <div
            className="mt-3 space-y-2"
            aria-live="polite"
          >
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="grid grid-cols-[1fr_auto] gap-3 rounded-xl border border-border-subtle bg-surface-secondary px-4 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium">
                    {activity.type}
                  </p>

                  <p className="mt-1 text-xs text-foreground-muted">
                    Receipt generated ·{" "}
                    {activity.durationMs} ms
                  </p>
                </div>

                <p className="font-mono text-sm text-brand-primary">
                  +{formatCurrency(activity.amountUsd)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
