import assert from "node:assert/strict";
import { act, create, type ReactTestInstance, type ReactTestRenderer } from "react-test-renderer";
import { useSyncExternalStore, type ReactNode } from "react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime.js";
import { PathnameContext, SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime.js";
import { AccountHydrationProvider, useAccountHydration } from "../../src/components/auth/AccountHydrationProvider";
import { ProtectedAccountBoundary } from "../../src/components/auth/AuthenticatedBoundary";
import { ZpHydrationProvider } from "../../src/components/auth/ZpHydrationProvider";
import { SendDraftProvider, useSendDraft } from "../../src/components/product/personal/SendDraftProvider";
import { PersonalSendExperience } from "../../src/components/product/personal/PersonalSendExperience";
import { PersonalWorkspace } from "../../src/components/marketing/personal-workspace/PersonalWorkspace";
import { authenticatedRequests } from "../../src/lib/auth/authenticatedRequests";
import type { PaymentIntent } from "../../src/lib/paymentIntents/contract";
import type { ExecutionStatus } from "../../src/lib/paymentIntents/executionContract";
import type { DevnetExecutionStatus } from "../../src/lib/paymentIntents/devnetExecutionContract";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
export const INTENT_ID = "00000000-0000-4000-8000-000000000001";
export const EXECUTION_ID = "00000000-0000-4000-8000-000000000002";
export const RECIPIENT_ID = "00000000-0000-4000-8000-000000000003";
export const AT = "2026-09-01T12:00:00.000Z";
export const WALLET = "DWLaEPUUyLgPqhoJDGni8PRaL58FdfSmXdL6Qtrp1hJ8";
export const recipient = {
  accountId: RECIPIENT_ID, username: "recipient", displayName: "Recipient Example",
  accountType: "personal", verificationState: "verified", payabilityState: "available",
} as const;

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}
export function accountResponse(accountId: string) {
  return json({ ok: true, account: { id: accountId, actorSubject: "zp:account:" + accountId, status: "active", createdAt: AT, identities: [], paymentAccess: { enabled: true } } });
}
export function intent(status: PaymentIntent["status"] = "awaiting_confirmation", devnet = false): PaymentIntent {
  const base = { id: INTENT_ID, status, version: status === "processing" ? "1" : "0", requestHash: "a".repeat(64), amountRaw: "2000000", amount: "2", asset: "USDC" as const, network: "solana-devnet" as const, purpose: "Dinner", createdAt: AT };
  return devnet ? { ...base, recipientType: "direct_wallet", recipient: WALLET } : {
    ...base, recipientType: "payment_identity",
    recipientSnapshot: { ...recipient, capturedAt: AT, schemaVersion: 1, resolutionSource: "recipient_directory", trustOutcome: "not_required" },
  };
}
export function execution(status: ExecutionStatus) {
  return { ok: true, execution: {
    paymentIntentId: INTENT_ID, executionId: EXECUTION_ID, status, createdAt: AT,
    receiptAvailable: status === "settled", retryAllowed: false,
    stillProcessing: ["ready", "processing", "pending"].includes(status), reconciliationPending: status === "pending",
    rail: { id: "mock", label: "Mock Rail" },
  } };
}
export function devnetExecution(status: DevnetExecutionStatus) {
  return { ok: true, execution: {
    paymentIntentId: INTENT_ID, executionId: EXECUTION_ID, network: "solana-devnet", rail: "solana", asset: "USDC",
    amount: "2", amountRaw: "2000000", recipientWallet: WALLET, status,
    reconciliationPending: !["settled", "failed"].includes(status),
  } };
}
export function receipt(devnet = false) {
  return { ok: true, receipt: {
    receiptId: "receipt:round1-durable", paymentIntentId: INTENT_ID, executionId: EXECUTION_ID,
    status: "settled", amountRaw: "2000000", amount: "2", asset: "USDC", sender: { displayName: "You" },
    recipient: devnet ? { type: "direct_wallet", displayName: "Wallet recipient" } : { type: "payment_identity", displayName: recipient.displayName, username: recipient.username, verificationState: "verified", trustOutcome: "not_required" },
    memo: "Dinner", rail: devnet ? { id: "solana", label: "Solana Devnet" } : { id: "mock", label: "Mock Rail" },
    settledAt: AT, verification: { receiptSchemaVersion: 1, evidenceType: devnet ? "solana.signature" : "mock.execution", evidenceVersion: 1, requestHash: "a".repeat(64) },
  } };
}

