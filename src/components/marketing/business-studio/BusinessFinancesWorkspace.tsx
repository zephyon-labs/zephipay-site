"use client";

import { useMemo, useState } from "react";

type FinanceView =
  | "all"
  | "available"
  | "pending"
  | "deposits"
  | "refunds"
  | "fees";

type FinanceViewDefinition = {
  id: FinanceView;
  label: string;
  description: string;
  emptyTitle: string;
};

const views: FinanceViewDefinition[] = [
  {
    id: "all",
    label: "All activity",
    description:
      "Every verified financial event across payments, settlement, deposits, refunds, and fees.",
    emptyTitle: "No financial activity yet",
  },
  {
    id: "available",
    label: "Available",
    description:
      "Funds that completed settlement and are available for business use.",
    emptyTitle: "No available balance activity",
  },
  {
    id: "pending",
    label: "Pending",
    description:
      "Funds still completing payment confirmation or settlement.",
    emptyTitle: "No pending settlement activity",
  },
  {
    id: "deposits",
    label: "Deposits",
    description:
      "Transfers from ZephiPay to connected business destinations.",
    emptyTitle: "No deposits recorded",
  },
  {
    id: "refunds",
    label: "Refunds",
    description:
      "Customer refunds connected to the original verified payment.",
    emptyTitle: "No refunds recorded",
  },
  {
    id: "fees",
    label: "Fees",
    description:
      "Visible platform, payment, and settlement costs.",
    emptyTitle: "No fees recorded",
  },
];

const metrics = [
  {
    label: "Available",
    value: "$0.00",
    detail: "Settled business funds currently available.",
  },
  {
    label: "Pending",
    value: "$0.00",
    detail: "Funds still completing settlement.",
  },
  {
    label: "Deposits",
    value: "$0.00",
    detail: "Transfers to connected destinations.",
  },
  {
    label: "Fees",
    value: "$0.00",
    detail: "Visible platform and settlement costs.",
  },
];

function WalletIcon() {
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
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H18a2 2 0 0 1 2 2v2H7a3 3 0 0 0 0 6h13v4a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" />
      <path d="M7 8h14v6H7a3 3 0 0 1 0-6Z" />
      <circle cx="17" cy="11" r="1" />
    </svg>
  );
}

