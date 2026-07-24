"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ReceiptFilter =
  | "All"
  | "Sent"
  | "Received"
  | "Completed"
  | "Pending";

const receiptFilters: ReceiptFilter[] = [
  "All",
  "Sent",
  "Received",
  "Completed",
  "Pending",
];

const receiptFields = [
  ["Status", "—"],
  ["Amount", "—"],
  ["Sender", "—"],
  ["Recipient", "—"],
  ["Purpose", "—"],
  ["Network", "—"],
  ["Transaction", "—"],
  ["Receipt ID", "—"],
  ["Timestamp", "—"],
];

const runtimeStages = [
  {
    label: "Intent created",
    description:
      "The sender defines who should be paid, how much, and why.",
  },
  {
    label: "Identity evaluated",
    description:
      "Relevant participant and account signals are reviewed.",
  },
  {
    label: "Compliance checked",
    description:
      "Applicable policy and compliance requirements are coordinated.",
  },
  {
    label: "Risk evaluated",
    description:
      "Transaction and account risk signals are assessed.",
  },
  {
    label: "Policy applied",
    description:
      "The Runtime determines whether the payment may continue.",
  },
  {
    label: "Settlement confirmed",
    description:
      "The selected payment rail confirms the transaction result.",
  },
  {
    label: "Receipt generated",
    description:
      "ZephiPay preserves the outcome and available evidence.",
  },
];

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function VerifiedReceiptInterface() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<ReceiptFilter>("All");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(true);

  const searchSummary = useMemo(() => {
    const terms: string[] = [];

    if (query.trim()) {
      terms.push(`“${query.trim()}”`);
    }

    if (activeFilter !== "All") {
      terms.push(activeFilter.toLowerCase());
    }

    return terms.length > 0 ? terms.join(" · ") : "all receipts";
  }, [activeFilter, query]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border-default bg-background shadow-[var(--shadow-medium)]">
      <div className="border-b border-border-subtle px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Product interface
            </p>

            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
              Receipt explorer
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-brand-primary/25 bg-brand-primary/[0.08] px-3 py-1.5 text-xs font-medium text-brand-secondary">
              Solana Devnet
            </span>

            <span className="rounded-full border border-border-default bg-surface-glass px-3 py-1.5 text-xs text-foreground-secondary">
              Test funds only
            </span>
          </div>
        </div>
      </div>

      <div className="border-b border-border-subtle bg-surface-glass px-6 py-6 sm:px-8">
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-foreground-muted">
            <SearchIcon />
          </span>

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Search by person, amount, purpose, receipt ID, or transaction"
            className="h-13 w-full rounded-2xl border border-border-default bg-background/70 pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-brand-primary/45 focus:ring-2 focus:ring-brand-primary/10"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {receiptFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  activeFilter === filter
                    ? "border-brand-primary/35 bg-brand-primary/[0.09] text-foreground"
                    : "border-border-default bg-background/55 text-foreground-secondary hover:border-border-strong"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setAdvancedOpen((open) => !open)}
            aria-expanded={advancedOpen}
            className="inline-flex items-center gap-2 rounded-full border border-border-default bg-background/55 px-4 py-2 text-sm text-foreground-secondary transition hover:border-brand-primary/35 hover:text-foreground"
          >
            <FilterIcon />
            Advanced filters
            <ChevronIcon open={advancedOpen} />
          </button>
        </div>

        {advancedOpen && (
          <div className="mt-5 grid gap-4 rounded-2xl border border-border-subtle bg-background/55 p-5 md:grid-cols-3">
            <label className="grid gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-foreground-muted">
                Date range
              </span>

              <select className="h-11 rounded-xl border border-border-default bg-background px-3 text-sm text-foreground outline-none focus:border-brand-primary/45">
                <option>Any time</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Custom range</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-foreground-muted">
                Network
              </span>

              <select className="h-11 rounded-xl border border-border-default bg-background px-3 text-sm text-foreground outline-none focus:border-brand-primary/45">
                <option>All networks</option>
                <option>Solana Devnet</option>
                <option>Solana Testnet</option>
                <option>Solana Mainnet</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-foreground-muted">
                Asset
              </span>

              <select className="h-11 rounded-xl border border-border-default bg-background px-3 text-sm text-foreground outline-none focus:border-brand-primary/45">
                <option>All assets</option>
                <option>USDC</option>
                <option>SOL</option>
                <option>ZERA</option>
              </select>
            </label>
          </div>
        )}
      </div>

      <div className="grid xl:grid-cols-[0.8fr_1.2fr]">
        <section className="border-b border-border-subtle p-6 xl:border-b-0 xl:border-r sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                Receipt history
              </p>

              <h4 className="mt-3 text-xl font-semibold">
                Search results
              </h4>
            </div>

            <span className="text-xs text-foreground-muted">
              0 records
            </span>
          </div>

          <div className="mt-6 flex min-h-[32rem] items-center justify-center rounded-2xl border border-dashed border-border-default bg-surface-glass px-6 py-12 text-center">
            <div className="max-w-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-secondary">
                <ReceiptIcon />
              </div>

              <h5 className="mt-6 text-xl font-semibold">
                No receipts to display
              </h5>

              <p className="mt-4 text-sm leading-7 text-foreground-secondary">
                Authenticated payment receipts matching {searchSummary} will
                appear here after supported transactions complete.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="/personal#personal-workspace"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary px-5 py-3 text-sm font-medium text-brand-contrast transition hover:brightness-105"
                >
                  Move money
                  <ArrowIcon />
                </Link>

                <Link
                  href="/personal/activity"
                  className="inline-flex items-center rounded-full border border-border-default bg-transparent px-5 py-3 text-sm font-medium text-foreground transition hover:border-brand-primary/35 hover:bg-brand-primary/[0.06]"
                >
                  View activity
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-glass p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                Selected receipt
              </p>

              <h4 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
                Select a receipt to inspect
              </h4>
            </div>

            <span className="rounded-full border border-border-default bg-background/55 px-3 py-1.5 text-xs text-foreground-muted">
              No selection
            </span>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground-secondary">
            Status, participants, value, purpose, network references, and
            settlement evidence will appear here.
          </p>

          <div className="mt-7 overflow-hidden rounded-2xl border border-border-subtle bg-background/55">
            {receiptFields.map(([label, value], index) => (
              <div
                key={label}
                className={`grid grid-cols-[0.34fr_0.66fr] gap-4 px-5 py-4 ${
                  index !== receiptFields.length - 1
                    ? "border-b border-border-subtle"
                    : ""
                }`}
              >
                <span className="text-sm text-foreground-muted">
                  {label}
                </span>

                <span className="text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border-default bg-background/55">
            <button
              type="button"
              onClick={() => setTimelineOpen((open) => !open)}
              aria-expanded={timelineOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-brand-primary/[0.04]"
            >
              <div>
                <p className="text-sm font-semibold">
                  Runtime timeline
                </p>

                <p className="mt-1 text-xs text-foreground-muted">
                  How ZephiPay evaluates and records a payment.
                </p>
              </div>

              <span className="text-foreground-secondary">
                <ChevronIcon open={timelineOpen} />
              </span>
            </button>

            {timelineOpen && (
              <ol className="border-t border-border-subtle px-5 py-6">
                {runtimeStages.map((stage, index) => (
                  <li
                    key={stage.label}
                    className="relative grid grid-cols-[auto_1fr] gap-4 pb-7 last:pb-0"
                  >
                    <div className="relative flex justify-center">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-[0.65rem] font-semibold text-brand-secondary">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {index !== runtimeStages.length - 1 && (
                        <span className="absolute top-8 h-[calc(100%_-_0.15rem)] w-px bg-border-default" />
                      )}
                    </div>

                    <div className="pt-1">
                      <p className="text-sm font-medium">
                        {stage.label}
                      </p>

                      <p className="mt-2 text-xs leading-6 text-foreground-secondary">
                        {stage.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full border border-border-default bg-surface-elevated px-5 py-3 text-sm font-medium text-foreground-muted opacity-70"
            >
              Share receipt
            </button>

            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full border border-border-default bg-surface-elevated px-5 py-3 text-sm font-medium text-foreground-muted opacity-70"
            >
              Export record
            </button>
          </div>

          <p className="mt-4 text-center text-xs leading-5 text-foreground-muted">
            Receipt actions become available after a real authenticated record
            is selected.
          </p>
        </section>
      </div>
    </div>
  );
}
