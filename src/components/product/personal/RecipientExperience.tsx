"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { parseRecipientResolveResponse, parseRecipientSearchResponse, type PublicRecipient } from "@/lib/recipients/contract";
import { canReachDirectoryHandoff, trustModeFor } from "@/lib/recipients/recipientState";

type SearchStatus = "idle" | "loading" | "found" | "empty" | "invalid" | "error" | "rate_limited" | "resolving" | "selection_error";

export function RecipientExperience({ onDirectorySelected, onUseAdvancedWallet }: Readonly<{
  onDirectorySelected: () => void;
  onUseAdvancedWallet: () => void;
}>) {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [result, setResult] = useState<PublicRecipient>();
  const [selected, setSelected] = useState<PublicRecipient>();
  const [trustAcknowledged, setTrustAcknowledged] = useState(false);
  const requestSequence = useRef(0);
  const searchController = useRef<AbortController | undefined>(undefined);
  const resolveController = useRef<AbortController | undefined>(undefined);
  const resultAction = useRef<HTMLButtonElement>(null);
  const warningHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => () => { searchController.current?.abort(); resolveController.current?.abort(); }, []);
  useEffect(() => {
    if (selected && trustModeFor(selected.verificationState) !== "ready") warningHeading.current?.focus();
  }, [selected]);

  async function search(event: React.FormEvent) {
    event.preventDefault();
    if (status === "loading" || status === "resolving") return;
    const submitted = username.trim();
    if (!submitted || submitted.length > 64) {
      clearSelection(); setResult(undefined); setStatus("invalid"); return;
    }
    searchController.current?.abort();
    const controller = new AbortController(); searchController.current = controller;
    const sequence = ++requestSequence.current;
    clearSelection(); setResult(undefined); setStatus("loading");
    try {
      const response = await fetch("/api/recipients/search", {
        method: "POST", credentials: "same-origin", cache: "no-store", signal: controller.signal,
        headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: submitted }),
      });
      const raw: unknown = await response.json().catch(() => undefined);
      if (controller.signal.aborted || sequence !== requestSequence.current) return;
      if (response.status === 429) { setStatus("rate_limited"); return; }
      if (response.status === 400) { setStatus("invalid"); return; }
      const parsed = parseRecipientSearchResponse(raw);
      if (!response.ok || !parsed) { setStatus("error"); return; }
      if (parsed.recipients.length === 0) { setStatus("empty"); return; }
      setResult(parsed.recipients[0]); setStatus("found");
    } catch {
      if (!controller.signal.aborted && sequence === requestSequence.current) setStatus("error");
    }
  }

  async function selectRecipient(recipient: PublicRecipient) {
    if (status === "loading" || status === "resolving" || recipient.payabilityState !== "available") return;
    onDirectorySelected();
    resolveController.current?.abort();
    const controller = new AbortController(); resolveController.current = controller;
    const sequence = ++requestSequence.current;
    clearSelection(); setStatus("resolving");
    try {
      const response = await fetch(`/api/recipients/${encodeURIComponent(recipient.accountId)}`, {
        cache: "no-store", credentials: "same-origin", signal: controller.signal,
      });
      const raw: unknown = await response.json().catch(() => undefined);
      if (controller.signal.aborted || sequence !== requestSequence.current) return;
      const parsed = parseRecipientResolveResponse(raw);
      if (!response.ok || !parsed || parsed.recipient.payabilityState !== "available") {
        setStatus("selection_error"); return;
      }
      setSelected(parsed.recipient); setTrustAcknowledged(false); setStatus("found");
    } catch {
      if (!controller.signal.aborted && sequence === requestSequence.current) setStatus("selection_error");
    }
  }

  function clearSelection() { setSelected(undefined); setTrustAcknowledged(false); }
  function changeRecipient() { clearSelection(); setStatus(result ? "found" : "idle"); requestAnimationFrame(() => resultAction.current?.focus()); }
  function cancelTrust() { clearSelection(); setStatus(result ? "found" : "idle"); requestAnimationFrame(() => resultAction.current?.focus()); }

  const trustMode = selected ? trustModeFor(selected.verificationState) : undefined;
  const handoffReady = selected ? canReachDirectoryHandoff(selected, trustAcknowledged) : false;
  const announcement = handoffReady && selected ? `${selected.displayName} Payment Identity confirmed. No payment has been created.` : statusMessage(status, selected);

  return <div className="grid gap-6">
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">Payment Identity</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">Search for a ZephiPay recipient</h2>
      <p id="recipient-search-help" className="mt-2 text-sm leading-6 text-foreground-secondary">Enter an exact ZephiPay username. Email, display-name, and partial search are not supported.</p>
    </div>
    <form onSubmit={search} className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]" noValidate>
      <label className="grid min-w-0 gap-2 text-sm font-medium">
        ZephiPay username
        <input value={username} onChange={(event) => setUsername(event.target.value)} aria-describedby="recipient-search-help" autoComplete="off" spellCheck={false} placeholder="username" className="h-12 min-w-0 rounded-xl border border-border-default bg-background/70 px-4 font-normal outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
      </label>
      <Button type="submit" loading={status === "loading"} disabled={status === "resolving"} className="self-end">Search</Button>
    </form>
    <p role="status" aria-live="polite" className="min-h-6 text-sm text-foreground-secondary">{announcement}</p>

    {result ? <PaymentIdentityCard recipient={result} actionRef={resultAction} disabled={status === "resolving" || result.payabilityState !== "available"} onSelect={() => selectRecipient(result)} /> : null}

    {selected && trustMode === "confirmation_required" && !trustAcknowledged ? <TrustConfirmationCard recipient={selected} headingRef={warningHeading} onCancel={cancelTrust} onContinue={() => setTrustAcknowledged(true)} /> : null}
    {selected && trustMode === "blocked" ? <TrustBlockedCard headingRef={warningHeading} onCancel={cancelTrust} /> : null}
    {selected && handoffReady ? <DirectoryHandoff recipient={selected} onChange={changeRecipient} onAdvanced={onUseAdvancedWallet} /> : null}
  </div>;
}

