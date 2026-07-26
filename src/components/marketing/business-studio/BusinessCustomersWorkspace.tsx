"use client";

import { useMemo, useState } from "react";

type CustomerView =
  | "all"
  | "returning"
  | "outstanding"
  | "high-value"
  | "businesses";

type CustomerFilter = {
  id: CustomerView;
  label: string;
  description: string;
};

const filters: CustomerFilter[] = [
  {
    id: "all",
    label: "All customers",
    description:
      "Every person or business with verified payment activity.",
  },
  {
    id: "returning",
    label: "Returning",
    description:
      "Customers who completed more than one verified payment.",
  },
  {
    id: "outstanding",
    label: "Outstanding",
    description:
      "Customers with open requests or invoices awaiting payment.",
  },
  {
    id: "high-value",
    label: "High value",
    description:
      "Customers meeting future business-defined value criteria.",
  },
  {
    id: "businesses",
    label: "Business",
    description:
      "Verified organizations, vendors, and business customers.",
  },
];

const metrics = [
  {
    label: "Customers",
    value: "—",
    detail: "People or businesses with verified activity.",
  },
  {
    label: "Returning",
    value: "—",
    detail: "Customers who completed more than one payment.",
  },
  {
    label: "Outstanding",
    value: "$0.00",
    detail: "Open requests or invoices awaiting payment.",
  },
  {
    label: "Lifetime value",
    value: "—",
    detail: "Requires verified customer history.",
  },
];

const detailRows = [
  ["Customer type", "Not selected"],
  ["First activity", "—"],
  ["Last activity", "—"],
  ["Lifetime value", "—"],
  ["Outstanding balance", "$0.00"],
  ["Communication permission", "Unknown"],
];

function SearchIcon() {
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
    </svg>
  );
}

function CustomerIcon() {
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
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.7-3.7 2.6-5.6 5.5-5.6s4.8 1.9 5.5 5.6" />
      <rect x="15" y="6" width="6" height="6" rx="1.5" />
      <path d="M16.5 16h4M18.5 14v4" />
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

export function BusinessCustomersWorkspace() {
  const [activeView, setActiveView] =
    useState<CustomerView>("all");
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
              Customer workspace
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              Understand every business relationship
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Keep payments, invoices, receipts, notes, and relationship
              history connected to the customer or business behind them.
            </p>
          </div>

          <div className="relative w-full xl:max-w-sm">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-foreground-muted">
              <SearchIcon />
            </span>

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search customers"
              aria-label="Search business customers"
              className="w-full rounded-full border border-border-default bg-background/70 py-3 pl-12 pr-4 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
            />
          </div>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Business customer filters"
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

      <div className="grid xl:grid-cols-[1.4fr_0.6fr]">
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
                <CustomerIcon />
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
                {query.trim()
                  ? "No matching customers"
                  : "No customer relationships yet"}
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-6 text-foreground-secondary">
                {query.trim()
                  ? `No verified customer records match “${query.trim()}”.`
                  : "Customers, businesses, payment history, invoices, receipts, and relationship context will appear after verified business activity begins."}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  "Verified history",
                  "Invoice context",
                  "Receipt records",
                  "Consent-aware",
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
        </div>

        <aside className="bg-background/35 p-5 sm:p-7">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Customer details
          </p>

          <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
            Select a customer
          </h3>

          <p className="mt-3 text-sm leading-6 text-foreground-secondary">
            A selected customer will reveal verified activity,
            invoices, receipts, notes, tags, and communication
            permissions.
          </p>

          <dl className="mt-6 space-y-3">
            {detailRows.map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-border-default bg-surface-glass p-4"
              >
                <dt className="text-xs text-foreground-muted">
                  {label}
                </dt>

                <dd className="mt-1 text-sm font-medium text-foreground">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <section className="mt-6 rounded-2xl border border-border-default bg-surface-glass p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-secondary text-brand-secondary">
                <ReceiptIcon />
              </span>

              <div>
                <p className="text-sm font-medium text-foreground">
                  Records
                </p>

                <p className="mt-1 text-xs text-foreground-muted">
                  Payments, invoices, and receipts
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ["Payments", "—"],
                ["Invoices", "—"],
                ["Receipts", "—"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-border-subtle bg-background/55 p-3 text-center"
                >
                  <p className="text-lg font-semibold">
                    {value}
                  </p>

                  <p className="mt-1 text-[0.68rem] text-foreground-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <label className="mt-6 block">
            <span className="text-sm font-medium text-foreground">
              Private notes
            </span>

            <textarea
              disabled
              rows={4}
              placeholder="Select a customer before adding notes."
              className="mt-2 w-full resize-none rounded-2xl border border-border-default bg-background/60 px-4 py-3 text-sm text-foreground-muted outline-none disabled:cursor-not-allowed disabled:opacity-70"
            />
          </label>

          <div className="mt-5">
            <p className="text-sm font-medium text-foreground">
              Customer tags
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Returning",
                "Business",
                "Outstanding",
                "Priority",
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  disabled
                  className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted opacity-65"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled
            className="mt-7 w-full rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background opacity-45"
          >
            Sign in to manage customers
          </button>
        </aside>
      </div>
    </section>
  );
}
