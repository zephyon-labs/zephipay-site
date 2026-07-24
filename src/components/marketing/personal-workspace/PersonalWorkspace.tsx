"use client";

import {
  useMemo,
  useState,
  type FormEvent,
} from "react";

import {
  isZephiPayConfigured,
  sendPayment,
} from "@/lib/zephipay/client";
import type {
  MoneyMode,
  PaymentRecipientType,
  PaymentResult,
  SendPaymentInput,
} from "@/lib/zephipay/types";
import { validateSendPayment } from "@/lib/zephipay/validation";
import { cn } from "@/utils/cn";

import type { PersonalWorkspaceProps } from "./types";

const modes: Array<{
  id: MoneyMode;
  label: string;
}> = [
  { id: "send", label: "Send" },
  { id: "request", label: "Request" },
  { id: "transfer", label: "Transfer" },
];

const recipientTypes: Array<{
  id: PaymentRecipientType;
  label: string;
  description: string;
}> = [
  {
    id: "person",
    label: "Person",
    description: "Pay a friend, family member, or another individual.",
  },
  {
    id: "business",
    label: "Business",
    description: "Pay a merchant, service provider, or organization.",
  },
  {
    id: "creator",
    label: "Creator tip",
    description: "Support a creator directly.",
  },
  {
    id: "agent",
    label: "AI agent",
    description: "Pay an intelligent service or autonomous agent.",
  },
];

const initialSendInput: SendPaymentInput = {
  recipientType: "person",
  recipient: "",
  amount: 0,
  purpose: "",
};

function shortenValue(
  value: string,
  start = 7,
  end = 5,
): string {
  if (!value || value.length <= start + end + 3) {
    return value;
  }

  return `${value.slice(0, start)}...${value.slice(-end)}`;
}

function formatLabel(value: string): string {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-border-subtle bg-background/45 p-6">
      <p className="font-medium text-foreground">{title}</p>
      <p className="mt-2 max-w-xl text-sm leading-6 text-foreground-secondary">
        {description}
      </p>
    </div>
  );
}

function FieldError({
  message,
}: {
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-2 text-sm text-red-300">
      {message}
    </p>
  );
}

