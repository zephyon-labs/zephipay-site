"use client";

import { useMemo, useState } from "react";

type InvoiceView =
  | "drafts"
  | "sent"
  | "paid"
  | "overdue"
  | "recurring";

type InvoiceViewDefinition = {
  id: InvoiceView;
  label: string;
  description: string;
};

const views: InvoiceViewDefinition[] = [
  {
    id: "drafts",
    label: "Drafts",
    description: "Invoices still being prepared and not yet issued.",
  },
  {
    id: "sent",
    label: "Sent",
    description: "Invoices delivered and awaiting customer action.",
  },
  {
    id: "paid",
    label: "Paid",
    description: "Invoices reconciled with verified payments.",
  },
  {
    id: "overdue",
    label: "Overdue",
    description: "Invoices that have passed their recorded due date.",
  },
  {
    id: "recurring",
    label: "Recurring",
    description: "Scheduled invoices for repeat billing relationships.",
  },
];

const metrics = [
  {
    label: "Outstanding",
    value: "$0.00",
    detail: "Invoices issued but not yet paid.",
  },
  {
    label: "Paid",
    value: "$0.00",
    detail: "Verified invoice payments.",
  },
  {
    label: "Overdue",
    value: "$0.00",
    detail: "Invoices past their due date.",
  },
  {
    label: "Drafts",
    value: "—",
    detail: "Invoices still being prepared.",
  },
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

function InvoiceIcon() {
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
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function BusinessInvoicesWorkspace() {
  const [activeView, setActiveView] = useState<InvoiceView>("drafts");
  const [query, setQuery] = useState("");
  const [customer, setCustomer] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [rate, setRate] = useState("");
  const [terms, setTerms] = useState("Due on receipt");
  const [dueDate, setDueDate] = useState("");
  const [memo, setMemo] = useState("");

  const activeViewDefinition = useMemo(
    () => views.find((view) => view.id === activeView) ?? views[0],
    [activeView],
  );

  const amount = useMemo(() => {
    const parsedQuantity = Number.parseFloat(quantity);
    const parsedRate = Number.parseFloat(rate);

    if (
      !Number.isFinite(parsedQuantity) ||
      !Number.isFinite(parsedRate) ||
      parsedQuantity < 0 ||
      parsedRate < 0
    ) {
      return 0;
    }

    return parsedQuantity * parsedRate;
  }, [quantity, rate]);

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-xl">
      <header className="border-b border-border-subtle px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Invoice workspace
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              Create, issue, and reconcile invoices
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Keep customer details, payment terms, reminders, receipts,
              and settlement records connected throughout the invoice
              lifecycle.
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
              placeholder="Search invoices"
              aria-label="Search invoices"
              className="w-full rounded-full border border-border-default bg-background/70 py-3 pl-12 pr-4 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
            />
          </div>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Invoice status filters"
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

      <div className="grid xl:grid-cols-[1.15fr_0.85fr]">
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
                    {activeViewDefinition.label}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-foreground-muted">
                    {activeViewDefinition.description}
                  </p>
                </div>

                <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
                  No verified records
                </span>
              </div>
            </div>

            <div className="flex min-h-[22rem] flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
                <InvoiceIcon />
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
                {query.trim()
                  ? "No matching invoices"
                  : `No ${activeViewDefinition.label.toLowerCase()} invoices`}
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-6 text-foreground-secondary">
                {query.trim()
                  ? `No invoice records match “${query.trim()}”.`
                  : "Invoice records will appear here after invoice creation and verified business activity are enabled."}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  "Customer context",
                  "Payment status",
                  "Verified receipts",
                  "Reconciliation",
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
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                Invoice builder
              </p>

              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                Prepare a new invoice
              </h3>
            </div>

            <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
              Draft
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-foreground">
                Customer
              </span>

              <input
                value={customer}
                onChange={(event) => setCustomer(event.target.value)}
                placeholder="Customer name or business"
                className="mt-2 w-full rounded-2xl border border-border-default bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">
                Invoice number
              </span>

              <input
                value={invoiceNumber}
                onChange={(event) => setInvoiceNumber(event.target.value)}
                placeholder="Generated when saved"
                className="mt-2 w-full rounded-2xl border border-border-default bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
              />
            </label>

            <div className="rounded-2xl border border-border-default bg-surface-glass p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-foreground">
                  Line item
                </p>

                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-2 text-xs font-medium text-foreground-muted opacity-60"
                >
                  <PlusIcon />
                  Add item
                </button>
              </div>

              <label className="mt-4 block">
                <span className="text-xs text-foreground-muted">
                  Description
                </span>

                <input
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Product or service"
                  className="mt-2 w-full rounded-xl border border-border-default bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-foreground-muted focus:border-foreground/30"
                />
              </label>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <label>
                  <span className="text-xs text-foreground-muted">
                    Quantity
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-border-default bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none focus:border-foreground/30"
                  />
                </label>

                <label>
                  <span className="text-xs text-foreground-muted">
                    Rate
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={rate}
                    onChange={(event) => setRate(event.target.value)}
                    placeholder="0.00"
                    className="mt-2 w-full rounded-xl border border-border-default bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-foreground-muted focus:border-foreground/30"
                  />
                </label>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="text-sm font-medium text-foreground">
                  Payment terms
                </span>

                <select
                  value={terms}
                  onChange={(event) => setTerms(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-border-default bg-background/60 px-4 py-3 text-sm text-foreground outline-none focus:border-foreground/30"
                >
                  <option>Due on receipt</option>
                  <option>Net 7</option>
                  <option>Net 15</option>
                  <option>Net 30</option>
                  <option>Net 60</option>
                </select>
              </label>

              <label>
                <span className="text-sm font-medium text-foreground">
                  Due date
                </span>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-border-default bg-background/60 px-4 py-3 text-sm text-foreground outline-none focus:border-foreground/30"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-foreground">
                Memo
              </span>

              <textarea
                rows={3}
                value={memo}
                onChange={(event) => setMemo(event.target.value)}
                placeholder="Optional customer-facing note"
                className="mt-2 w-full resize-none rounded-2xl border border-border-default bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
              />
            </label>
          </div>

          <section className="mt-6 rounded-[1.5rem] border border-border-default bg-surface-glass p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                  Preview
                </p>

                <p className="mt-2 text-sm font-medium text-foreground">
                  {invoiceNumber.trim() || "Draft invoice"}
                </p>
              </div>

              <p className="text-xl font-semibold tracking-[-0.04em]">
                {formattedAmount}
              </p>
            </div>

            <div className="mt-5 space-y-3 border-t border-border-subtle pt-4">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-foreground-muted">Bill to</span>
                <span className="text-right font-medium text-foreground">
                  {customer.trim() || "Customer not selected"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-foreground-muted">Item</span>
                <span className="text-right font-medium text-foreground">
                  {description.trim() || "No line item"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-foreground-muted">Terms</span>
                <span className="text-right font-medium text-foreground">
                  {terms}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-foreground-muted">Due</span>
                <span className="text-right font-medium text-foreground">
                  {dueDate || "Not selected"}
                </span>
              </div>
            </div>

            {memo.trim() ? (
              <p className="mt-4 rounded-xl border border-border-subtle bg-background/55 p-3 text-xs leading-5 text-foreground-secondary">
                {memo}
              </p>
            ) : null}
          </section>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled
              className="rounded-full border border-border-default bg-surface-secondary px-5 py-3 text-sm font-medium text-foreground opacity-55"
            >
              Save draft
            </button>

            <button
              type="button"
              disabled
              className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background opacity-45"
            >
              Send invoice
            </button>
          </div>

          <p className="mt-3 text-center text-xs leading-5 text-foreground-muted">
            Invoice creation and delivery will activate after business
            identity, customer records, and payment execution are connected.
          </p>
        </aside>
      </div>
    </section>
  );
}
