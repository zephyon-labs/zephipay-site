"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Discoverability, IdentityFailure, IdentitySuccess, PaymentIdentity, PayabilityState, VerificationState } from "@/lib/identity/contract";
import { ACCOUNT_HYDRATION_REFRESH_EVENT } from "@/components/auth/AccountHydrationProvider";

type FormState = { username: string; displayName: string; avatarUrl: string; discoverability: Discoverability };
type FieldErrors = Partial<Record<"username" | "displayName" | "avatarUrl", string>>;
const EMPTY: FormState = { username: "", displayName: "", avatarUrl: "", discoverability: "private" };

export function IdentityInterface({ emailVerified }: { emailVerified: boolean }) {
  const [identity, setIdentity] = useState<PaymentIdentity | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(true); const [editing, setEditing] = useState(false); const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState(""); const [notice, setNotice] = useState(""); const [errors, setErrors] = useState<FieldErrors>({});
  const [conflict, setConflict] = useState(false);
  const [setupStarted, setSetupStarted] = useState(false);

  async function load() {
    setLoading(true); setLoadError(""); setConflict(false);
    try {
      const response = await fetch("/api/account/identity", { cache: "no-store" }); const body: unknown = await response.json().catch(() => undefined);
      if (!response.ok || !isSuccess(body)) { setLoadError(failureMessage(body)); return; }
      setIdentity(body.identity); setForm(body.identity ? toForm(body.identity) : EMPTY); setEditing(false); setSetupStarted(false); setNotice("");
    } catch { setLoadError("Payment Identity is temporarily unavailable. Try again."); }
    finally { setLoading(false); }
  }
  useEffect(() => { const timer = window.setTimeout(() => void load(), 0); return () => window.clearTimeout(timer); }, []);

  const persisted = identity ? toForm(identity) : EMPTY; const dirty = !same(form, persisted);
  function cancel() { setForm(persisted); setErrors({}); setNotice(""); setConflict(false); setEditing(false); if (!identity) setSetupStarted(false); }
  async function save() {
    const nextErrors = validate(form); setErrors(nextErrors); setNotice(""); setConflict(false);
    const first = nextErrors.username ? "identity-username" : nextErrors.displayName ? "identity-display-name" : nextErrors.avatarUrl ? "identity-avatar" : undefined;
    if (first) { document.getElementById(first)?.focus(); return; }
    setSaving(true);
    try {
      const response = await fetch("/api/account/identity", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        username: form.username.trim(), displayName: form.displayName.trim().replace(/\s+/g, " "), ...(form.avatarUrl.trim() ? { avatarUrl: form.avatarUrl.trim() } : {}),
        discoverability: form.discoverability, ...(identity ? { expectedVersion: identity.version } : {}),
      }) });
      const body: unknown = await response.json().catch(() => undefined);
      if (response.ok && isSuccess(body) && body.identity) { setIdentity(body.identity); setForm(toForm(body.identity)); setEditing(false); setNotice("Your Payment Identity was saved."); window.dispatchEvent(new Event(ACCOUNT_HYDRATION_REFRESH_EVENT)); return; }
      if (isFailure(body) && body.code === "USERNAME_UNAVAILABLE") { setErrors({ username: "That username is unavailable. Choose another." }); document.getElementById("identity-username")?.focus(); }
      else if (isFailure(body) && body.code === "VERSION_CONFLICT") { setConflict(true); setNotice("Your Payment Identity changed in another session. Reload the latest version before saving again."); }
      else setNotice(failureMessage(body));
    } catch { setNotice("Payment Identity is temporarily unavailable. Your changes were not saved."); }
    finally { setSaving(false); }
  }

  if (loading) return <IdentityPageState emailVerified={emailVerified}><WorkspaceShell><p role="status" className="p-8 text-sm text-foreground-secondary">Loading your Payment Identity…</p></WorkspaceShell></IdentityPageState>;
  if (loadError) return <IdentityPageState emailVerified={emailVerified}><WorkspaceShell><div className="p-8"><h2 className="text-xl font-semibold">Payment Identity unavailable</h2><p className="mt-3 text-sm text-foreground-secondary">{loadError}</p><Action onClick={() => void load()}>Try again</Action></div></WorkspaceShell></IdentityPageState>;

  if (!identity && !setupStarted) return <IdentityPageState emailVerified={emailVerified}><WorkspaceShell><section className="p-6 sm:p-9" aria-labelledby="payment-identity-onboarding-title">
    <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">Optional setup</p>
    <h2 id="payment-identity-onboarding-title" className="mt-4 text-3xl font-semibold">Create your Payment Identity</h2>
    <p className="mt-4 max-w-2xl text-lg leading-8 text-foreground-secondary">Choose a username people can use to find you and send you payments on ZephiPay.</p>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">You can set this up now or come back later. You don’t need a Payment Identity to send a payment. Until you create one, people cannot send to you by ZephiPay username.</p>
    <div className="mt-7 flex flex-wrap gap-3"><button type="button" onClick={() => { setSetupStarted(true); setEditing(true); }} className="min-h-11 rounded-full bg-brand-primary px-6 py-3 text-sm font-medium text-brand-contrast">Set up Payment Identity</button>
      <a href="/personal" className="inline-flex min-h-11 items-center rounded-full border border-border-default px-6 py-3 text-sm font-medium">Skip for now</a></div>
  </section></WorkspaceShell></IdentityPageState>;

  return <IdentityPageState emailVerified={emailVerified}><WorkspaceShell>
    <div aria-live="polite" className="sr-only">{notice}</div>
    <div className="grid min-w-0 lg:grid-cols-[0.8fr_1.2fr]">
      <IdentitySummary identity={identity} />
      <section className="min-w-0 p-5 sm:p-8" aria-labelledby="identity-settings-title">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">Account management</p><h2 id="identity-settings-title" className="mt-2 text-2xl font-semibold">{identity ? "Identity settings" : "Create your Payment Identity"}</h2></div>
          {identity && !editing ? <Action onClick={() => { setEditing(true); setNotice(""); }}>Edit identity</Action> : null}
        </div>
        {!identity ? <p className="mt-4 text-sm leading-6 text-foreground-secondary">Choose how people can recognize and find you when using ZephiPay. New identities begin private, unverified, and unavailable for payments.</p> : null}
        {editing ? <IdentityForm form={form} setForm={setForm} errors={errors} /> : identity ? <StatusWorkspace identity={identity} /> : null}
        {editing ? <div className="mt-7 border-t border-border-subtle pt-5">
          <p className="min-h-6 text-sm text-foreground-secondary">{dirty ? "You have unsaved changes." : "No unsaved changes."}</p>
          {notice ? <p role={conflict ? "alert" : "status"} className="mt-2 text-sm leading-6 text-foreground-secondary">{notice}</p> : null}
          <div className="mt-4 flex flex-wrap gap-3"><button type="button" disabled={!dirty || saving} onClick={() => void save()} className="min-h-11 rounded-full bg-brand-primary px-6 py-3 text-sm font-medium text-brand-contrast disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2">{saving ? "Saving…" : identity ? "Save changes" : "Create identity"}</button>
            <button type="button" disabled={saving || (!identity && !dirty)} onClick={cancel} className="min-h-11 rounded-full border border-border-default px-6 py-3 text-sm font-medium disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2">Cancel</button>
            {conflict ? <button type="button" onClick={() => void load()} className="min-h-11 rounded-full border border-brand-primary/40 px-6 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2">Reload latest</button> : null}
          </div>
        </div> : notice ? <p role="status" className="mt-6 rounded-xl border border-border-subtle p-4 text-sm">{notice}</p> : null}
      </section>
    </div>
    {identity ? <div className="border-t border-border-subtle p-5 sm:p-8"><StatusWorkspace identity={identity} detailed /></div> : null}
  </WorkspaceShell></IdentityPageState>;
}

