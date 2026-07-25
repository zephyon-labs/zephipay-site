"use client";

import { useMemo, useState } from "react";

type CheckoutView =
  | "hosted"
  | "links"
  | "qr"
  | "pos"
  | "embedded";

type CheckoutViewDefinition = {
  id: CheckoutView;
  label: string;
  description: string;
};

const views: CheckoutViewDefinition[] = [
  {
    id: "hosted",
    label: "Hosted",
    description:
      "A ZephiPay-hosted checkout page for products, services, and one-time payments.",
  },
  {
    id: "links",
    label: "Payment links",
    description:
      "Reusable payment destinations that can be shared anywhere.",
  },
  {
    id: "qr",
    label: "QR",
    description:
      "Scannable checkout experiences for counters, events, and physical locations.",
  },
  {
    id: "pos",
    label: "POS",
    description:
      "Point-of-sale experiences for in-person business payments.",
  },
  {
    id: "embedded",
    label: "Embedded",
    description:
      "Checkout components designed to live inside a business website or application.",
  },
];

const metrics = [
  {
    label: "Checkout sessions",
    value: "—",
    detail: "Customer checkout attempts.",
  },
  {
    label: "Completed",
    value: "—",
    detail: "Verified completed payments.",
  },
  {
    label: "Conversion",
    value: "—",
    detail: "Requires checkout and payment activity.",
  },
  {
    label: "Active links",
    value: "—",
    detail: "Published business payment destinations.",
  },
];

const methodOptions = [
  {
    id: "bank",
    label: "Bank",
    detail: "Connected account or ACH",
  },
  {
    id: "card",
    label: "Card",
    detail: "Credit or debit card",
  },
  {
    id: "usdc",
    label: "USDC",
    detail: "Supported digital settlement",
  },
];

function CheckoutIcon() {
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
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 10h18" />
      <path d="M7 15h4" />
    </svg>
  );
}

function LinkIcon() {
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
      <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
    </svg>
  );
}

function QrIcon() {
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
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="15" width="6" height="6" rx="1" />
      <path d="M15 15h2v2h-2zM19 15h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2z" />
    </svg>
  );
}

function StoreIcon() {
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
      <path d="M4 10h16l-1.5-5h-13L4 10Z" />
      <path d="M5 10v9h14v-9" />
      <path d="M9 19v-5h6v5" />
    </svg>
  );
}

function CodeIcon() {
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
      <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" />
    </svg>
  );
}

const viewIcons: Record<CheckoutView, React.ReactNode> = {
  hosted: <CheckoutIcon />,
  links: <LinkIcon />,
  qr: <QrIcon />,
  pos: <StoreIcon />,
  embedded: <CodeIcon />,
};

