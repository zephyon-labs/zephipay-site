"use client";

import { useMemo, useState } from "react";

type PolicyView =
  | "overview"
  | "rules"
  | "approvals"
  | "limits"
  | "geography"
  | "velocity";

type PolicyViewDefinition = {
  id: PolicyView;
  label: string;
  description: string;
  emptyTitle: string;
};

const views: PolicyViewDefinition[] = [
  {
    id: "overview",
    label: "Overview",
    description:
      "Review policy coverage, approval readiness, Runtime integration, and decision activity.",
    emptyTitle: "No Runtime policies configured",
  },
  {
    id: "rules",
    label: "Rules",
    description:
      "Define executable conditions that shape how economic events may proceed.",
    emptyTitle: "No policy rules configured",
  },
  {
    id: "approvals",
    label: "Approvals",
    description:
      "Create approval chains for transactions, thresholds, reviews, and sensitive actions.",
    emptyTitle: "No approval workflows configured",
  },
  {
    id: "limits",
    label: "Limits",
    description:
      "Apply transaction, account, merchant, treasury, and agent spending boundaries.",
    emptyTitle: "No policy limits configured",
  },
  {
    id: "geography",
    label: "Geography",
    description:
      "Coordinate supported regions, restrictions, jurisdictions, and cross-border rules.",
    emptyTitle: "No geographic policies configured",
  },
  {
    id: "velocity",
    label: "Velocity",
    description:
      "Control transaction frequency, volume, bursts, and behavior over time.",
    emptyTitle: "No velocity controls configured",
  },
];

const metrics = [
  {
    label: "Policies",
    value: "—",
    detail: "Executable policy definitions.",
  },
  {
    label: "Approval flows",
    value: "—",
    detail: "Configured authorization paths.",
  },
  {
    label: "Runtime decisions",
    value: "—",
    detail: "Requires connected Runtime activity.",
  },
  {
    label: "Environments",
    value: "—",
    detail: "Connected policy execution contexts.",
  },
];

const readinessItems = [
  {
    label: "Rule library",
    status: "Not configured",
  },
  {
    label: "Approval chains",
    status: "Not configured",
  },
  {
    label: "Regional policies",
    status: "Not configured",
  },
  {
    label: "Velocity controls",
    status: "Not configured",
  },
  {
    label: "Runtime connection",
    status: "Not connected",
  },
];

const ruleCategories = [
  {
    title: "Transaction policies",
    description:
      "Control eligibility, amount, purpose, timing, and payment context.",
  },
  {
    title: "Participant policies",
    description:
      "Apply rules based on identity, account type, role, and verification state.",
  },
  {
    title: "Business policies",
    description:
      "Define organization-specific limits, permissions, and approval requirements.",
  },
  {
    title: "Settlement policies",
    description:
      "Coordinate supported rails, timing, confirmations, and destination requirements.",
  },
  {
    title: "Treasury policies",
    description:
      "Control reserves, transfers, funding sources, and treasury permissions.",
  },
  {
    title: "Agent policies",
    description:
      "Set budgets, merchants, purposes, tools, and autonomous spending boundaries.",
  },
];

const workflowExamples: Record<
  Exclude<PolicyView, "overview">,
  string[]
> = {
  rules: [
    "Transaction eligibility",
    "Business permissions",
    "Settlement conditions",
    "Treasury controls",
  ],
  approvals: [
    "Manager approval",
    "Threshold approval",
    "Multi-party approval",
    "Manual review",
  ],
  limits: [
    "Per transaction",
    "Daily account volume",
    "Merchant exposure",
    "Agent spending budget",
  ],
  geography: [
    "Supported regions",
    "Restricted regions",
    "Jurisdiction requirements",
    "Cross-border controls",
  ],
  velocity: [
    "Payments per minute",
    "Daily volume",
    "Burst protection",
    "Adaptive thresholds",
  ],
};

function PolicyIcon() {
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
      <path d="M7 4h10" />
      <path d="M5 8h14" />
      <path d="M7 12h10" />
      <path d="M9 16h6" />
      <path d="M11 20h2" />
    </svg>
  );
}

function RulesIcon() {
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
      <path d="M5 6h14" />
      <path d="M5 12h14" />
      <path d="M5 18h14" />
      <circle cx="8" cy="6" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <circle cx="11" cy="18" r="1.5" />
    </svg>
  );
}

function ApprovalIcon() {
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
      <circle cx="8" cy="8" r="3" />
      <circle cx="17" cy="16" r="3" />
      <path d="M10.5 10.5 14.5 14.5" />
      <path d="m15.5 16 1 1 2-2" />
    </svg>
  );
}

function LimitIcon() {
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
      <path d="M4 7h16" />
      <path d="M7 4v6" />
      <path d="M4 17h16" />
      <path d="M17 14v6" />
      <path d="M8 12h8" />
    </svg>
  );
}

function GlobeIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.7 2.6 4 5.6 4 9s-1.3 6.4-4 9" />
      <path d="M12 3c-2.7 2.6-4 5.6-4 9s1.3 6.4 4 9" />
    </svg>
  );
}