function IdentityPageState({ emailVerified, children }: { emailVerified: boolean; children: React.ReactNode }) {
  return <div className="grid gap-6"><EmailVerificationNotice verified={emailVerified} />{children}</div>;
}

function EmailVerificationNotice({ verified }: { verified: boolean }) {
  if (verified) return <section className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-5" aria-label="Email verification"><p className="text-sm font-medium">Email verified</p><p className="mt-2 text-sm text-foreground-secondary">Your sign-in email is verified. This does not change your Payment Identity or payment ownership.</p></section>;
  return <section className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5" aria-labelledby="verify-email-title"><p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-300">Verify your email</p><h2 id="verify-email-title" className="mt-2 text-lg font-semibold">Check your inbox</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-foreground-secondary">Check your inbox and verify your email address to finish securing your ZephiPay account. You can continue using Mock Send during this beta.</p><a className="mt-4 inline-flex min-h-11 items-center rounded-full border border-border-default px-5 py-2.5 text-sm font-medium" href="/auth/login?returnTo=%2Fpersonal%2Fidentity">I’ve verified my email — check again</a></section>;
}

function IdentityForm({ form, setForm, errors }: { form: FormState; setForm: (value: FormState) => void; errors: FieldErrors }) {
  return <form className="mt-7 space-y-6" onSubmit={(event) => event.preventDefault()} noValidate>
    <Field label="Username" description="Used for exact recipient lookup. 3–30 characters; begin with a letter and use letters, numbers, or underscores." error={errors.username} id="identity-username"><input id="identity-username" aria-describedby={`identity-username-help${errors.username ? " identity-username-error" : ""}`} aria-invalid={Boolean(errors.username)} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} autoComplete="off" maxLength={30} className={inputClass} /></Field>
    <Field label="Display name" description="Helps senders recognize you. It is not a legal-name or verification claim and is not searchable." error={errors.displayName} id="identity-display-name"><input id="identity-display-name" aria-describedby={`identity-display-name-help${errors.displayName ? " identity-display-name-error" : ""}`} aria-invalid={Boolean(errors.displayName)} value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} maxLength={80} className={inputClass} /></Field>
    <Field label="Avatar URL (optional)" description="Use an HTTPS image URL. An avatar does not prove identity; initials appear if it cannot load." error={errors.avatarUrl} id="identity-avatar"><input id="identity-avatar" type="url" inputMode="url" aria-describedby={`identity-avatar-help${errors.avatarUrl ? " identity-avatar-error" : ""}`} aria-invalid={Boolean(errors.avatarUrl)} value={form.avatarUrl} onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })} placeholder="https://example.com/avatar.png" className={inputClass} /></Field>
    <fieldset><legend className="text-sm font-medium">Discoverability</legend><p id="discoverability-help" className="mt-2 text-xs leading-5 text-foreground-secondary">Verification never changes this choice automatically.</p><div className="mt-3 grid gap-3">{([
      ["private", "Private", "Your identity does not appear in normal username search."], ["username_only", "Exact username", "People who know your exact username can find you."], ["public", "Public eligibility", "Currently still exact-username only; no public profile or broad directory is created."],
    ] as const).map(([value, label, description]) => <label key={value} className="flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border border-border-default p-4 focus-within:outline-2 focus-within:outline-offset-2"><input type="radio" name="discoverability" value={value} checked={form.discoverability === value} onChange={() => setForm({ ...form, discoverability: value })} aria-describedby="discoverability-help" className="mt-1 h-4 w-4"/><span><span className="block text-sm font-medium">{label}</span><span className="mt-1 block text-xs leading-5 text-foreground-secondary">{description}</span></span></label>)}</div></fieldset>
  </form>;
}

