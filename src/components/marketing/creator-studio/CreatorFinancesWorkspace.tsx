"use client";

import { useMemo, useState } from "react";

type FinanceView =
  | "all"
  | "available"
  | "pending"
  | "payouts"
  | "refunds"
  | "fees";

type FinanceFilter = {
  id: FinanceView;
  label: string;
  description: string;
};

const filters: FinanceFilter[] = [
  {
    id: "all",
    label: "All activity",
    description:
      "Creator earnings, settlements, payouts, refunds, and fees.",
  },
  {
    id: "available",
    label: "Available",
    description:
      "Settled funds currently eligible for withdrawal.",
  },
  {
    id: "pending",
    label: "Pending",
    description:
      "Payments still completing verification or settlement.",
  },
  {
    id: "payouts",
    label: "Payouts",
    description:
      "Transfers from your creator balance to a payout destination.",
  },
  {
    id: "refunds",
    label: "Refunds",
    description:
      "Reversed or returned creator payments.",
  },
  {
    id: "fees",
    label: "Fees",
    description:
      "Platform, network, settlement, and processing costs.",
  },
];

const financialMetrics = [
  {
    label: "Available balance",
    value: "$0.00",
    detail: "Settled funds ready to withdraw.",
  },
  {
    label: "Pending settlement",
    value: "$0.00",
    detail: "Payments still completing settlement.",
  },
  {
    label: "Next payout",
    value: "Not scheduled",
    detail: "Appears after payout setup.",
  },
  {
    label: "Lifetime revenue",
    value: "$0.00",
    detail: "Verified creator earnings over time.",
  },
];

const recordTypes = [
  {
    title: "Transaction history",
    description:
      "Export verified creator earnings, refunds, fees, and settlement events.",
    format: "CSV",
  },
  {
    title: "Payout records",
    description:
      "Export payout destinations, transfer dates, statuses, and amounts.",
    format: "CSV",
  },
  {
    title: "Tax-ready summary",
    description:
      "Prepare categorized annual revenue and fee totals for review.",
    format: "PDF",
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
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H18v16H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" />
      <path d="M4 8h14" />
      <path d="M15 11h5v5h-5a2.5 2.5 0 0 1 0-5Z" />
    </svg>
  );
}

function ReceiptIcon() {
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
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
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

export function CreatorFinancesWorkspace() {
  const [activeView, setActiveView] =
    useState<FinanceView>("all");
  const [query, setQuery] = useState("");

  const activeFilter = useMemo(
    () =>
      filters.find((filter) => filter.id === activeView) ??
      filters[0],
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
              Know where your money is
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Follow creator earnings from verified payment through
              settlement, balance availability, payout, and financial
              record.
            </p>
          </div>

          <div className="relative w-full xl:max-w-sm">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search financial activity"
              aria-label="Search creator financial activity"
              className="w-full rounded-full border border-border-default bg-background/70 px-5 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
            />
          </div>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Creator financial activity filters"
        >
          {filters.map((filter) => {
            const isActive = activeView === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveView(filter.id)}
                className={[
                  "shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "border-foreground/20 bg-foreground text-background"
                    : "border-border-default bg-surface-secondary text-foreground-secondary hover:bg-surface-elevated hover:text-foreground",
                ].join(" ")}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="p-5 sm:p-7">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {financialMetrics.map((metric) => (
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

        <div className="mt-6 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
          <section className="overflow-hidden rounded-[1.7rem] border border-border-default bg-background/45">
            <div className="border-b border-border-subtle px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {activeFilter.label}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-foreground-muted">
                    {activeFilter.description}
                  </p>
                </div>

                <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
                  No verified records
                </span>
              </div>
            </div>

            <div className="flex min-h-[25rem] flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
                <WalletIcon />
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
                {query.trim()
                  ? "No matching financial activity"
                  : "No creator financial activity yet"}
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-6 text-foreground-secondary">
                {query.trim()
                  ? `No verified financial records match “${query.trim()}”.`
                  : "Creator earnings, settlement records, fees, refunds, and payouts will appear after verified payment activity begins."}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted">
                  Verified earnings
                </span>

                <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted">
                  Settlement status
                </span>

                <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted">
                  Fee transparency
                </span>
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-[1.7rem] border border-border-default bg-background/45 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
                <BankIcon />
              </div>

              <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                Payout destination
              </p>

              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                Not connected
              </h3>

              <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                Connect an eligible bank account or supported settlement
                destination before withdrawing creator funds.
              </p>

              <button
                type="button"
                disabled
                className="mt-5 w-full rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background opacity-45"
              >
                Sign in to connect payout
              </button>
            </section>

            <section className="rounded-[1.7rem] border border-border-default bg-background/45 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                Settlement summary
              </p>

              <dl className="mt-4 space-y-3">
                {[
                  ["Gross revenue", "$0.00"],
                  ["Refunds", "$0.00"],
                  ["Fees", "$0.00"],
                  ["Net settled", "$0.00"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle bg-surface-elevated/45 px-4 py-3"
                  >
                    <dt className="text-xs text-foreground-muted">
                      {label}
                    </dt>

                    <dd className="text-sm font-medium text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </aside>
        </div>

        <section className="mt-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Financial records
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
              Clear records for review and reporting
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Exportable records will remain tied to verified creator
              activity, fees, settlement status, and payout history.
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {recordTypes.map((record) => (
              <article
                key={record.title}
                className="rounded-[1.5rem] border border-border-default bg-background/45 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                    <ReceiptIcon />
                  </div>

                  <span className="rounded-full border border-border-default bg-surface-secondary px-2.5 py-1 text-xs text-foreground-muted">
                    {record.format}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-[-0.025em]">
                  {record.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                  {record.description}
                </p>

                <button
                  type="button"
                  disabled
                  className="mt-5 rounded-full border border-border-default bg-surface-secondary px-4 py-2 text-sm font-medium text-foreground-muted opacity-65"
                >
                  Export after sign-in
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