export class PaymentApi {
  readonly calls: { url: string; method: string; body?: Record<string, unknown> }[] = [];
  account = "account-a";
  accountRead: (() => Promise<Response>) | undefined;
  paymentIntent = intent();
  status: ExecutionStatus = "processing";
  devnetStatus: DevnetExecutionStatus = "unknown_reconciliation_required";
  executionFailure: "lost" | "invalid-json" | "invalid-shape" | "unavailable" | undefined;
  executionReadsUnavailable = false;
  receiptUnavailable = false;
  recipientVerified = true;
  activity: unknown[] = [];
  requests: unknown[] = [];
  readonly fetch: typeof fetch = async (input, init) => {
    const url = String(input), method = init?.method ?? "GET";
    const body = typeof init?.body === "string" ? JSON.parse(init.body) : undefined;
    this.calls.push({ url, method, body });
    if (url === "/api/account") return this.accountRead ? this.accountRead() : accountResponse(this.account);
    if (url === "/api/account/zp") return json({ ok: false }, 503);
    if (url === "/api/account/identity") return json({ ok: true, identity: null });
    if (url.startsWith("/api/activity")) return json({ ok: true, items: this.activity });
    if (url.startsWith("/api/payment-requests?")) return json({ ok: true, items: this.requests });
    const resolved = { ...recipient, verificationState: this.recipientVerified ? "verified" : "unverified" };
    if (url === "/api/recipients/search") return json({ ok: true, recipients: [resolved] });
    if (url === "/api/recipients/" + RECIPIENT_ID) return json({ ok: true, recipient: resolved });
    if (url === "/api/payment-intents" && method === "POST") {
      this.paymentIntent = { ...intent(), amount: String(body?.amount), purpose: body?.purpose as string | null };
      return json({ ok: true, paymentIntent: this.paymentIntent });
    }
    if (url === "/api/payment-intents/" + INTENT_ID) return json({ ok: true, paymentIntent: this.paymentIntent });
    if (url.endsWith("/confirm")) {
      this.paymentIntent = { ...this.paymentIntent, status: "processing", version: "1" };
      return json({ ok: true, paymentIntent: this.paymentIntent });
    }
    if (url.endsWith("/devnet/execute")) throw new Error("A Round 1 Devnet execution POST must never occur.");
    if (url.endsWith("/execute")) {
      if (this.executionFailure === "lost") throw new TypeError("The response was lost after contact.");
      if (this.executionFailure === "invalid-json") return new Response("{", { headers: { "Content-Type": "application/json" } });
      if (this.executionFailure === "invalid-shape") return json({ ok: true, execution: { status: "settled" } });
      if (this.executionFailure === "unavailable") return json({ ok: false }, 503);
      return json(execution(this.status), 202);
    }
    if (url.endsWith("/devnet/execution")) return json(devnetExecution(this.devnetStatus));
    if (url.endsWith("/execution")) return this.executionReadsUnavailable ? json({ ok: false }, 503) : json(execution(this.status));
    if (url.endsWith("/receipt")) return this.receiptUnavailable ? json({ ok: false }, 503) : json(receipt(this.paymentIntent.recipientType === "direct_wallet"));
    throw new Error("Unexpected test request: " + method + " " + url);
  };
  mutations() { return this.calls.filter(call => call.method !== "GET" && call.url.startsWith("/api/payment")); }
}

