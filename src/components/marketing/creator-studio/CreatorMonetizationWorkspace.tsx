"use client";

import { useMemo, useState } from "react";

type MonetizationMethod =
  | "tips"
  | "memberships"
  | "subscriptions"
  | "products"
  | "payment-links"
  | "commissions";

type MethodDefinition = {
  id: MonetizationMethod;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  amountLabel: string;
  amountPlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
  detailLabel: string;
  detailPlaceholder: string;
  previewAction: string;
};

const methods: MethodDefinition[] = [
  {
    id: "tips",
    label: "Tips",
    eyebrow: "One-time support",
    title: "Create a tip experience",
    description:
      "Let supporters send one-time contributions with optional messages and suggested amounts.",
    amountLabel: "Suggested amount",
    amountPlaceholder: "10.00",
    nameLabel: "Tip title",
    namePlaceholder: "Support my work",
    detailLabel: "Supporter message",
    detailPlaceholder:
      "Your support helps me continue creating independent work.",
    previewAction: "Send tip",
  },
  {
    id: "memberships",
    label: "Memberships",
    eyebrow: "Recurring community",
    title: "Build a membership tier",
    description:
      "Create recurring supporter relationships with benefits, access, and community recognition.",
    amountLabel: "Monthly price",
    amountPlaceholder: "15.00",
    nameLabel: "Tier name",
    namePlaceholder: "Studio Circle",
    detailLabel: "Member benefits",
    detailPlaceholder:
      "Early releases, member updates, and behind-the-scenes access.",
    previewAction: "Join membership",
  },
  {
    id: "subscriptions",
    label: "Subscriptions",
    eyebrow: "Recurring access",
    title: "Configure a subscription",
    description:
      "Offer ongoing access to services, education, content, software, or creator experiences.",
    amountLabel: "Recurring price",
    amountPlaceholder: "25.00",
    nameLabel: "Subscription name",
    namePlaceholder: "Monthly Creative Brief",
    detailLabel: "Included access",
    detailPlaceholder:
      "One new release, supporting materials, and subscriber-only updates each month.",
    previewAction: "Subscribe",
  },
  {
    id: "products",
    label: "Products",
    eyebrow: "Direct commerce",
    title: "Prepare a creator product",
    description:
      "Sell downloads, collections, licenses, templates, services, or creator-owned goods.",
    amountLabel: "Product price",
    amountPlaceholder: "35.00",
    nameLabel: "Product name",
    namePlaceholder: "Neon Horizons Collection",
    detailLabel: "Product description",
    detailPlaceholder:
      "A downloadable collection of original high-resolution digital artwork.",
    previewAction: "Purchase",
  },
  {
    id: "payment-links",
    label: "Payment links",
    eyebrow: "Flexible checkout",
    title: "Create a payment link",
    description:
      "Generate a focused payment destination for projects, invoices, support, or custom offers.",
    amountLabel: "Requested amount",
    amountPlaceholder: "100.00",
    nameLabel: "Payment link title",
    namePlaceholder: "Project deposit",
    detailLabel: "Payment context",
    detailPlaceholder:
      "Secure your project start date with an initial deposit.",
    previewAction: "Continue to payment",
  },
  {
    id: "commissions",
    label: "Commissions",
    eyebrow: "Custom work",
    title: "Open a commission offer",
    description:
      "Define pricing, scope, availability, and expectations for custom creator work.",
    amountLabel: "Starting price",
    amountPlaceholder: "250.00",
    nameLabel: "Commission title",
    namePlaceholder: "Custom digital artwork",
    detailLabel: "Commission scope",
    detailPlaceholder:
      "One custom digital artwork with one revision and personal-use licensing.",
    previewAction: "Request commission",
  },
];

const suggestedAmounts = ["5", "10", "25", "50"];

function formatAmount(value: string) {
  const normalized = value.replace(/[^0-9.]/g, "");
  const parsed = Number.parseFloat(normalized);

  if (!Number.isFinite(parsed)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parsed);
}