export function PersonalWorkspace({
  className,
}: PersonalWorkspaceProps) {
  const [activeMode, setActiveMode] =
    useState<MoneyMode>("send");
  const [sendInput, setSendInput] =
    useState<SendPaymentInput>(initialSendInput);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SendPaymentInput, string>>
  >({});
  const [submissionError, setSubmissionError] =
    useState<string | null>(null);
  const [result, setResult] =
    useState<PaymentResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const configured = useMemo(
    () => isZephiPayConfigured(),
    [],
  );

  async function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionError(null);
    setResult(null);

    const validation = validateSendPayment(sendInput);
    setErrors(validation.errors);

    if (!validation.valid) {
      return;
    }

    setSubmitting(true);

    try {
      const paymentResult = await sendPayment(sendInput);
      setResult(paymentResult);
      setSendInput(initialSendInput);
      setErrors({});
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "The payment could not be submitted.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[2rem]",
        "border border-border-default",
        "bg-surface-glass",
        "shadow-[var(--shadow-medium)]",
        "backdrop-blur-2xl",
        className,
      )}
    >
      <div className="grid gap-px border-b border-border-subtle bg-border-subtle md:grid-cols-3">
        <div className="bg-background/75 p-7">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Available balance
          </p>
          <p className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-foreground">
            Connect account
          </p>
          <p className="mt-2 text-sm text-foreground-secondary">
            Your live balance will appear after account connection.
          </p>
        </div>

        <div className="bg-background/75 p-7">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Pending requests
          </p>
          <p className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-foreground">
            No account data
          </p>
          <p className="mt-2 text-sm text-foreground-secondary">
            Real payment requests will appear here.
          </p>
        </div>

        <div className="bg-background/75 p-7">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
            Verified receipts
          </p>
          <p className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-foreground">
            No receipts yet
          </p>
          <p className="mt-2 text-sm text-foreground-secondary">
            Every completed payment creates a verified receipt
            you can revisit anytime.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-5 border-b border-border-subtle pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">
              Personal
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">
              Move money
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-foreground-secondary">
              Send, request, or transfer through one clear
              experience. Every result shown here is tied to
              real account and payment data.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Move money"
            className="inline-flex rounded-full border border-border-default bg-background/65 p-1"
          >
            {modes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                role="tab"
                aria-selected={activeMode === mode.id}
                onClick={() => {
                  setActiveMode(mode.id);
                  setSubmissionError(null);
                  setResult(null);
                }}
                className={cn(
                  "rounded-full px-4 py-2",
                  "text-sm font-medium transition-colors",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-brand-primary/45",
                  activeMode === mode.id
                    ? "bg-foreground text-background"
                    : "text-foreground-secondary hover:text-foreground",
                )}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        <div className="py-8">
          {activeMode === "send" ? (
            <form
              onSubmit={handleSend}
              className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  Who are you paying?
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {recipientTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() =>
                        setSendInput((current) => ({
                          ...current,
                          recipientType: type.id,
                        }))
                      }
                      className={cn(
                        "rounded-2xl border p-4 text-left",
                        "transition-colors",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-brand-primary/45",
                        sendInput.recipientType === type.id
                          ? "border-brand-primary/55 bg-brand-primary/10"
                          : "border-border-subtle bg-background/45 hover:border-border-default",
                      )}
                    >
                      <span className="block text-sm font-medium text-foreground">
                        {type.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-foreground-muted">
                        {type.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border-default bg-background/55 p-6">
                <div>
                  <label
                    htmlFor="payment-recipient"
                    className="text-sm font-medium text-foreground"
                  >
                    Recipient
                  </label>
                  <input
                    id="payment-recipient"
                    value={sendInput.recipient}
                    onChange={(event) =>
                      setSendInput((current) => ({
                        ...current,
                        recipient: event.target.value,
                      }))
                    }
                    placeholder="ZephiPay identity, email, or wallet"
                    className="mt-3 w-full rounded-xl border border-border-default bg-background px-4 py-3 text-foreground outline-none placeholder:text-foreground-muted focus:border-brand-primary/60"
                  />
                  <FieldError message={errors.recipient} />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="payment-amount"
                    className="text-sm font-medium text-foreground"
                  >
                    Amount
                  </label>
                  <div className="mt-3 flex rounded-xl border border-border-default bg-background focus-within:border-brand-primary/60">
                    <span className="flex items-center pl-4 text-foreground-muted">
                      $
                    </span>
                    <input
                      id="payment-amount"
                      type="number"
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      value={
                        sendInput.amount > 0
                          ? sendInput.amount
                          : ""
                      }
                      onChange={(event) =>
                        setSendInput((current) => ({
                          ...current,
                          amount: Number(event.target.value),
                        }))
                      }
                      placeholder="0.00"
                      className="w-full bg-transparent px-3 py-3 text-foreground outline-none placeholder:text-foreground-muted"
                    />
                  </div>
                  <FieldError message={errors.amount} />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="payment-purpose"
                    className="text-sm font-medium text-foreground"
                  >
                    Purpose
                  </label>
                  <input
                    id="payment-purpose"
                    value={sendInput.purpose}
                    onChange={(event) =>
                      setSendInput((current) => ({
                        ...current,
                        purpose: event.target.value,
                      }))
                    }
                    placeholder="What is this payment for?"
                    className="mt-3 w-full rounded-xl border border-border-default bg-background px-4 py-3 text-foreground outline-none placeholder:text-foreground-muted focus:border-brand-primary/60"
                  />
                  <FieldError message={errors.purpose} />
                </div>

                {!configured ? (
                  <p className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-foreground-secondary">
                    The form is ready, but the live payment
                    service has not been connected through
                    <code className="mx-1 text-foreground">
                      NEXT_PUBLIC_ZEPHIPAY_API_URL
                    </code>
                    yet.
                  </p>
                ) : null}

                {submissionError ? (
                  <p
                    role="alert"
                    className="mt-5 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-200"
                  >
                    {submissionError}
                  </p>
                ) : null}

                {result ? (
                  <section
                    aria-live="polite"
                    className="mt-6 overflow-hidden rounded-[1.5rem] border border-brand-primary/30 bg-brand-primary/[0.08]"
                  >
                    <div className="px-5 py-6 sm:px-6">
                      <div className="flex items-start gap-4">
                        <div
                          aria-hidden="true"
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-primary/35 bg-brand-primary/15 text-brand-secondary"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            className="h-5 w-5"
                          >
                            <path d="m5 12 4 4L19 6" />
                          </svg>
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-brand-secondary">
                            Payment sent
                          </p>

                          <p className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-foreground">
                            {result.amountDisplay ?? result.amount}{" "}
                            <span className="text-lg text-foreground-secondary">
                              {result.asset}
                            </span>
                          </p>

                          <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                            To{" "}
                            <span className="font-medium text-foreground">
                              {shortenValue(result.recipient)}
                            </span>
                          </p>

                          <p className="mt-1 text-sm leading-6 text-foreground-secondary">
                            {result.purpose}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-5">
                        <div>
                          <p className="text-xs uppercase tracking-[0.16em] text-foreground-muted">
                            Status
                          </p>
                          <p className="mt-1 text-sm font-medium text-foreground">
                            {formatLabel(result.status)}
                          </p>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-background/45 px-3 py-2 text-xs font-medium text-foreground-secondary">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4 w-4 text-brand-secondary"
                          >
                            <path d="M12 3 5.5 6v5c0 4.2 2.7 8 6.5 10 3.8-2 6.5-5.8 6.5-10V6L12 3Z" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                          Verified receipt
                        </div>
                      </div>
                    </div>

                    <details className="group border-t border-border-subtle bg-background/30">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-foreground transition-colors hover:bg-background/35 sm:px-6">
                        <span>View receipt details</span>

                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-4 w-4 transition-transform group-open:rotate-180"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </summary>

                      <div className="border-t border-border-subtle px-5 py-5 sm:px-6">
                        <dl className="grid gap-5 text-sm sm:grid-cols-2">
                          <div>
                            <dt className="text-foreground-muted">
                              Recipient
                            </dt>
                            <dd className="mt-1 break-all text-foreground">
                              {result.recipient}
                            </dd>
                          </div>

                          <div>
                            <dt className="text-foreground-muted">
                              Amount
                            </dt>
                            <dd className="mt-1 text-foreground">
                              {result.amountDisplay ?? result.amount}{" "}
                              {result.asset}
                            </dd>
                          </div>

                          <div>
                            <dt className="text-foreground-muted">
                              Purpose
                            </dt>
                            <dd className="mt-1 text-foreground">
                              {result.purpose}
                            </dd>
                          </div>

                          <div>
                            <dt className="text-foreground-muted">
                              Network
                            </dt>
                            <dd className="mt-1 text-foreground">
                              {formatLabel(result.network)}
                            </dd>
                          </div>

                          <div className="sm:col-span-2">
                            <dt className="text-foreground-muted">
                              Transaction signature
                            </dt>
                            <dd className="mt-1 break-all font-mono text-xs leading-6 text-foreground">
                              {result.signature}
                            </dd>
                          </div>
                        </dl>

                        <details className="group/technical mt-5 rounded-xl border border-border-subtle bg-background/45">
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm text-foreground-secondary transition-colors hover:text-foreground">
                            <span>Technical details</span>

                            <svg
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              className="h-4 w-4 transition-transform group-open/technical:rotate-180"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </summary>

                          <dl className="grid gap-4 border-t border-border-subtle px-4 py-4 text-xs sm:grid-cols-2">
                            {[
                              ["Runtime ID", result.runtimeId],
                              ["Payment ID", result.paymentId],
                              ["Transaction ID", result.transactionId],
                              ["Receipt ID", result.receiptId],
                              ["Mint", result.mint],
                              ["Treasury", result.treasury],
                            ].map(([label, value]) => (
                              <div key={label}>
                                <dt className="text-foreground-muted">
                                  {label}
                                </dt>
                                <dd className="mt-1 break-all font-mono leading-5 text-foreground-secondary">
                                  {value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </details>
                      </div>
                    </details>
                  </section>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    "mt-6 inline-flex w-full items-center justify-center",
                    "rounded-full px-5 py-3",
                    "bg-foreground text-sm font-medium text-background",
                    "transition-opacity",
                    "hover:opacity-90",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-brand-primary/45",
                    "disabled:cursor-not-allowed",
                    "disabled:opacity-55",
                  )}
                >
                  {submitting
                    ? "Submitting payment..."
                    : "Review and send"}
                </button>
              </div>
            </form>
          ) : null}

          {activeMode === "request" ? (
            <EmptyState
              title="Payment requests are not connected yet."
              description="The request experience will use a real ZephiPay request endpoint, with a specific payer, amount, purpose, expiration, QR code, and shareable payment link. Nothing will be generated until that endpoint exists."
            />
          ) : null}

          {activeMode === "transfer" ? (
            <EmptyState
              title="Connect an account to transfer funds."
              description="Transfer sources and destinations will come from real connected balances and payment methods. ZephiPay will not display fictional accounts or simulate a completed transfer."
            />
          ) : null}
        </div>

        <div
          id="personal-activity"
          className="scroll-mt-32 border-t border-border-subtle pt-8"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold tracking-[-0.025em] text-foreground">
                Recent activity
              </h3>
              <p className="mt-2 text-sm text-foreground-secondary">
                Your real payment history will appear here.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <EmptyState
              title="No activity yet."
              description="Completed payments, pending requests, transfers, and settlement updates will appear after your account is connected."
            />
          </div>
        </div>

        <div
          id="personal-receipts"
          className="scroll-mt-32 border-t border-border-subtle pt-8 mt-8"
        >
          <h3 className="text-xl font-semibold tracking-[-0.025em] text-foreground">
            Verified receipts
          </h3>
          <p className="mt-2 text-sm text-foreground-secondary">
            Dependable records created from completed payments.
          </p>

          <div className="mt-5">
            <EmptyState
              title="No verified receipts yet."
              description="Your first completed ZephiPay payment will create a receipt that preserves status, timing, participants, purpose, and settlement evidence."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