function AuthControls() {
  const { beginLogout, refresh, status } = useAccountHydration();
  return <><button onClick={beginLogout}>Test logout</button><button onClick={() => void refresh()}>Test refresh authority</button><span id="authority-state">{status}</span></>;
}
function DraftObserver() {
  const saved = useSendDraft();
  return <output id="typed-draft">{JSON.stringify(saved?.draft)}</output>;
}

export class BrowserHarness {
  private readonly originalWindow = globalThis.window;
  private readonly originalSelf = globalThis.self;
  private readonly originalDocument = globalThis.document;
  private readonly originalFetch = globalThis.fetch;
  private readonly originalNow = Date.now;
  private readonly listeners = new Map<string, Set<() => void>>();
  private readonly documentListeners = new Map<string, Set<() => void>>();
  private readonly locationListeners = new Set<() => void>();
  private readonly timers = new Map<number, { callback: () => void; due: number }>();
  private readonly intervals = new Map<number, () => void>();
  private nextTimer = 0;
  private now = 10_000;
  url: URL;
  constructor(url: string, private readonly api: PaymentApi) { this.url = new URL(url, "https://zephipay.test"); }
  readonly subscribe = (listener: () => void) => { this.locationListeners.add(listener); return () => { this.locationListeners.delete(listener); }; };
  readonly snapshot = () => this.url.href;
  navigate = (target: string) => {
    this.url = new URL(target, this.url);
    for (const listener of this.locationListeners) listener();
  };
  install() {
    const windowValue = {
      addEventListener: (type: string, listener: () => void) => this.add(this.listeners, type, listener),
      removeEventListener: (type: string, listener: () => void) => this.listeners.get(type)?.delete(listener),
      dispatchEvent: (event: Event) => { this.signal(event.type); return true; },
      setTimeout: (callback: () => void, delay = 0) => { const id = ++this.nextTimer; this.timers.set(id, { callback, due: this.now + delay }); return id; },
      clearTimeout: (id: number) => this.timers.delete(id),
      setInterval: (callback: () => void) => { const id = ++this.nextTimer; this.intervals.set(id, callback); return id; },
      clearInterval: (id: number) => this.intervals.delete(id),
      history: { replaceState: (_data: unknown, _unused: string, url: string) => this.navigate(url) },
    };
    Object.defineProperty(windowValue, "location", { get: () => this.url });
    Object.defineProperty(globalThis, "window", { configurable: true, value: windowValue });
    Object.defineProperty(globalThis, "self", { configurable: true, value: windowValue });
    Object.defineProperty(globalThis, "document", { configurable: true, value: {
      visibilityState: "visible",
      addEventListener: (type: string, listener: () => void) => this.add(this.documentListeners, type, listener),
      removeEventListener: (type: string, listener: () => void) => this.documentListeners.get(type)?.delete(listener),
    } });
    globalThis.fetch = this.api.fetch;
    Date.now = () => this.now;
  }
  restore() {
    Object.defineProperty(globalThis, "window", { configurable: true, value: this.originalWindow });
    Object.defineProperty(globalThis, "self", { configurable: true, value: this.originalSelf });
    Object.defineProperty(globalThis, "document", { configurable: true, value: this.originalDocument });
    globalThis.fetch = this.originalFetch;
    Date.now = this.originalNow;
    authenticatedRequests.invalidate();
  }
  advance(milliseconds = 6_000) { this.now += milliseconds; }
  runTimers() {
    for (const [id, timer] of [...this.timers]) if (timer.due <= this.now) { this.timers.delete(id); timer.callback(); }
  }
  signal(type: "focus" | "visible" | "periodic" | string) {
    if (type === "periodic") { for (const callback of this.intervals.values()) callback(); return; }
    const collection = type === "visible" ? this.documentListeners : this.listeners;
    for (const callback of collection.get(type === "visible" ? "visibilitychange" : type) ?? []) callback();
  }
  private add(collection: Map<string, Set<() => void>>, type: string, listener: () => void) {
    const listeners = collection.get(type) ?? new Set();
    listeners.add(listener); collection.set(type, listeners);
  }
}

