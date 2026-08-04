"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { parsePaymentIntentResponse, type PaymentIntent } from "@/lib/paymentIntents/contract";
import { isCanonicalSolanaAddressInput, paymentIntentRequestFromRecipient } from "@/lib/paymentIntents/requests";

type FormState = { recipientInput: string; walletFallback: string; amount: string; purpose: string };
type ErrorBody = { ok?: false; error?: string };

const emptyForm: FormState = { recipientInput: "", walletFallback: "", amount: "", purpose: "" };

export function PaymentIntentWorkspace({ recoveryId }: { recoveryId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [intent, setIntent] = useState<PaymentIntent>();
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(Boolean(recoveryId));
  const [creationCompleted, setCreationCompleted] = useState(false);
  const creationKey = useRef<string | undefined>(undefined);

  const loadIntent = useCallback(async (id: string) => {
    setBusy(true); setError(undefined);
    try {
      const response = await fetch(`/api/payment-intents/${encodeURIComponent(id)}`, {
        cache: "no-store", credentials: "same-origin",
      });
      const raw: unknown = await response.json().catch(() => undefined);
      const parsed = parsePaymentIntentResponse(raw);
      if (!response.ok || !parsed) throw new Error(safeMessage(raw, "Unable to load this payment intent."));
      setIntent(parsed.paymentIntent);
    } catch (reason) { setError(messageFrom(reason)); }
    finally { setBusy(false); }
  }, []);

  useEffect(() => {
    if (!recoveryId) return;
    const controller = new AbortController();
    fetch(`/api/payment-intents/${encodeURIComponent(recoveryId)}`, {
      cache: "no-store", credentials: "same-origin", signal: controller.signal,
    }).then(async (response) => {
      const raw: unknown = await response.json().catch(() => undefined);
      const parsed = parsePaymentIntentResponse(raw);
      if (!response.ok || !parsed) throw new Error(safeMessage(raw, "Unable to load this payment intent."));
      setIntent(parsed.paymentIntent);
    }).catch((reason: unknown) => {
      if (!controller.signal.aborted) setError(messageFrom(reason));
    }).finally(() => { if (!controller.signal.aborted) setBusy(false); });
    return () => controller.abort();
  }, [recoveryId]);

  function update(field: keyof FormState, value: string) {
    if (creationCompleted) { creationKey.current = undefined; setCreationCompleted(false); }
    setForm((current) => ({ ...current, [field]: value }));
    setError(undefined);
  }

  async function createIntent(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    const requestBody = paymentIntentRequestFromRecipient(form);
    const validation = validateForm(form, requestBody);
    if (validation) { setError(validation); return; }
    creationKey.current ??= crypto.randomUUID();
    setBusy(true); setError(undefined);
    try {
      const response = await fetch("/api/payment-intents", {
        method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json", "Idempotency-Key": creationKey.current },
        body: JSON.stringify(requestBody),
      });
      const raw: unknown = await response.json().catch(() => undefined);
      const parsed = parsePaymentIntentResponse(raw);
      if (!response.ok || !parsed) throw new Error(safeMessage(raw, "Unable to create the payment intent."));
      setCreationCompleted(true);
      setIntent(parsed.paymentIntent);
      router.replace(`/personal/send?intent=${encodeURIComponent(parsed.paymentIntent.id)}`);
    } catch (reason) { setError(messageFrom(reason)); }
    finally { setBusy(false); }
  }

  async function confirmIntent() {
    if (!intent || busy) return;
    setBusy(true); setError(undefined);
    try {
      const response = await fetch(`/api/payment-intents/${encodeURIComponent(intent.id)}/confirm`, {
        method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestHash: intent.requestHash, expectedVersion: intent.version }),
      });
      const raw: unknown = await response.json().catch(() => undefined);
      const parsed = parsePaymentIntentResponse(raw);
      if (!response.ok || !parsed) throw new Error(safeMessage(raw, "Unable to confirm the payment intent."));
      setIntent(parsed.paymentIntent);
    } catch (reason) { setError(messageFrom(reason)); }
    finally { setBusy(false); }
  }

  function startAnother() {
    creationKey.current = undefined;
    setCreationCompleted(false); setIntent(undefined); setError(undefined); setForm(emptyForm);
    router.replace("/personal/send");
  }

  if (!intent) return (
    <WorkspaceShell step="Compose" title="Create a payment intent" description="Enter the exact payment you want to review. This beta records a durable USDC devnet intent; funds do not move in this phase.">
      {error ? <ErrorNotice message={error} /> : null}
      {busy && recoveryId ? <p className="text-sm text-foreground-secondary">Recovering the authoritative payment intent…</p> : (
        <form onSubmit={createIntent} className="grid gap-6" noValidate>
          <div className="grid gap-3">
            <Field label="Recipient" value={form.recipientInput} onChange={(value) => update("recipientInput", value)} placeholder="Name, @handle, email, or wallet address" />
            {form.recipientInput.trim() && !isCanonicalSolanaAddressInput(form.recipientInput) ? (
              <p className="text-sm leading-6 text-foreground-secondary">Recipient lookup is not connected yet. Enter the recipient&apos;s canonical address below to continue.</p>
            ) : null}
          </div>
          {!isCanonicalSolanaAddressInput(form.recipientInput) ? (
            <details className="rounded-xl border border-border-default bg-background/40 p-4" open={Boolean(form.recipientInput.trim())}>
              <summary className="cursor-pointer text-sm font-medium">Advanced: Solana wallet address</summary>
              <div className="mt-4">
                <Field label="Canonical devnet wallet address" value={form.walletFallback} onChange={(value) => update("walletFallback", value)} placeholder="Required when recipient lookup is unavailable" />
              </div>
            </details>
          ) : null}
          <Field label="USDC amount" value={form.amount} onChange={(value) => update("amount", value)} placeholder="0.00" inputMode="decimal" />
          <Field label="Purpose" value={form.purpose} onChange={(value) => update("purpose", value)} placeholder="What is this payment for?" maxLength={120} />
          <div className="flex items-center justify-between gap-4 border-t border-border-subtle pt-6">
            <p className="max-w-md text-xs leading-5 text-foreground-muted">One stable idempotency key protects this submission and any retry after an ambiguous network response.</p>
            <Button type="submit" loading={busy}>Review payment</Button>
          </div>
        </form>
      )}
    </WorkspaceShell>
  );

  const processing = intent.status === "processing";
  return (
    <WorkspaceShell step={processing ? "Status" : "Review"} title={processing ? "Confirmed and ready for execution" : "Ready for your review"} description={processing ? "Your approval is recorded. No blockchain settlement has occurred in this phase." : "These details were reloaded from the durable backend intent and are the authoritative payment record."}>
      {error ? <ErrorNotice message={error} /> : null}
      <dl className="grid gap-px overflow-hidden rounded-[1.4rem] border border-border-default bg-border-subtle sm:grid-cols-2">
        <Detail label="Amount" value={`${intent.amount} ${intent.asset}`} prominent />
        <Detail label="Network" value="Solana devnet" />
        <Detail label="Recipient" value={intent.recipient} mono />
        <Detail label="Purpose" value={intent.purpose} />
        <Detail label="Current status" value={processing ? "Confirmed and ready for execution" : "Ready for your review"} />
        <Detail label="Created" value={formatTime(intent.createdAt)} />
        {intent.userConfirmedAt ? <Detail label="Confirmed" value={formatTime(intent.userConfirmedAt)} /> : null}
        <Detail label="Intent ID" value={intent.id} mono muted />
      </dl>
      <div className="mt-7 border-t border-border-subtle pt-7">
        {!processing ? (
          <>
            <p className="mb-5 text-sm leading-6 text-foreground-secondary">Confirmation records your approval and prepares the payment for execution. It does not settle funds yet.</p>
            <Button onClick={confirmIntent} loading={busy}>Confirm payment intent</Button>
          </>
        ) : (
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => loadIntent(intent.id)} loading={busy}>Refresh status</Button>
            <Button variant="outline" onClick={startAnother}>Start another payment</Button>
          </div>
        )}
      </div>
    </WorkspaceShell>
  );
}