function PaymentIdentityCard({ recipient, actionRef, disabled, onSelect }: Readonly<{
  recipient: PublicRecipient; actionRef: React.RefObject<HTMLButtonElement | null>; disabled: boolean; onSelect: () => void;
}>) {
  return <article className="min-w-0 rounded-[1.4rem] border border-border-default bg-background/55 p-5" aria-label={`Payment Identity for ${recipient.displayName}`}>
    <div className="flex min-w-0 items-start gap-4">
      <div aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 font-semibold text-brand-secondary">{initials(recipient.displayName)}</div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-semibold">{recipient.displayName}</p>
        <p className="truncate text-sm text-foreground-secondary">@{recipient.username}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <StatusPill>{accountTypeLabel(recipient.accountType)}</StatusPill>
          <StatusPill>{verificationLabel(recipient.verificationState)}</StatusPill>
          <StatusPill>{recipient.payabilityState === "available" ? "Available to receive" : "Currently unavailable"}</StatusPill>
        </div>
      </div>
    </div>
    <button ref={actionRef} type="button" disabled={disabled} onClick={onSelect} className="mt-5 min-h-11 w-full rounded-full border border-brand-secondary/30 bg-brand-primary px-5 text-sm font-medium text-brand-contrast outline-none transition focus-visible:ring-2 focus-visible:ring-brand-primary/45 disabled:cursor-not-allowed disabled:opacity-50">{disabled ? "Recipient unavailable" : "Select recipient"}</button>
  </article>;
}

