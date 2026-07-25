"use client";

import { useMemo, useState } from "react";

type TelemetryView =
  | "overview"
  | "engines"
  | "events"
  | "settlement"
  | "resilience"
  | "infrastructure";

type RuntimeEnvironment =
  | "solana-devnet"
  | "solana-testnet"
  | "solana-mainnet";

type TelemetryViewDefinition = {
  id: TelemetryView;
  label: string;
  description: string;
  emptyTitle: string;
};

const views: TelemetryViewDefinition[] = [
  {
    id: "overview",
    label: "Overview",
    description:
      "Review Runtime connection, engine readiness, event flow, settlement, and infrastructure health.",
    emptyTitle: "Runtime telemetry is not connected",
  },
  {
    id: "engines",
    label: "Engines",
    description:
      "Observe Identity, Compliance, Risk, Policy, Settlement, Treasury, and orchestration activity.",
    emptyTitle: "No engine telemetry available",
  },
  {
    id: "events",
    label: "Events",
    description:
      "Inspect economic-event timelines from intent creation through verification.",
    emptyTitle: "No Runtime events recorded",
  },
  {
    id: "settlement",
    label: "Settlement",
    description:
      "Review execution, confirmation, settlement timing, rail status, and finality.",
    emptyTitle: "No settlement telemetry available",
  },
  {
    id: "resilience",
    label: "Resilience",
    description:
      "Observe retries, recoveries, failures, fallback behavior, and execution attempts.",
    emptyTitle: "No resilience events recorded",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    description:
      "Review RPC connectivity, endpoint health, network readiness, and environment status.",
    emptyTitle: "No infrastructure telemetry available",
  },
];

const metrics = [
  {
    label: "Runtime status",
    value: "—",
    detail: "Requires a live Runtime connection.",
  },
  {
    label: "Events",
    value: "—",
    detail: "Economic events in the selected environment.",
  },
  {
    label: "Average duration",
    value: "—",
    detail: "Requires completed Runtime timelines.",
  },
  {
    label: "Settlement success",
    value: "—",
    detail: "Requires verified settlement history.",
  },
];

const engineDefinitions = [
  {
    name: "Identity",
    purpose: "Resolve the participant behind the economic action.",
  },
  {
    name: "Compliance",
    purpose: "Coordinate verification, sanctions, and monitoring requirements.",
  },
  {
    name: "Risk",
    purpose: "Evaluate behavioral, transactional, and settlement signals.",
  },
  {
    name: "Policy",
    purpose: "Apply executable rules, limits, permissions, and approvals.",
  },
  {
    name: "Orchestration",
    purpose: "Coordinate the event across engines and execution adapters.",
  },
  {
    name: "Settlement",
    purpose: "Execute the selected rail and preserve the settlement outcome.",
  },
  {
    name: "Treasury",
    purpose: "Coordinate balances, fees, reserves, and treasury movement.",
  },
  {
    name: "Telemetry",
    purpose: "Preserve timelines, outcomes, health, and operational evidence.",
  },
];

const eventTimeline = [
  {
    step: "01",
    label: "Intent",
    detail: "Economic intent created",
  },
  {
    step: "02",
    label: "Identity",
    detail: "Participant resolution",
  },
  {
    step: "03",
    label: "Compliance",
    detail: "Requirements evaluated",
  },
  {
    step: "04",
    label: "Risk",
    detail: "Signals evaluated",
  },
  {
    step: "05",
    label: "Policy",
    detail: "Rules enforced",
  },
  {
    step: "06",
    label: "Orchestration",
    detail: "Execution coordinated",
  },
  {
    step: "07",
    label: "Settlement",
    detail: "Rail outcome preserved",
  },
  {
    step: "08",
    label: "Receipt",
    detail: "Verification record created",
  },
];

const environmentLabels: Record<RuntimeEnvironment, string> = {
  "solana-devnet": "Solana Devnet",
  "solana-testnet": "Solana Testnet",
  "solana-mainnet": "Solana Mainnet",
};

function PulseIcon() {
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
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </svg>
  );
}

function EngineIcon() {
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
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="m5.6 5.6 2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </svg>
  );
}