function CheckIcon() {
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
      <path d="m6 12 4 4 8-9" />
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

export function CreatorMonetizationWorkspace() {
  const [activeMethod, setActiveMethod] =
    useState<MonetizationMethod>("tips");
  const [name, setName] = useState("Support my work");
  const [amount, setAmount] = useState("10.00");
  const [details, setDetails] = useState(
    "Your support helps me continue creating independent work.",
  );
  const [allowMessages, setAllowMessages] = useState(true);
  const [customAmount, setCustomAmount] = useState(true);
  const [limitedAvailability, setLimitedAvailability] =
    useState(false);

  const selectedMethod = useMemo(
    () =>
      methods.find((method) => method.id === activeMethod) ??
      methods[0],
    [activeMethod],
  );

  function selectMethod(method: MethodDefinition) {
    setActiveMethod(method.id);
    setName(method.namePlaceholder);
    setAmount(method.amountPlaceholder);
    setDetails(method.detailPlaceholder);
    setAllowMessages(method.id === "tips");
    setCustomAmount(
      method.id === "tips" || method.id === "payment-links",
    );
    setLimitedAvailability(method.id === "commissions");
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-xl">
      <div className="border-b border-border-subtle px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Monetization workspace
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              Configure how people support your work
            </h2>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border-default bg-surface-secondary px-3 py-2 text-xs font-medium text-foreground-muted">
            <span className="h-2 w-2 rounded-full bg-foreground-muted" />
            Draft preview only
          </div>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Creator monetization methods"
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
      </div>

      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        <div className="border-b border-border-subtle p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
              {selectedMethod.eyebrow}
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
              {selectedMethod.title}
            </h3>

            <p className="mt-3 max-w-2xl leading-7 text-foreground-secondary">
              {selectedMethod.description}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <label className="block">
              <span className="text-sm font-medium text-foreground">
                {selectedMethod.nameLabel}
              </span>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={selectedMethod.namePlaceholder}
                className="mt-2 w-full rounded-2xl border border-border-default bg-background/70 px-4 py-3.5 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">
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
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder={selectedMethod.amountPlaceholder}
                  className="w-full rounded-2xl border border-border-default bg-background/70 py-3.5 pl-8 pr-16 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
                />

                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-medium text-foreground-muted">
                  USD
                </span>
              </div>

              {activeMethod === "tips" ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestedAmounts.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setAmount(suggestion)}
                      className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-secondary transition hover:bg-surface-elevated hover:text-foreground"
                    >
                      ${suggestion}
                    </button>
                  ))}
                </div>
              ) : null}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">
                {selectedMethod.detailLabel}
              </span>

              <textarea
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                placeholder={selectedMethod.detailPlaceholder}
                rows={5}
                className="mt-2 w-full resize-none rounded-2xl border border-border-default bg-background/70 px-4 py-3.5 text-sm leading-6 text-foreground outline-none transition placeholder:text-foreground-muted focus:border-foreground/30"
              />
            </label>

            <div>
              <p className="text-sm font-medium text-foreground">
                Experience settings
              </p>

              <div className="mt-3 space-y-3">
                <label className="flex cursor-pointer items-center justify-between gap-5 rounded-2xl border border-border-default bg-background/55 p-4">
                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      Allow supporter messages
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-foreground-muted">
                      Let people include context with their payment.
                    </span>
                  </span>

                  <input
                    type="checkbox"
                    checked={allowMessages}
                    onChange={(event) =>
                      setAllowMessages(event.target.checked)
                    }
                    className="h-4 w-4 accent-current"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between gap-5 rounded-2xl border border-border-default bg-background/55 p-4">
                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      Allow a custom amount
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-foreground-muted">
                      Let the customer choose an amount different from
                      the suggested price.
                    </span>
                  </span>

                  <input
                    type="checkbox"
                    checked={customAmount}
                    onChange={(event) =>
                      setCustomAmount(event.target.checked)
                    }
                    className="h-4 w-4 accent-current"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between gap-5 rounded-2xl border border-border-default bg-background/55 p-4">
                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      Limited availability
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-foreground-muted">
                      Reserve this offer for a limited quantity or
                      availability window.
                    </span>
                  </span>

                  <input
                    type="checkbox"
                    checked={limitedAvailability}
                    onChange={(event) =>
                      setLimitedAvailability(event.target.checked)
                    }
                    className="h-4 w-4 accent-current"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled
              className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background opacity-45"
            >
              Publish after sign-in
            </button>

            <button
              type="button"
              disabled
              className="rounded-full border border-border-default bg-surface-secondary px-5 py-3 text-sm font-medium text-foreground-muted opacity-70"
            >
              Save draft
            </button>

            <p className="text-xs leading-5 text-foreground-muted">
              Changes remain in this browser preview and are not stored.
            </p>
          </div>
        </div>

        <aside className="bg-background/35 p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                Supporter preview
              </p>

              <p className="mt-2 text-sm text-foreground-secondary">
                What your audience could see
              </p>
            </div>

            <span className="rounded-full border border-border-default bg-surface-secondary px-3 py-1.5 text-xs font-medium text-foreground-muted">
              Unpublished
            </span>
          </div>

          <div className="mt-7 rounded-[1.8rem] border border-border-default bg-surface-elevated/75 p-5 shadow-[var(--shadow-soft)] sm:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-default bg-surface-secondary text-brand-secondary">
              <LinkIcon />
            </div>

            <p className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              {selectedMethod.label}
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
              {name.trim() || selectedMethod.namePlaceholder}
            </h3>

            <p className="mt-4 min-h-20 text-sm leading-6 text-foreground-secondary">
              {details.trim() || selectedMethod.detailPlaceholder}
            </p>

            <div className="mt-6 rounded-2xl border border-border-default bg-background/65 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                {selectedMethod.amountLabel}
              </p>

              <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                {formatAmount(amount)}
              </p>

              <p className="mt-2 text-xs text-foreground-muted">
                Payment processing and final fees will be shown before
                confirmation.
              </p>
            </div>

            <button
              type="button"
              disabled
              className="mt-5 w-full rounded-full bg-foreground px-5 py-3.5 text-sm font-medium text-background opacity-80"
            >
              {selectedMethod.previewAction}
            </button>

            <div className="mt-5 space-y-2">
              {allowMessages ? (
                <div className="flex items-center gap-2 text-xs text-foreground-muted">
                  <CheckIcon />
                  Optional message enabled
                </div>
              ) : null}

              {customAmount ? (
                <div className="flex items-center gap-2 text-xs text-foreground-muted">
                  <CheckIcon />
                  Custom amounts enabled
                </div>
              ) : null}

              {limitedAvailability ? (
                <div className="flex items-center gap-2 text-xs text-foreground-muted">
                  <CheckIcon />
                  Limited availability enabled
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-border-default bg-surface-glass p-5">
            <p className="text-sm font-medium text-foreground">
              Before publishing
            </p>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-foreground-secondary">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground-muted" />
                Sign in and complete creator verification.
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground-muted" />
                Connect a verified payout destination.
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground-muted" />
                Review pricing, availability, refunds, and access
                conditions.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