function TrustConfirmationCard({ recipient, headingRef, onCancel, onContinue }: Readonly<{
  recipient: PublicRecipient; headingRef: React.RefObject<HTMLHeadingElement | null>; onCancel: () => void; onContinue: () => void;
}>) {
  const pending = recipient.verificationState === "pending";
  return <section className="rounded-[1.4rem] border border-amber-300/30 bg-amber-300/[0.08] p-5" aria-labelledby="trust-confirmation-title">
    <h3 ref={headingRef} tabIndex={-1} id="trust-confirmation-title" className="text-lg font-semibold outline-none">{pending ? "Identity verification pending" : "Identity not verified"}</h3>
    <p className="mt-3 text-sm leading-6 text-foreground-secondary">{pending ? "ZephiPay has not completed verification for this recipient." : "ZephiPay cannot currently confirm this recipient’s identity."} Make sure the username and Payment Identity match the person or organization you intend to pay.</p>
    <p className="mt-3 text-xs leading-5 text-foreground-muted">This acknowledgment is temporary and is not yet stored with a payment record.</p>
    <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row">
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button onClick={onContinue}>Continue anyway</Button>
    </div>
  </section>;
}

function TrustBlockedCard({ headingRef, onCancel }: Readonly<{ headingRef: React.RefObject<HTMLHeadingElement | null>; onCancel: () => void }>) {
  return <section className="rounded-[1.4rem] border border-red-400/25 bg-red-400/10 p-5" aria-labelledby="recipient-restricted-title">
    <h3 ref={headingRef} tabIndex={-1} id="recipient-restricted-title" className="text-lg font-semibold outline-none">Recipient unavailable</h3>
    <p className="mt-3 text-sm leading-6 text-foreground-secondary">This Payment Identity cannot currently be selected. Choose another recipient or use a different payment method.</p>
    <Button variant="outline" className="mt-5" onClick={onCancel}>Choose another recipient</Button>
  </section>;
}

function DirectoryHandoff({ recipient, onChange, onAdvanced }: Readonly<{ recipient: PublicRecipient; onChange: () => void; onAdvanced: () => void }>) {
  return <section className="rounded-[1.4rem] border border-brand-primary/25 bg-brand-primary/[0.07] p-5">
    <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">Recipient selected</p>
    <h3 className="mt-3 text-xl font-semibold">Payment Identity confirmed</h3>
    <p className="mt-3 text-sm leading-6 text-foreground-secondary">@{recipient.username} is selected. Connecting Payment Identities to Payment Intents is coming in the next integration phase; no payment has been created.</p>
    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Button variant="outline" onClick={onChange}>Change recipient</Button>
      <Button variant="ghost" href="/personal">Return to dashboard</Button>
      <Button variant="ghost" onClick={onAdvanced}>Use Advanced Wallet instead</Button>
    </div>
  </section>;
}

function StatusPill({ children }: { children: React.ReactNode }) { return <span className="rounded-full border border-border-default bg-background/70 px-3 py-1 text-foreground-secondary">{children}</span>; }
function initials(value: string) { return value.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "ZP"; }
function accountTypeLabel(value: PublicRecipient["accountType"]) { return value === "ai_agent" ? "AI Agent" : value[0].toUpperCase() + value.slice(1); }
function verificationLabel(value: PublicRecipient["verificationState"]) { return value === "verified" ? "Identity verified" : value === "pending" ? "Verification pending" : value === "restricted" ? "Restricted" : "Identity unverified"; }
function statusMessage(status: SearchStatus, selected?: PublicRecipient) {
  if (status === "loading") return "Searching for that exact username…";
  if (status === "resolving") return "Confirming the latest Payment Identity…";
  if (status === "empty") return "No payment identity found. Check the username and try again.";
  if (status === "invalid") return "Enter a valid exact ZephiPay username and try again.";
  if (status === "rate_limited") return "Too many searches. Wait a moment before trying again.";
  if (status === "selection_error") return "This Payment Identity is no longer available. Search again or choose another recipient.";
  if (status === "error") return "Recipient search is temporarily unavailable. Check the username or try again.";
  if (selected) return `${selected.displayName} is selected.`;
  if (status === "found") return "One Payment Identity found.";
  return "Search by exact ZephiPay username.";
}