function EventIcon() {
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
      <path d="M6 4h12v16H6z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  );
}

function SettlementIcon() {
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
      <path d="M5 7h12" />
      <path d="m14 4 3 3-3 3" />
      <path d="M19 17H7" />
      <path d="m10 14-3 3 3 3" />
    </svg>
  );
}

function ResilienceIcon() {
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
      <path d="M4 12a8 8 0 1 0 2.3-5.7" />
      <path d="M4 5v7h7" />
    </svg>
  );
}

function InfrastructureIcon() {
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
      <rect x="4" y="4" width="16" height="6" rx="2" />
      <rect x="4" y="14" width="16" height="6" rx="2" />
      <path d="M8 7h.01M8 17h.01M12 10v4" />
    </svg>
  );
}

function ClockIcon() {
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
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const viewIcons: Record<TelemetryView, React.ReactNode> = {
  overview: <PulseIcon />,
  engines: <EngineIcon />,
  events: <EventIcon />,
  settlement: <SettlementIcon />,
  resilience: <ResilienceIcon />,
  infrastructure: <InfrastructureIcon />,
};

export function RuntimeTelemetryWorkspace() {
  const [activeView, setActiveView] =
    useState<TelemetryView>("overview");
  const [environment, setEnvironment] =
    useState<RuntimeEnvironment>("solana-devnet");

  const activeDefinition = useMemo(
    () =>
      views.find((view) => view.id === activeView) ??
      views[0],
    [activeView],
  );

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-xl">
      <header className="border-b border-border-subtle px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Runtime telemetry workspace
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              Observe the system behind every economic event
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-foreground-secondary">
              Inspect engine readiness, event timelines, settlement,
              resilience, and infrastructure across the Zephyon Runtime
              without manufacturing operational data.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              value={environment}
              onChange={(event) =>
                setEnvironment(
                  event.target.value as RuntimeEnvironment,
                )
              }
              aria-label="Runtime environment"
              className="rounded-full border border-border-default bg-background/70 px-4 py-3 text-sm text-foreground outline-none focus:border-foreground/30"
            >
              <option value="solana-devnet">Solana Devnet</option>
              <option value="solana-testnet">Solana Testnet</option>
              <option value="solana-mainnet">Solana Mainnet</option>
            </select>

            <span className="w-fit rounded-full border border-border-default bg-surface-secondary px-4 py-2.5 text-xs font-medium text-foreground-muted">
              Runtime not connected
            </span>
          </div>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Runtime telemetry views"
        >
          {views.map((view) => {
            const isActive = activeView === view.id;

            return (
              <button
                key={view.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveView(view.id)}
                className={[
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "border-foreground/20 bg-foreground text-background"
                    : "border-border-default bg-surface-secondary text-foreground-secondary hover:bg-surface-elevated hover:text-foreground",
                ].join(" ")}
              >
                {viewIcons[view.id]}
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

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <section className="overflow-hidden rounded-[1.7rem] border border-border-default bg-background/45">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border-subtle px-5 py-4 sm:px-6">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {activeDefinition.label}
                </p>

                <p className="mt-1 max-w-xl text-xs leading-5 text-foreground-muted">
                  {activeDefinition.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
                  {environmentLabels[environment]}
                </span>

                <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
                  No live telemetry
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {engineDefinitions.map((engine) => (
                  <article
                    key={engine.name}
                    className="rounded-2xl border border-border-subtle bg-surface-glass p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                        <EngineIcon />
                      </span>

                      <span className="h-2.5 w-2.5 rounded-full bg-foreground-muted/30" />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold tracking-[-0.015em]">
                      {engine.name}
                    </h3>

                    <p className="mt-2 min-h-[4rem] text-xs leading-5 text-foreground-muted">
                      {engine.purpose}
                    </p>

                    <p className="mt-4 border-t border-border-subtle pt-3 text-xs font-medium text-foreground-muted">
                      Not connected
                    </p>
                  </article>
                ))}
              </div>

              <section className="mt-6 overflow-hidden rounded-[1.6rem] border border-border-default bg-surface-glass">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Economic event timeline
                    </p>

                    <p className="mt-1 text-xs leading-5 text-foreground-muted">
                      The ordered Runtime stages preserved for a selected
                      economic event.
                    </p>
                  </div>

                  <span className="rounded-full border border-border-default bg-background/45 px-3 py-1.5 text-xs text-foreground-muted">
                    No event selected
                  </span>
                </div>

                <div className="p-5">
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {eventTimeline.map((item) => (
                      <article
                        key={item.step}
                        className="rounded-2xl border border-border-subtle bg-background/45 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                            {item.step}
                          </span>

                          <span className="h-2.5 w-2.5 rounded-full bg-foreground-muted/30" />
                        </div>

                        <h3 className="mt-4 text-sm font-semibold">
                          {item.label}
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-foreground-muted">
                          {item.detail}
                        </p>
                      </article>
                    ))}
                  </div>

                  <div className="mt-5 flex min-h-[12rem] flex-col items-center justify-center rounded-2xl border border-border-subtle bg-background/35 px-6 py-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                      {viewIcons[activeView]}
                    </div>

                    <h3 className="mt-4 text-lg font-semibold tracking-[-0.025em]">
                      {activeDefinition.emptyTitle}
                    </h3>

                    <p className="mt-2 max-w-lg text-xs leading-5 text-foreground-secondary">
                      Live Runtime timelines, engine outcomes, durations,
                      retries, infrastructure health, and settlement
                      evidence will appear after telemetry is connected.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[1.7rem] border border-border-default bg-background/45 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                  <PulseIcon />
                </span>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Runtime health
                  </p>

                  <p className="mt-1 text-xs text-foreground-muted">
                    Environment readiness
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["Environment", environmentLabels[environment]],
                  ["Runtime connection", "Not connected"],
                  ["Orchestrator", "Not available"],
                  ["Adapter registry", "Not available"],
                  ["Event bus", "Not available"],
                  ["Telemetry store", "Not connected"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-surface-glass p-4"
                  >
                    <span className="text-sm text-foreground-secondary">
                      {label}
                    </span>

                    <span className="text-right text-xs font-medium text-foreground-muted">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.7rem] border border-border-default bg-background/45 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                  <ClockIcon />
                </span>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Selected event
                  </p>

                  <p className="mt-1 text-xs text-foreground-muted">
                    Runtime execution record
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["Runtime ID", "—"],
                  ["Payment ID", "—"],
                  ["Transaction ID", "—"],
                  ["Decision", "—"],
                  ["Duration", "—"],
                  ["Attempts", "—"],
                  ["Settlement", "—"],
                  ["Receipt ID", "—"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle bg-surface-glass px-4 py-3"
                  >
                    <span className="text-sm text-foreground-secondary">
                      {label}
                    </span>

                    <span className="text-xs font-medium text-foreground-muted">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.7rem] border border-border-default bg-background/45 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                  <ResilienceIcon />
                </span>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Resilience
                  </p>

                  <p className="mt-1 text-xs text-foreground-muted">
                    Recovery and execution attempts
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  ["Attempts", "—"],
                  ["Retries", "—"],
                  ["Recovered", "—"],
                  ["Failures", "—"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border-subtle bg-surface-glass p-4"
                  >
                    <p className="text-xs text-foreground-muted">
                      {label}
                    </p>

                    <p className="mt-2 text-lg font-semibold">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs leading-5 text-foreground-muted">
                Retry attempts, recovery outcomes, non-retryable errors,
                and exhausted executions will appear after resilience
                telemetry is connected.
              </p>
            </section>
          </aside>
        </div>

        <section className="mt-6 rounded-[1.7rem] border border-border-default bg-background/45 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Telemetry readiness
              </p>

              <p className="mt-1 text-xs leading-5 text-foreground-muted">
                The workspace activates from live Runtime events rather
                than sample operational metrics.
              </p>
            </div>

            <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
              Awaiting connection
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              ["Runtime API", "Not connected"],
              ["Event stream", "Not connected"],
              ["Engine telemetry", "Not available"],
              ["Settlement records", "Not available"],
              ["Infrastructure health", "Not available"],
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