function IdentitySummary({ identity }: { identity: PaymentIdentity | null }) {
  const name = identity?.displayName || "Payment Identity";
  return <aside className="min-w-0 border-b border-border-subtle bg-surface-glass p-5 sm:p-8 lg:border-b-0 lg:border-r">
    <Avatar key={identity?.avatarUrl ?? "initials"} identity={identity} /><p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">Current identity</p>
    <h2 className="mt-3 truncate text-3xl font-semibold">{identity?.displayName ?? "Not created"}</h2><p className="mt-2 truncate text-sm text-foreground-secondary">{identity ? `@${identity.username}` : "Create an identity when you are ready."}</p>
    <dl className="mt-7 grid gap-3 text-sm">{identity ? <><SummaryRow label="Account type" value={label(identity.accountType)} /><SummaryRow label="Discoverability" value={label(identity.discoverability)} /><SummaryRow label="Verification" value={label(identity.verificationState)} /><SummaryRow label="Payment availability" value={label(identity.payabilityState)} /></> : <SummaryRow label="Default privacy" value="Private" />}</dl>
    <p className="mt-7 text-xs leading-6 text-foreground-muted">{name} reveals only the information needed for the current Payment Identity experience. Verified does not mean public.</p>
  </aside>;
}

function StatusWorkspace({ identity, detailed = false }: { identity: PaymentIdentity; detailed?: boolean }) {
  if (!detailed) return <div className="mt-7"><p className="text-sm leading-6 text-foreground-secondary">Account type, verification, and payment availability are read-only and controlled by ZephiPay.</p></div>;
  const verification = verificationCopy(identity.verificationState); const payability = payabilityCopy(identity.payabilityState);
  return <section aria-labelledby="payment-trust-title"><p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">Verification and trust</p><h2 id="payment-trust-title" className="mt-2 text-2xl font-semibold">Payment trust</h2>
    <p className="mt-4 max-w-3xl text-sm leading-6 text-foreground-secondary">ZephiPay uses factual identity, verification, privacy, and payment-availability signals to help senders understand who they are paying. These signals do not guarantee safety.</p>
    <div className="mt-6 grid gap-4 md:grid-cols-2"><StatusCard title={verification.title} state={label(identity.verificationState)} text={verification.text} /><StatusCard title={payability.title} state={label(identity.payabilityState)} text={payability.text} /></div>
    <div className="mt-4 rounded-2xl border border-border-subtle bg-background/55 p-5 text-sm leading-6 text-foreground-secondary"><p className="font-medium text-foreground">Verification and privacy are separate</p><p className="mt-2">A verified identity may remain private. Authentication, email verification, and beta authorization are not KYC. Identity verification onboarding is not yet available in this beta.</p><p className="mt-2">Your current state may cause an additional Trust Confirmation step before a sender creates a Payment Intent.</p></div>
  </section>;
}