function WorkspaceShell({ step, title, description, children }: { step: string; title: string; description: string; children: React.ReactNode }) {
  return <section className="rounded-[2rem] border border-border-default bg-surface-glass p-6 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-9">
    <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">{step}</p>
    <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{title}</h1>
    <p className="mt-4 max-w-2xl text-base leading-7 text-foreground-secondary">{description}</p>
    <div className="mt-8">{children}</div>
  </section>;
}

function Field({ label, value, onChange, ...props }: { label: string; value: string; onChange: (value: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return <label className="grid gap-2 text-sm font-medium">{label}<input {...props} value={value} onChange={(event) => onChange(event.target.value)} className="h-12 rounded-xl border border-border-default bg-background/70 px-4 font-normal outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" required /></label>;
}

function Detail({ label, value, mono, muted, prominent }: { label: string; value: string; mono?: boolean; muted?: boolean; prominent?: boolean }) {
  return <div className="min-w-0 bg-background/75 p-5"><dt className="text-xs uppercase tracking-[0.14em] text-foreground-muted">{label}</dt><dd className={`mt-2 break-words ${mono ? "font-mono text-xs" : "text-sm"} ${muted ? "text-foreground-muted" : "text-foreground"} ${prominent ? "text-xl font-semibold" : ""}`}>{value}</dd></div>;
}

function ErrorNotice({ message }: { message: string }) { return <div role="alert" className="mb-6 rounded-xl border border-red-400/25 bg-red-400/10 p-4 text-sm text-foreground"><p>{message}</p>{message === "Test payment access has not been activated for this account." ? <a className="mt-3 inline-block font-medium text-brand-secondary hover:underline" href="/personal">Back to personal</a> : null}</div>; }
function formatTime(value: string) { return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)); }
function messageFrom(value: unknown) { return value instanceof Error ? value.message : "Payment service is temporarily unavailable."; }
function safeMessage(value: unknown, fallback: string) { return typeof value === "object" && value !== null && typeof (value as ErrorBody).error === "string" ? (value as ErrorBody).error! : fallback; }
function validateForm(form: FormState, request: ReturnType<typeof paymentIntentRequestFromRecipient>) {
  if (!isCanonicalSolanaAddressInput(form.recipientInput) && !isCanonicalSolanaAddressInput(form.walletFallback)) return "Enter a canonical Solana wallet address in the advanced field to continue.";
  if (!/^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/.test(form.amount) || form.amount === "0") return "Enter a positive USDC amount with no more than 6 decimal places.";
  const bytes = new TextEncoder().encode(form.purpose.trim()).length;
  if (bytes < 1 || bytes > 120) return "Purpose must be between 1 and 120 UTF-8 bytes.";
  if (!request) return "Review the payment details and try again.";
}
