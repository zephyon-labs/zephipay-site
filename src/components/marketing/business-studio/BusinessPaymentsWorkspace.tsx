"use client";

import { useMemo, useState } from "react";

type PaymentMethod =
  | "accept"
  | "send"
  | "request"
  | "refund"
  | "payment-links"
  | "qr-pos";

type PaymentMethodDefinition = {
  id: PaymentMethod;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  partyLabel: string;
  partyPlaceholder: string;
  amountLabel: string;
  referenceLabel: string;
  referencePlaceholder: string;
  actionLabel: string;
};

const methods: PaymentMethodDefinition[] = [
  {
    id: "accept",
    label: "Accept",
    eyebrow: "Incoming payment",
    title: "Accept a business payment",
    description:
      "Prepare a customer-facing payment experience with clear purpose and settlement context.",
    partyLabel: "Customer",
    partyPlaceholder: "Customer name, email, or account",
    amountLabel: "Payment amount",
    referenceLabel: "Payment purpose",
    referencePlaceholder: "Order, service, deposit, or purchase",
    actionLabel: "Prepare checkout",
  },
  {
    id: "send",
    label: "Send",
    eyebrow: "Outgoing payment",
    title: "Send money from your business",
    description:
      "Prepare a payment to a vendor, employee, contractor, partner, or another business.",
    partyLabel: "Recipient",
    partyPlaceholder: "Recipient name, email, or account",
    amountLabel: "Send amount",
    referenceLabel: "Payment purpose",
    referencePlaceholder: "Vendor payment, payroll, reimbursement, or service",
    actionLabel: "Review payment",
  },
  {
    id: "request",
    label: "Request",
    eyebrow: "Payment request",
    title: "Request payment with clear terms",
    description:
      "Prepare a focused request that preserves the amount, purpose, participant, and due context.",
    partyLabel: "Customer or business",
    partyPlaceholder: "Name, email, or account",
    amountLabel: "Requested amount",
    referenceLabel: "Request description",
    referencePlaceholder: "Deposit, balance due, project milestone, or service",
    actionLabel: "Create request",
  },
  {
    id: "refund",
    label: "Refund",
    eyebrow: "Returned payment",
    title: "Prepare a customer refund",
    description:
      "Locate an eligible payment and preserve the reason, amount, receipt, and resulting settlement state.",
    partyLabel: "Payment reference",
    partyPlaceholder: "Receipt, payment, or order identifier",
    amountLabel: "Refund amount",
    referenceLabel: "Refund reason",
    referencePlaceholder: "Returned item, cancellation, correction, or service issue",
    actionLabel: "Review refund",
  },
  {
    id: "payment-links",
    label: "Payment links",
    eyebrow: "Shareable checkout",
    title: "Create a business payment link",
    description:
      "Prepare a focused checkout destination for products, services, deposits, or open payment requests.",
    partyLabel: "Link audience",
    partyPlaceholder: "Public, customer-specific, or business-specific",
    amountLabel: "Link amount",
    referenceLabel: "Link title",
    referencePlaceholder: "Project deposit, consultation, product, or service",
    actionLabel: "Create payment link",
  },
  {
    id: "qr-pos",
    label: "QR / POS",
    eyebrow: "In-person commerce",
    title: "Prepare an in-person payment",
    description:
      "Create a QR or point-of-sale payment experience for counters, events, mobile teams, or customer visits.",
    partyLabel: "Location or register",
    partyPlaceholder: "Main counter, mobile register, event booth",
    amountLabel: "Payment amount",
    referenceLabel: "Order description",
    referencePlaceholder: "Items, service, table, ticket, or order reference",
    actionLabel: "Generate payment experience",
  },
];

const metrics = [
  {
    label: "Received",
    value: "$0.00",
    detail: "Verified incoming business payments.",
  },
  {
    label: "Sent",
    value: "$0.00",
    detail: "Payments to vendors, teams, and partners.",
  },
  {
    label: "Pending",
    value: "$0.00",
    detail: "Payments still completing settlement.",
  },
  {
    label: "Refunded",
    value: "$0.00",
    detail: "Verified funds returned to customers.",
  },
];

function formatAmount(value: string) {
  const parsed = Number.parseFloat(
    value.replace(/[^0-9.]/g, ""),
  );

  if (!Number.isFinite(parsed)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parsed);
}