function Avatar({ identity }: { identity: PaymentIdentity | null }) { const [failed, setFailed] = useState(false); const initials = (identity?.displayName || "PI").split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join(""); return <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-xl font-semibold text-brand-secondary">{identity?.avatarUrl && !failed ? <Image unoptimized fill sizes="80px" src={identity.avatarUrl} alt="" onError={() => setFailed(true)} className="object-cover" /> : <span aria-hidden="true">{initials}</span>}</div>; }
function Field({ label: title, description, error, id, children }: { label: string; description: string; error?: string; id: string; children: React.ReactNode }) { return <div><label htmlFor={id} className="text-sm font-medium">{title}</label><p id={`${id}-help`} className="mt-2 text-xs leading-5 text-foreground-secondary">{description}</p><div className="mt-3">{children}</div>{error ? <p id={`${id}-error`} className="mt-2 text-xs text-red-400">{error}</p> : null}</div>; }
function SummaryRow({ label: title, value }: { label: string; value: string }) { return <div className="flex min-w-0 items-center justify-between gap-4 rounded-xl border border-border-subtle bg-background/55 px-4 py-3"><dt className="text-foreground-secondary">{title}</dt><dd className="truncate font-medium">{value}</dd></div>; }
function StatusCard({ title, state, text }: { title: string; state: string; text: string }) { return <article className="rounded-2xl border border-border-subtle bg-background/55 p-5"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-medium">{title}</h3><span className="rounded-full border border-border-default px-3 py-1 text-xs">{state}</span></div><p className="mt-4 text-sm leading-6 text-foreground-secondary">{text}</p></article>; }
function WorkspaceShell({ children }: { children: React.ReactNode }) { return <div className="min-w-0 overflow-hidden rounded-[2rem] border border-border-default bg-background shadow-[var(--shadow-medium)]">{children}</div>; }
function Action({ onClick, children }: { onClick: () => void; children: React.ReactNode }) { return <button type="button" onClick={onClick} className="mt-5 min-h-11 rounded-full border border-border-default px-5 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2">{children}</button>; }

const inputClass = "min-h-12 w-full rounded-xl border border-border-default bg-background px-4 py-3 text-base outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25";
function toForm(identity: PaymentIdentity): FormState { return { username: identity.username, displayName: identity.displayName, avatarUrl: identity.avatarUrl ?? "", discoverability: identity.discoverability }; }
function same(a: FormState, b: FormState) { return a.username === b.username && a.displayName === b.displayName && a.avatarUrl === b.avatarUrl && a.discoverability === b.discoverability; }
function validate(form: FormState): FieldErrors { const errors: FieldErrors = {}; const username = form.username.trim(); if (!/^[a-z][a-z0-9_]{2,29}$/i.test(username)) errors.username = "Use 3–30 characters, begin with a letter, and use only letters, numbers, or underscores."; const display = form.displayName.trim().replace(/\s+/g, " "); if (Array.from(display).length < 1 || Array.from(display).length > 80 || /\p{Cc}/u.test(display)) errors.displayName = "Enter a display name between 1 and 80 characters."; const avatar = form.avatarUrl.trim(); if (avatar) { try { if (new URL(avatar).protocol !== "https:") errors.avatarUrl = "Avatar URL must use HTTPS."; } catch { errors.avatarUrl = "Enter a valid HTTPS avatar URL."; } } return errors; }
function isSuccess(value: unknown): value is IdentitySuccess { return typeof value === "object" && value !== null && "ok" in value && value.ok === true && "identity" in value; }
function isFailure(value: unknown): value is IdentityFailure { return typeof value === "object" && value !== null && "ok" in value && value.ok === false && "code" in value && "error" in value; }
function failureMessage(value: unknown) { return isFailure(value) ? value.error : "Payment Identity is temporarily unavailable. Try again."; }
function label(value: string) { return value.split("_").map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(" "); }
function verificationCopy(state: VerificationState) { return state === "unverified" ? { title: "Identity verification", text: "Identity verification has not been completed. ZephiPay cannot currently confirm the real-world identity behind this account; senders may receive an additional confirmation step." } : state === "pending" ? { title: "Verification incomplete", text: "The authoritative verification state is pending. No review details or completion timing are available." } : state === "verified" ? { title: "Identity verified", text: "ZephiPay has an authoritative verification result for this Economic Identity. Verification does not change your discoverability choice." } : { title: "Identity restricted", text: "This Payment Identity cannot currently be used normally. Internal security or administrative reasons are not exposed, and this state cannot be overridden here." }; }
function payabilityCopy(state: PayabilityState) { return state === "available" ? { title: "Available for payments", text: "An authorized system currently marks this identity available to receive through supported Payment Identity flows. This is separate from verification." } : state === "unavailable" ? { title: "Not currently available", text: "This identity is not currently available to receive through the Payment Identity flow. Creating or editing an identity does not make it payable." } : { title: "Payment availability restricted", text: "This identity cannot currently be used normally for payments. This state is system-controlled and cannot be changed here." }; }
