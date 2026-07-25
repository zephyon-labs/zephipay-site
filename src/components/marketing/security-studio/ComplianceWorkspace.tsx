"use client";

import { useMemo, useState } from "react";

type ComplianceView =
  | "overview"
  | "kyc"
  | "kyb"
  | "sanctions"
  | "monitoring"
  | "reviews";

type ComplianceViewDefinition = {
  id: ComplianceView;
  label: string;
  description: string;
  emptyTitle: string;
};

const views: ComplianceViewDefinition[] = [
  {
    id: "overview",
    label: "Overview",
    description:
      "Review identity requirements, monitoring coverage, sanctions checks, and compliance readiness.",
    emptyTitle: "No compliance activity yet",
  },
  {
    id: "kyc",
    label: "KYC",
    description:
      "Coordinate identity-verification requirements for individual participants.",
    emptyTitle: "No individual verification records",
  },
  {
    id: "kyb",
    label: "KYB",
    description:
      "Coordinate business verification, ownership, and organizational requirements.",
    emptyTitle: "No business verification records",
  },
  {
    id: "sanctions",
    label: "Sanctions",
    description:
      "Review sanctions-screening results and watchlist checks tied to economic activity.",
    emptyTitle: "No sanctions screening records",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    description:
      "Review transaction-monitoring signals, patterns, thresholds, and escalations.",
    emptyTitle: "No monitoring activity",
  },
  {
    id: "reviews",
    label: "Review queue",
    description:
      "Manage cases requiring additional verification, investigation, or approval.",
    emptyTitle: "No reviews awaiting action",
  },
];

const metrics = [
  {
    label: "Open reviews",
    value: "—",
    detail: "Requires connected compliance activity.",
  },
  {
    label: "Verification status",
    value: "—",
    detail: "Requires connected participants.",
  },
  {
    label: "Monitoring alerts",
    value: "—",
    detail: "Requires transaction-monitoring history.",
  },
  {
    label: "Sanctions checks",
    value: "—",
    detail: "Requires screening activity.",
  },
];

const readinessItems = [
  {
    label: "KYC provider",
    status: "Not connected",
  },
  {
    label: "KYB provider",
    status: "Not connected",
  },
  {
    label: "Sanctions screening",
    status: "Not configured",
  },
  {
    label: "Transaction monitoring",
    status: "Not configured",
  },
  {
    label: "Review workflow",
    status: "Not configured",
  },
];

const requirementCards = [
  {
    title: "Identity requirements",
    description:
      "Apply the appropriate verification level based on participant type and transaction context.",
  },
  {
    title: "Jurisdiction awareness",
    description:
      "Coordinate requirements based on geography, business activity, and supported payment rails.",
  },
  {
    title: "Ongoing monitoring",
    description:
      "Evaluate activity over time instead of treating compliance as a single onboarding event.",
  },
  {
    title: "Human review",
    description:
      "Escalate uncertain or higher-risk activity when automated controls are not enough.",
  },
];

function ComplianceIcon() {
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
      <path d="M12 3 5 6v5c0 4.6 2.8 8.1 7 10 4.2-1.9 7-5.4 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function PersonIcon() {
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
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20c.7-4.2 3-6.3 7-6.3s6.3 2.1 7 6.3" />
    </svg>
  );
}

function BusinessIcon() {
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
      <path d="M4 20V8l8-4 8 4v12" />
      <path d="M8 20v-4h8v4" />
      <path d="M8 10h.01M12 10h.01M16 10h.01M8 13h.01M12 13h.01M16 13h.01" />
    </svg>
  );
}

function WatchlistIcon() {
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
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
      <path d="M8 11h6M11 8v6" />
    </svg>
  );
}

function MonitoringIcon() {
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

function ReviewIcon() {
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
      <path d="M6 3h12v18H6z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  );
}

const viewIcons: Record<ComplianceView, React.ReactNode> = {
  overview: <ComplianceIcon />,
  kyc: <PersonIcon />,
  kyb: <BusinessIcon />,
  sanctions: <WatchlistIcon />,
  monitoring: <MonitoringIcon />,
  reviews: <ReviewIcon />,
};

export function ComplianceWorkspace() {
  const [activeView, setActiveView] =
    useState<ComplianceView>("overview");

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
              Compliance workspace
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              Coordinate responsible payment activity
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Bring identity requirements, sanctions screening,
              transaction monitoring, jurisdictional rules, and human
              review into the payment lifecycle before settlement.
            </p>
          </div>

          <span className="w-fit rounded-full border border-border-default bg-surface-secondary px-4 py-2 text-xs font-medium text-foreground-muted">
            No compliance providers connected
          </span>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Compliance views"
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
                No verified records
              </span>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_auto] border-b border-border-subtle bg-surface-glass px-5 py-3 text-xs font-medium text-foreground-muted sm:grid-cols-[1.2fr_0.8fr_0.7fr_0.6fr]">
              <span>Record</span>
              <span className="hidden sm:block">Type</span>
              <span className="hidden sm:block">Status</span>
              <span className="text-right">Updated</span>
            </div>

            <div className="flex min-h-[26rem] flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
                {viewIcons[activeView]}
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
                {activeDefinition.emptyTitle}
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-6 text-foreground-secondary">
                Connected verification, screening, monitoring, and review
                records will appear here after compliance providers and
                Runtime activity are available.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  "Identity-aware",
                  "Jurisdiction-aware",
                  "Monitored",
                  "Reviewable",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-3 sm:grid-cols-2">
            {requirementCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-border-default bg-surface-glass p-5"
              >
                <h3 className="text-base font-semibold tracking-[-0.02em]">
                  {card.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-foreground-muted">
                  {card.description}
                </p>
              </article>
            ))}
          </section>
        </div>

        <aside className="bg-background/35 p-5 sm:p-7">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Compliance readiness
          </p>

          <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
            No compliance posture yet
          </h3>

          <p className="mt-3 text-sm leading-6 text-foreground-secondary">
            Readiness will be based on connected providers, configured
            requirements, verified participants, and real monitoring
            history.
          </p>

          <div className="mt-6 flex items-center justify-center rounded-[1.7rem] border border-border-default bg-surface-glass px-5 py-10">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
                <ComplianceIcon />
              </div>

              <p className="mt-5 text-4xl font-semibold tracking-[-0.055em]">
                —
              </p>

              <p className="mt-2 text-sm text-foreground-muted">
                No readiness score available
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
                <ReviewIcon />
              </span>

              <div>
                <p className="text-sm font-medium text-foreground">
                  Review queue
                </p>

                <p className="mt-1 text-xs text-foreground-muted">
                  Cases requiring additional action
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-border-subtle bg-background/45 p-5 text-center">
              <p className="text-sm font-medium text-foreground">
                No reviews awaiting action
              </p>

              <p className="mt-2 text-xs leading-5 text-foreground-muted">
                Verification exceptions, sanctions matches, monitoring
                alerts, and policy escalations will appear here when
                review workflows are connected.
              </p>
            </div>
          </section>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled
              className="rounded-full border border-border-default bg-surface-secondary px-5 py-3 text-sm font-medium text-foreground opacity-55"
            >
              Review providers
            </button>

            <button
              type="button"
              disabled
              className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background opacity-45"
            >
              Configure compliance
            </button>
          </div>

          <p className="mt-3 text-center text-xs leading-5 text-foreground-muted">
            Compliance controls activate after providers, requirements,
            and review workflows are connected.
          </p>
        </aside>
      </div>
    </section>
  );
}