function PaymentIcon() {
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

export function BusinessPaymentsWorkspace() {
  const [activeMethod, setActiveMethod] =
    useState<PaymentMethod>("accept");
  const [party, setParty] = useState("");
  const [amount, setAmount] = useState("0.00");
  const [reference, setReference] = useState("");
  const [includeReceipt, setIncludeReceipt] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);

  const selectedMethod = useMemo(
    () =>
      methods.find((method) => method.id === activeMethod) ??
      methods[0],
    [activeMethod],
  );

  function selectMethod(method: PaymentMethodDefinition) {
    setActiveMethod(method.id);
    setParty("");
    setAmount("0.00");
    setReference("");
    setIncludeReceipt(true);
    setRequireApproval(
      method.id === "send" || method.id === "refund",
    );
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-xl">
      <header className="border-b border-border-subtle px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Payments workspace
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              Move money with context attached
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              Accept, send, request, refund, and prepare checkout
              experiences without separating payment execution from its
              business purpose and record.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border-default bg-surface-secondary px-3 py-2 text-xs font-medium text-foreground-muted">
            <span className="h-2 w-2 rounded-full bg-foreground-muted" />
            Preview only
          </span>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Business payment methods"
        >
          {methods.map((method) => {
            const isActive = activeMethod === method.id;

            return (
              <button
                key={method.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectMethod(method)}
                className={[
                  "shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "border-foreground/20 bg-foreground text-background"
                    : "border-border-default bg-surface-secondary text-foreground-secondary hover:bg-surface-elevated hover:text-foreground",
                ].join(" ")}
              >
                {method.label}
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

        <div className="mt-6 grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
          <section className="rounded-[1.7rem] border border-border-default bg-background/45 p-5 sm:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
              {selectedMethod.eyebrow}
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
              {selectedMethod.title}
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">
              {selectedMethod.description}
            </p>

            <div className="mt-7 space-y-5">
              <label className="block">
                <span className="text-sm font-medium">
                  {selectedMethod.partyLabel}
                </span>

                <input
                  type="text"
                  value={party}
                  onChange={(event) =>
                    setParty(event.target.value)
                  }
                  placeholder={selectedMethod.partyPlaceholder}
                  className="mt-2 w-full rounded-2xl border border-border-default bg-background/70 px-4 py-3.5 text-sm outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">
                  {selectedMethod.amountLabel}
                </span>

                <div className="relative mt-2">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-foreground-muted">
                    $
                  </span>

                  <input
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={(event) =>
                      setAmount(event.target.value)
                    }
                    className="w-full rounded-2xl border border-border-default bg-background/70 py-3.5 pl-8 pr-16 text-sm outline-none transition focus:border-foreground/30"
                  />

                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-medium text-foreground-muted">
                    USD
                  </span>
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium">
                  {selectedMethod.referenceLabel}
                </span>

                <textarea
                  value={reference}
                  onChange={(event) =>
                    setReference(event.target.value)
                  }
                  placeholder={
                    selectedMethod.referencePlaceholder
                  }
                  rows={4}
                  className="mt-2 w-full resize-none rounded-2xl border border-border-default bg-background/70 px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
                />
              </label>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-center justify-between gap-5 rounded-2xl border border-border-default bg-surface-elevated/35 p-4">
                  <span>
                    <span className="block text-sm font-medium">
                      Preserve a verified receipt
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-foreground-muted">
                      Keep participant, purpose, amount, status, and
                      settlement references together.
                    </span>
                  </span>

                  <input
                    type="checkbox"
                    checked={includeReceipt}
                    onChange={(event) =>
                      setIncludeReceipt(event.target.checked)
                    }
                    className="h-4 w-4 accent-current"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between gap-5 rounded-2xl border border-border-default bg-surface-elevated/35 p-4">
                  <span>
                    <span className="block text-sm font-medium">
                      Require internal approval
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-foreground-muted">
                      Route this action through a future business role
                      or policy approval.
                    </span>
                  </span>

                  <input
                    type="checkbox"
                    checked={requireApproval}
                    onChange={(event) =>
                      setRequireApproval(event.target.checked)
                    }
                    className="h-4 w-4 accent-current"
                  />
                </label>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled
                className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background opacity-45"
              >
                {selectedMethod.actionLabel} after sign-in
              </button>

              <p className="text-xs leading-5 text-foreground-muted">
                This preview does not create or execute a payment.
              </p>
            </div>
          </section>

          <aside className="rounded-[1.7rem] border border-border-default bg-background/35 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                  Payment preview
                </p>

                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                  Review the economic context
                </h3>
              </div>

              <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs text-foreground-muted">
                Unsubmitted
              </span>
            </div>

            <div className="mt-6 rounded-[1.6rem] border border-border-default bg-surface-elevated/55 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
                <PaymentIcon />
              </div>

              <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
                {selectedMethod.label}
              </p>

              <p className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
                {formatAmount(amount)}
              </p>

              <dl className="mt-6 space-y-3">
                {[
                  [
                    selectedMethod.partyLabel,
                    party.trim() || "Not provided",
                  ],
                  [
                    selectedMethod.referenceLabel,
                    reference.trim() || "Not provided",
                  ],
                  [
                    "Receipt",
                    includeReceipt
                      ? "Verified receipt enabled"
                      : "Receipt disabled",
                  ],
                  [
                    "Approval",
                    requireApproval
                      ? "Internal approval required"
                      : "No approval configured",
                  ],
                  ["Settlement", "Not initiated"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border-subtle bg-background/60 p-3"
                  >
                    <dt className="text-xs text-foreground-muted">
                      {label}
                    </dt>

                    <dd className="mt-1 break-words text-sm font-medium">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                disabled
                className="mt-5 w-full rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background opacity-45"
              >
                {selectedMethod.actionLabel}
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-border-default bg-surface-glass p-5">
              <p className="text-sm font-medium">
                Before execution
              </p>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-foreground-secondary">
                {[
                  "Authenticate the business and acting team member.",
                  "Validate the participant and payment destination.",
                  "Evaluate applicable compliance, risk, and business policies.",
                  "Confirm settlement rail, fees, and final payment terms.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground-muted" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