function RouterHarness({ browser, children }: { browser: BrowserHarness; children: ReactNode }) {
  const location = useSyncExternalStore(browser.subscribe, browser.snapshot, browser.snapshot);
  const url = new URL(location);
  const router = { push: browser.navigate, replace: browser.navigate, refresh() {}, hmrRefresh() {}, back() {}, forward() {}, prefetch() {} };
  return <AppRouterContext.Provider value={router}><PathnameContext.Provider value={url.pathname}><SearchParamsContext.Provider value={url.searchParams}>{children}</SearchParamsContext.Provider></PathnameContext.Provider></AppRouterContext.Provider>;
}

export async function mountPayment(options: { api?: PaymentApi; url?: string; personal?: boolean; serverRecoveryId?: string; content?: ReactNode } = {}) {
  const api = options.api ?? new PaymentApi(), browser = new BrowserHarness(options.url ?? (options.personal ? "/personal" : "/personal/send"), api);
  browser.install();
  let renderer!: ReactTestRenderer;
  const content = options.content ?? (options.personal
    ? <PersonalWorkspace recoveryId={options.serverRecoveryId} />
    : <ProtectedAccountBoundary returnTo="/personal/send"><PersonalSendExperience recoveryId={options.serverRecoveryId} /></ProtectedAccountBoundary>);
  await act(async () => {
    // Match the real layout: draft input outlives the ZP generation subtree,
    // while every payment component remains behind the unchanged auth boundary.
    renderer = create(<RouterHarness browser={browser}><AccountHydrationProvider><SendDraftProvider><DraftObserver /><ZpHydrationProvider><AuthControls />{content}</ZpHydrationProvider></SendDraftProvider></AccountHydrationProvider></RouterHarness>);
  });
  await act(async () => { browser.runTimers(); await flush(); });
  await act(async () => { await flush(); });
  return {
    api, browser, renderer,
    async close() { await act(async () => renderer.unmount()); browser.restore(); },
  };
}
export async function flush() { await new Promise<void>(resolve => setTimeout(resolve, 15)); }
export function text(node: ReactTestInstance): string { return node.children.map(child => typeof child === "string" ? child : text(child)).join(""); }
export function visible(node: ReactTestInstance): boolean {
  for (let current: ReactTestInstance | null = node; current; current = current.parent) {
    if (current.props.hidden || String(current.props.className ?? "").split(" ").includes("hidden")) return false;
  }
  return true;
}
export function buttons(renderer: ReactTestRenderer, label?: string) {
  return renderer.root.findAllByType("button").filter(node => visible(node) && (label === undefined || text(node) === label));
}
export async function click(renderer: ReactTestRenderer, label: string) {
  const button = buttons(renderer, label)[0];
  assert.ok(button, "Expected visible button: " + label);
  assert.equal(Boolean(button.props.disabled), false, "Button must be enabled: " + label);
  await act(async () => { await button.props.onClick(); await flush(); });
}
export function field(renderer: ReactTestRenderer, placeholder: string) {
  const input = renderer.root.findAllByType("input").find(node => visible(node) && node.props.placeholder === placeholder);
  assert.ok(input, "Expected visible input: " + placeholder);
  return input;
}
export async function populate(renderer: ReactTestRenderer, username = "@recipient", amount = "2", purpose = "Dinner") {
  for (const [placeholder, value] of [["@username", username], ["0.00", amount], ["What is this payment for?", purpose]]) {
    await act(async () => field(renderer, placeholder).props.onChange({ target: { value } }));
  }
}
export async function review(renderer: ReactTestRenderer) {
  const form = renderer.root.findAllByType("form").find(visible);
  assert.ok(form);
  await act(async () => { await form.props.onSubmit({ preventDefault() {} }); await flush(); });
  await act(async () => { await flush(); });
}
export function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>(done => { resolve = done; });
  return { promise, resolve };
}