function BankIcon() {
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
      <path d="m3 9 9-5 9 5" />
      <path d="M5 10v7M9 10v7M15 10v7M19 10v7" />
      <path d="M3 20h18M4 17h16" />
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

function ExportIcon() {
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
      <path d="M12 3v12" />
      <path d="m8 11 4 4 4-4" />
      <path d="M5 19h14" />
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

export function BusinessFinancesWorkspace() {
  const [activeView, setActiveView] = useState<FinanceView>("all");
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState("All time");

  const activeViewDefinition = useMemo(
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
              Financial workspace
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              Understand where business funds are
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Review balances, settlement, deposits, refunds, fees,
              payout destinations, and accounting records from one
              verified financial history.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={dateRange}
              onChange={(event) => setDateRange(event.target.value)}
              aria-label="Finance date range"
              className="rounded-full border border-border-default bg-background/70 px-4 py-3 text-sm text-foreground outline-none focus:border-foreground/30"
            >
              <option>All time</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search financial activity"
              aria-label="Search financial activity"
              className="min-w-0 rounded-full border border-border-default bg-background/70 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30 sm:min-w-[15rem]"
            />
          </div>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Financial activity filters"
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

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <section className="overflow-hidden rounded-[1.7rem] border border-border-default bg-background/45">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border-subtle px-5 py-4 sm:px-6">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {activeViewDefinition.label}
                </p>

                <p className="mt-1 max-w-xl text-xs leading-5 text-foreground-muted">
                  {activeViewDefinition.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
                  {dateRange}
                </span>

                <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
                  No verified records
                </span>
              </div>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_auto] border-b border-border-subtle bg-surface-glass px-5 py-3 text-xs font-medium text-foreground-muted sm:grid-cols-[1.2fr_0.8fr_0.7fr_0.6fr] sm:px-6">
              <span>Activity</span>
              <span className="hidden sm:block">Status</span>
              <span className="hidden sm:block">Date</span>
              <span className="text-right">Amount</span>
            </div>

            <div className="flex min-h-[30rem] flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
                <WalletIcon />
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
                {query.trim()
                  ? "No matching financial activity"
                  : activeViewDefinition.emptyTitle}
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-6 text-foreground-secondary">
                {query.trim()
                  ? `No verified financial records match “${query.trim()}” within ${dateRange.toLowerCase()}.`
                  : "Verified payments, settlement events, deposits, refunds, and fees will appear here after business activity begins."}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  "Verified payments",
                  "Settlement status",
                  "Visible fees",
                  "Accounting ready",
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

          <aside className="space-y-6">
            <section className="rounded-[1.7rem] border border-border-default bg-background/45 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                  <SettlementIcon />
                </span>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Settlement
                  </p>

                  <p className="mt-1 text-xs text-foreground-muted">
                    Current financial readiness
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["Business identity", "Required"],
                  ["Payment activity", "Not available"],
                  ["Settlement rail", "Not connected"],
                  ["Deposit schedule", "Not configured"],
                ].map(([label, status]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-surface-glass p-4"
                  >
                    <span className="text-sm text-foreground-secondary">
                      {label}
                    </span>

                    <span className="text-xs font-medium text-foreground-muted">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.7rem] border border-border-default bg-background/45 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                  <BankIcon />
                </span>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Payout destination
                  </p>

                  <p className="mt-1 text-xs text-foreground-muted">
                    Where settled funds are sent
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-border-subtle bg-surface-glass p-5">
                <p className="text-sm font-medium text-foreground">
                  No destination connected
                </p>

                <p className="mt-2 text-xs leading-5 text-foreground-muted">
                  A verified business bank account or supported settlement
                  destination is required before deposits can begin.
                </p>

                <button
                  type="button"
                  disabled
                  className="mt-5 w-full rounded-full border border-border-default bg-surface-secondary px-4 py-3 text-sm font-medium text-foreground opacity-55"
                >
                  Connect destination
                </button>
              </div>
            </section>

            <section className="rounded-[1.7rem] border border-border-default bg-background/45 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                  <ExportIcon />
                </span>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Accounting exports
                  </p>

                  <p className="mt-1 text-xs text-foreground-muted">
                    Reconciliation-ready records
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  ["CSV", "Activity export"],
                  ["Receipts", "Verified records"],
                  ["Fees", "Cost summary"],
                  ["Settlement", "Deposit report"],
                ].map(([label, detail]) => (
                  <button
                    key={label}
                    type="button"
                    disabled
                    className="rounded-2xl border border-border-subtle bg-surface-glass p-4 text-left opacity-60"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {label}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-foreground-muted">
                      {detail}
                    </p>
                  </button>
                ))}
              </div>

              <p className="mt-4 text-xs leading-5 text-foreground-muted">
                Exports activate after verified financial records exist.
              </p>
            </section>
          </aside>
        </div>

        <section className="mt-6 rounded-[1.7rem] border border-border-default bg-background/45 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
              <ActivityIcon />
            </span>

            <div>
              <p className="text-sm font-medium text-foreground">
                Financial flow
              </p>

              <p className="mt-1 text-xs text-foreground-muted">
                How verified funds move through ZephiPay
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Payment received",
                detail:
                  "A customer payment completes through a supported checkout or payment flow.",
              },
              {
                step: "02",
                title: "Verification",
                detail:
                  "Identity, compliance, risk, policy, and payment records are evaluated.",
              },
              {
                step: "03",
                title: "Settlement",
                detail:
                  "Approved funds complete settlement and become available.",
              },
              {
                step: "04",
                title: "Deposit",
                detail:
                  "Available funds move to the connected business destination.",
              },
            ].map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-border-subtle bg-surface-glass p-5"
              >
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                  {item.step}
                </p>

                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em] text-foreground">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs leading-5 text-foreground-muted">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