export function BusinessCheckoutWorkspace() {
  const [activeView, setActiveView] = useState<CheckoutView>("hosted");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [customerAmount, setCustomerAmount] = useState(false);
  const [receiptEnabled, setReceiptEnabled] = useState(true);
  const [confirmation, setConfirmation] = useState("Show confirmation");
  const [methods, setMethods] = useState<string[]>(["bank", "card", "usdc"]);

  const activeDefinition = useMemo(
    () => views.find((view) => view.id === activeView) ?? views[0],
    [activeView],
  );

  const formattedAmount = useMemo(() => {
    const parsed = Number.parseFloat(amount);

    if (!Number.isFinite(parsed) || parsed < 0) {
      return "$0.00";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parsed);
  }, [amount]);

  const toggleMethod = (methodId: string) => {
    setMethods((current) =>
      current.includes(methodId)
        ? current.filter((item) => item !== methodId)
        : [...current, methodId],
    );
  };

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-xl">
      <header className="border-b border-border-subtle px-5 py-5 sm:px-7">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
            Checkout workspace
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
            Configure how customers pay
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
            Create hosted checkout, reusable payment links, QR flows,
            point-of-sale experiences, and embedded payment interfaces
            from one operational workspace.
          </p>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Checkout experience types"
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

      <div className="grid xl:grid-cols-[1.05fr_0.95fr]">
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

          <section className="mt-6 rounded-[1.7rem] border border-border-default bg-background/45 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {activeDefinition.label}
                </p>

                <p className="mt-1 max-w-xl text-xs leading-5 text-foreground-muted">
                  {activeDefinition.description}
                </p>
              </div>

              <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
                Not published
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-foreground">
                  Checkout title
                </span>

                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="What is the customer paying for?"
                  className="mt-2 w-full rounded-2xl border border-border-default bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">
                  Description
                </span>

                <textarea
                  rows={3}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Optional details shown during checkout"
                  className="mt-2 w-full resize-none rounded-2xl border border-border-default bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                <label>
                  <span className="text-sm font-medium text-foreground">
                    Amount
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    disabled={customerAmount}
                    placeholder="0.00"
                    className="mt-2 w-full rounded-2xl border border-border-default bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </label>

                <label className="mt-7 flex cursor-pointer items-center gap-3 rounded-2xl border border-border-default bg-surface-secondary px-4 py-3">
                  <input
                    type="checkbox"
                    checked={customerAmount}
                    onChange={(event) => setCustomerAmount(event.target.checked)}
                    className="h-4 w-4 rounded border-border-default"
                  />

                  <span className="text-sm font-medium text-foreground-secondary">
                    Customer enters amount
                  </span>
                </label>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground">
                  Payment methods
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {methodOptions.map((method) => {
                    const isSelected = methods.includes(method.id);

                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => toggleMethod(method.id)}
                        className={[
                          "rounded-2xl border p-4 text-left transition",
                          isSelected
                            ? "border-foreground/20 bg-surface-elevated"
                            : "border-border-default bg-background/45 opacity-70",
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-foreground">
                            {method.label}
                          </p>

                          <span
                            className={[
                              "h-2.5 w-2.5 rounded-full",
                              isSelected
                                ? "bg-brand-secondary"
                                : "bg-foreground-muted/35",
                            ].join(" ")}
                          />
                        </div>

                        <p className="mt-2 text-xs leading-5 text-foreground-muted">
                          {method.detail}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-border-default bg-surface-glass p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Send receipt
                    </p>

                    <p className="mt-1 text-xs leading-5 text-foreground-muted">
                      Create a customer-facing verified receipt.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={receiptEnabled}
                    onChange={(event) => setReceiptEnabled(event.target.checked)}
                    className="h-4 w-4 rounded border-border-default"
                  />
                </label>

                <label className="block rounded-2xl border border-border-default bg-surface-glass p-4">
                  <span className="text-sm font-medium text-foreground">
                    After payment
                  </span>

                  <select
                    value={confirmation}
                    onChange={(event) => setConfirmation(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-border-default bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none focus:border-foreground/30"
                  >
                    <option>Show confirmation</option>
                    <option>Redirect to website</option>
                    <option>Show receipt</option>
                  </select>
                </label>
              </div>
            </div>
          </section>
        </div>

        <aside className="bg-background/35 p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                Live preview
              </p>

              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                Customer checkout
              </h3>
            </div>

            <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
              Preview
            </span>
          </div>

          <section className="mt-6 overflow-hidden rounded-[1.7rem] border border-border-default bg-surface-glass shadow-[var(--shadow-soft)]">
            <div className="border-b border-border-subtle bg-surface-elevated/45 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-background/65 text-brand-secondary">
                  <CheckoutIcon />
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    ZephiPay Business
                  </p>

                  <p className="mt-1 text-xs text-foreground-muted">
                    Secure checkout
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">
                {activeDefinition.label}
              </p>

              <h4 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                {title.trim() || "Untitled checkout"}
              </h4>

              <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                {description.trim() ||
                  "Checkout details will appear here as the experience is configured."}
              </p>

              <div className="mt-6 rounded-2xl border border-border-default bg-background/55 p-4">
                <p className="text-xs text-foreground-muted">Amount due</p>

                <p className="mt-2 text-3xl font-semibold tracking-[-0.05em]">
                  {customerAmount ? "Customer entered" : formattedAmount}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-medium text-foreground-muted">
                  Available payment methods
                </p>

                <div className="mt-3 space-y-2">
                  {methodOptions.map((method) => {
                    const isSelected = methods.includes(method.id);

                    return (
                      <div
                        key={method.id}
                        className={[
                          "flex items-center justify-between gap-4 rounded-xl border px-4 py-3",
                          isSelected
                            ? "border-border-default bg-surface-secondary"
                            : "border-border-subtle bg-background/35 opacity-45",
                        ].join(" ")}
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {method.label}
                          </p>

                          <p className="mt-1 text-xs text-foreground-muted">
                            {method.detail}
                          </p>
                        </div>

                        <span
                          className={[
                            "h-2.5 w-2.5 rounded-full",
                            isSelected
                              ? "bg-brand-secondary"
                              : "bg-foreground-muted/35",
                          ].join(" ")}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                disabled
                className="mt-6 w-full rounded-full bg-foreground px-5 py-3.5 text-sm font-medium text-background opacity-45"
              >
                Continue to payment
              </button>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-foreground-muted">
                <span>
                  {receiptEnabled ? "Verified receipt enabled" : "Receipt disabled"}
                </span>

                <span>•</span>

                <span>{confirmation}</span>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-border-default bg-surface-glass p-5">
            <p className="text-sm font-medium text-foreground">
              Publishing status
            </p>

            <div className="mt-4 space-y-3">
              {[
                ["Business identity", "Required"],
                ["Settlement destination", "Required"],
                ["Checkout configuration", "In progress"],
                ["Runtime connection", "Not connected"],
              ].map(([label, status]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle bg-background/45 px-4 py-3"
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
              Publish checkout
            </button>
          </div>

          <p className="mt-3 text-center text-xs leading-5 text-foreground-muted">
            Publishing will activate after business identity, settlement,
            and payment execution are connected.
          </p>
        </aside>
      </div>
    </section>
  );
}