function VelocityIcon() {
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
      <path d="M4 16a8 8 0 1 1 16 0" />
      <path d="m12 12 4-4" />
      <path d="M7 16h10" />
    </svg>
  );
}

function RuntimeIcon() {
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
      <path d="M4 12h4l2-5 4 10 2-5h4" />
    </svg>
  );
}

const viewIcons: Record<PolicyView, React.ReactNode> = {
  overview: <PolicyIcon />,
  rules: <RulesIcon />,
  approvals: <ApprovalIcon />,
  limits: <LimitIcon />,
  geography: <GlobeIcon />,
  velocity: <VelocityIcon />,
};

export function PolicyEngineWorkspace() {
  const [activeView, setActiveView] =
    useState<PolicyView>("overview");

  const activeDefinition = useMemo(
    () =>
      views.find((view) => view.id === activeView) ??
      views[0],
    [activeView],
  );

  const activeExamples =
    activeView === "overview"
      ? []
      : workflowExamples[activeView];

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-xl">
      <header className="border-b border-border-subtle px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Policy Engine workspace
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              Define how value is allowed to move
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Turn business requirements, spending boundaries,
              approvals, regional controls, and behavioral thresholds
              into executable Runtime policy.
            </p>
          </div>

          <span className="w-fit rounded-full border border-border-default bg-surface-secondary px-4 py-2 text-xs font-medium text-foreground-muted">
            Runtime not connected
          </span>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Policy Engine views"
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

      <div className="grid xl:grid-cols-[1.2fr_0.8fr]">
        <div className="border-b border-border-subtle p-5 sm:p-7 xl:border-b-0 xl:border-r">
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

          <section className="mt-6 overflow-hidden rounded-[1.7rem] border border-border-default bg-background/45">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border-subtle px-5 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {activeDefinition.label}
                </p>

                <p className="mt-1 max-w-xl text-xs leading-5 text-foreground-muted">
                  {activeDefinition.description}
                </p>
              </div>

              <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
                No configured policies
              </span>
            </div>

            <div className="flex min-h-[25rem] flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
                {viewIcons[activeView]}
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
                {activeDefinition.emptyTitle}
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-6 text-foreground-secondary">
                Policies will appear here after rules, approval paths,
                limits, geographic requirements, or velocity controls
                are created and connected to Zephyon Runtime.
              </p>

              {activeExamples.length > 0 ? (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {activeExamples.map((example) => (
                    <span
                      key={example}
                      className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {[
                    "Deterministic",
                    "Explainable",
                    "Runtime enforced",
                    "Context aware",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {ruleCategories.map((category) => (
              <article
                key={category.title}
                className="rounded-2xl border border-border-default bg-surface-glass p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                    <RulesIcon />
                  </span>

                  <span className="rounded-full border border-border-default bg-background/45 px-3 py-1 text-[0.68rem] font-medium text-foreground-muted">
                    Not configured
                  </span>
                </div>

                <h3 className="mt-4 text-base font-semibold tracking-[-0.02em]">
                  {category.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-foreground-muted">
                  {category.description}
                </p>
              </article>
            ))}
          </section>
        </div>

        <aside className="bg-background/35 p-5 sm:p-7">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Policy readiness
          </p>

          <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
            No policy posture yet
          </h3>

          <p className="mt-3 text-sm leading-6 text-foreground-secondary">
            Readiness will reflect configured rules, approval chains,
            coverage, execution environments, and real Runtime decision
            history.
          </p>

          <div className="mt-6 flex items-center justify-center rounded-[1.7rem] border border-border-default bg-surface-glass px-5 py-10">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
                <PolicyIcon />
              </div>

              <p className="mt-5 text-4xl font-semibold tracking-[-0.055em]">
                —
              </p>

              <p className="mt-2 text-sm text-foreground-muted">
                No policy score available
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {readinessItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-surface-glass p-4"
              >
                <span className="text-sm text-foreground-secondary">
                  {item.label}
                </span>

                <span className="text-xs font-medium text-foreground-muted">
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <section className="mt-6 rounded-2xl border border-border-default bg-surface-glass p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                <RuntimeIcon />
              </span>

              <div>
                <p className="text-sm font-medium text-foreground">
                  Runtime decision
                </p>

                <p className="mt-1 text-xs text-foreground-muted">
                  Explainable policy execution
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                ["Economic event", "Not selected"],
                ["Matched policies", "—"],
                ["Decision", "—"],
                ["Execution environment", "Not connected"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle bg-background/45 px-4 py-3"
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

            <p className="mt-4 text-xs leading-5 text-foreground-muted">
              A decision record can preserve which policies matched,
              which conditions were evaluated, and why the Runtime
              approved, held, or rejected an event.
            </p>
          </section>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled
              className="rounded-full border border-border-default bg-surface-secondary px-5 py-3 text-sm font-medium text-foreground opacity-55"
            >
              Browse policies
            </button>

            <button
              type="button"
              disabled
              className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background opacity-45"
            >
              Create policy
            </button>
          </div>

          <p className="mt-3 text-center text-xs leading-5 text-foreground-muted">
            Policy execution activates after Runtime environments and
            policy storage are connected.
          </p>
        </aside>
      </div>
    </section>
  );
}
