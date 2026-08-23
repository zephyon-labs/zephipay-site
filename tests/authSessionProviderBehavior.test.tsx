import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { act, create, type ReactTestRenderer } from "react-test-renderer";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime.js";

import { AccountHydrationProvider, useAccountHydration } from "../src/components/auth/AccountHydrationProvider";
import { AccountSession } from "../src/components/auth/AccountSession";
import { AuthenticatedBoundary } from "../src/components/auth/AuthenticatedBoundary";
import { ZpHydrationProvider, useZpHydration } from "../src/components/auth/ZpHydrationProvider";
import { AUTH_STATE_HEADER } from "../src/lib/auth/authFailure";
import { AuthenticatedRequestInvalidatedError, authenticatedRequests } from "../src/lib/auth/authenticatedRequests";
import { AUTHORITY_REVALIDATION_INTERVAL_MS, AUTHORITY_REVALIDATION_SIGNAL_GAP_MS } from "../src/lib/auth/authorityRevalidation";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let mounted: ReactTestRenderer | undefined;
let browser: BrowserHarness | undefined;

afterEach(async () => {
  if (mounted) await act(async () => mounted?.unmount());
  mounted = undefined;
  browser?.restore();
  browser = undefined;
});

function Probe() {
  const { account, beginLogout, refresh, status } = useAccountHydration();
  return <div>
    <span id="status">{status}</span>
    <span id="principal">{account?.id ?? "none"}</span>
    <button id="logout" type="button" onClick={beginLogout}>Log out</button>
    <button id="refresh" type="button" onClick={() => void refresh()}>Refresh</button>
    <AuthenticatedBoundary><span id="sensitive">Payment Identity:{account?.id}</span></AuthenticatedBoundary>
  </div>;
}

function ZpProbe() {
  const state = useZpHydration();
  return <><span id="zp-status">{state.status}</span><span id="zp-value">{state.status === "ready" ? state.zp.totalPoints : "—"}</span></>;
}

async function mountWith(fetchImplementation: typeof fetch, content = <Probe />) {
  browser = new BrowserHarness(fetchImplementation);
  browser.install();
  let renderer!: ReactTestRenderer;
  await act(async () => {
    renderer = create(<PathnameContext.Provider value="/personal"><AccountHydrationProvider>{content}</AccountHydrationProvider></PathnameContext.Provider>);
    mounted = renderer;
  });
  await act(async () => { browser?.runInitialTimers(); await settle(); });
  return { browser, renderer } as const;
}

describe("mounted authoritative account lifecycle", () => {
  it("keeps the logout POST transport alive through synchronous AccountSession teardown and submits once", async () => {
    const content = <><Probe /><AccountSession /></>;
    const { browser: environment, renderer } = await mountWith(async () => accountResponse("account-a"), content);
    assert.equal(text(renderer, "sensitive"), "Payment Identity:account-a");
    const accountForm = renderer.root.findByProps({ action: "/api/auth/logout" });
    let prevented = 0;

    await act(async () => {
      accountForm.props.onSubmit({ preventDefault: () => { prevented += 1; } });
      accountForm.props.onSubmit({ preventDefault: () => { prevented += 1; } });
    });

    assert.equal(text(renderer, "status"), "signing-out");
    assert.equal(renderer.root.findAllByProps({ id: "sensitive" }).length, 0);
    assert.equal(renderer.root.findAllByProps({ action: "/api/auth/logout" }).length, 0);
    assert.equal(environment.logoutSubmissions, 1);
    assert.equal(environment.logoutTransportAttached, true);
    assert.deepEqual(environment.logoutTarget, { action: "/api/auth/logout", method: "post" });
    assert.equal(prevented, 2);
  });

  it("maps an authenticated ZP 503 to the compact unavailable state without fabricating zero", async () => {
    const calls: string[] = [];
    const content = <ZpHydrationProvider><ZpProbe /></ZpHydrationProvider>;
    const { renderer } = await mountWith(async (input) => {
      const url = String(input);
      calls.push(url);
      return url === "/api/account"
        ? accountResponse("account-a")
        : new Response(JSON.stringify({ ok: false, code: "TEMPORARILY_UNAVAILABLE", error: "Unavailable" }), { status: 503 });
    }, content);
    await act(async () => { await settle(); });

    assert.deepEqual(calls, ["/api/account", "/api/account/zp"]);
    assert.equal(text(renderer, "zp-status"), "error");
    assert.equal(text(renderer, "zp-value"), "—");
  });

  it("unmounts Payment Identity and all sensitive children synchronously on logout", async () => {
    const { renderer } = await mountWith(async () => accountResponse("account-a"));
    assert.equal(text(renderer, "sensitive"), "Payment Identity:account-a");
    await act(async () => { renderer.root.findByProps({ id: "logout" }).props.onClick(); });
    assert.equal(text(renderer, "status"), "signing-out");
    assert.equal(renderer.root.findAllByProps({ id: "sensitive" }).length, 0);
    assert.equal(text(renderer, "principal"), "none");
  });

  it("fences an account response that resolves after another BFF authoritatively returns 401", async () => {
    const account = deferredResponse();
    const calls: string[] = [];
    const { renderer } = await mountWith(async (input) => {
      const url = String(input); calls.push(url);
      return url === "/api/account" ? account.promise : new Response(JSON.stringify({ ok: false }), { status: 401 });
    });
    await act(async () => {
      await assert.rejects(authenticatedRequests.json("/api/activity"), AuthenticatedRequestInvalidatedError);
    });
    assert.equal(text(renderer, "status"), "signed-out");
    await act(async () => { account.resolve(accountResponse("account-a")); await settle(); });
    assert.equal(text(renderer, "status"), "signed-out");
    assert.equal(renderer.root.findAllByProps({ id: "sensitive" }).length, 0);
    assert.deepEqual(calls, ["/api/account", "/api/activity"]);
  });

  it("keeps User B authoritative when a pre-logout User A hydration resolves last", async () => {
    const oldA = deferredResponse();
    let accountCalls = 0;
    const { renderer } = await mountWith(async () => {
      accountCalls += 1;
      if (accountCalls === 1) return accountResponse("account-a");
      if (accountCalls === 2) return oldA.promise;
      return accountResponse("account-b");
    });
    assert.equal(text(renderer, "principal"), "account-a");
    await act(async () => { renderer.root.findByProps({ id: "refresh" }).props.onClick(); await settle(); });
    await act(async () => { renderer.root.findByProps({ id: "logout" }).props.onClick(); });
    await act(async () => { renderer.root.findByProps({ id: "refresh" }).props.onClick(); await settle(); });
    assert.equal(text(renderer, "sensitive"), "Payment Identity:account-b");
    await act(async () => { oldA.resolve(accountResponse("account-a")); await settle(); });
    assert.equal(text(renderer, "sensitive"), "Payment Identity:account-b");
  });

  it("revalidates without BroadcastChannel on focus, visibility restoration, and pageshow", async () => {
    const responses = [accountResponse("account-a")];
    const calls: string[] = [];
    const { browser: environment, renderer } = await mountWith(async (input) => {
      calls.push(String(input));
      return responses.shift() ?? accountResponse("account-a");
    });
    assert.equal(environment.hasBroadcastChannel, false);

    responses.push(new Response(JSON.stringify({ ok: false, authenticated: true }), { status: 503 }));
    environment.advance(6_000);
    await act(async () => { environment.dispatchWindow("focus"); await settle(); });
    assert.equal(text(renderer, "status"), "authenticated-unavailable");
    assert.equal(renderer.root.findAllByProps({ id: "sensitive" }).length, 0);

    responses.push(accountResponse("account-b"));
    environment.advance(6_000);
    await act(async () => { environment.dispatchVisible(); await settle(); });
    assert.equal(text(renderer, "sensitive"), "Payment Identity:account-b");

    responses.push(new Response(JSON.stringify({ ok: false, code: "REAUTHENTICATION_REQUIRED" }), { status: 401, headers: { [AUTH_STATE_HEADER]: "reauthentication-required" } }));
    environment.advance(6_000);
    await act(async () => { environment.dispatchWindow("pageshow"); await settle(); });
    assert.equal(text(renderer, "status"), "reauthentication-required");
    assert.equal(renderer.root.findAllByProps({ id: "sensitive" }).length, 0);
    assert.equal(calls.every((url) => url === "/api/account"), true);
  });

  it("detects idle session expiry through bounded periodic server revalidation", async () => {
    let expired = false;
    const { browser: environment, renderer } = await mountWith(async () => expired
      ? new Response(JSON.stringify({ ok: false, code: "REAUTHENTICATION_REQUIRED" }), { status: 401, headers: { [AUTH_STATE_HEADER]: "reauthentication-required" } })
      : accountResponse("account-a"));
    expired = true;
    environment.advance(AUTHORITY_REVALIDATION_INTERVAL_MS);
    await act(async () => { environment.runIntervals(); await settle(); });
    assert.equal(text(renderer, "status"), "reauthentication-required");
    assert.equal(renderer.root.findAllByProps({ id: "sensitive" }).length, 0);
  });

  it("trails focus, visibility, and pageshow signals inside the coalescing window", async () => {
    let calls = 0;
    const { browser: environment, renderer } = await mountWith(async () => {
      calls += 1;
      return accountResponse("account-a");
    });
    assert.equal(environment.hasBroadcastChannel, false);
    assert.equal(calls, 1);
    let expectedCalls = 1;

    for (const restore of [
      () => environment.dispatchWindow("focus"),
      () => environment.dispatchVisible(),
      () => environment.dispatchWindow("pageshow"),
    ]) {
      await act(async () => { restore(); await settle(); });
      assert.equal(calls, expectedCalls);
      assert.equal(text(renderer, "status"), "authenticated-unavailable");
      assert.equal(renderer.root.findAllByProps({ id: "sensitive" }).length, 0);
      environment.advance(AUTHORITY_REVALIDATION_SIGNAL_GAP_MS);
      await act(async () => { environment.runDueTimers(); await settle(); });
      expectedCalls += 1;
      assert.equal(calls, expectedCalls);
      assert.equal(text(renderer, "sensitive"), "Payment Identity:account-a");
    }
    assert.equal(calls, 4);
  });

  it("gates stale mutating UI before a restore check and keeps it unavailable on a transient 5xx", async () => {
    const restore = deferredResponse();
    let calls = 0;
    const { browser: environment, renderer } = await mountWith(async () => {
      calls += 1;
      return calls === 1 ? accountResponse("account-a") : restore.promise;
    });
    environment.advance(AUTHORITY_REVALIDATION_SIGNAL_GAP_MS);
    await act(async () => { environment.dispatchWindow("focus"); await settle(); });
    assert.equal(text(renderer, "status"), "authenticated-unavailable");
    assert.equal(renderer.root.findAllByProps({ id: "sensitive" }).length, 0);
    await act(async () => {
      restore.resolve(new Response(JSON.stringify({ ok: false, authenticated: true }), { status: 503 }));
      await settle();
    });
    assert.equal(text(renderer, "status"), "authenticated-unavailable");
    assert.equal(renderer.root.findAllByProps({ id: "sensitive" }).length, 0);
  });

  it("replaces User A only after a restore check establishes a clean User B lifecycle", async () => {
    const restore = deferredResponse();
    let calls = 0;
    const { browser: environment, renderer } = await mountWith(async () => {
      calls += 1;
      return calls === 1 ? accountResponse("account-a") : restore.promise;
    });
    assert.equal(text(renderer, "sensitive"), "Payment Identity:account-a");
    environment.advance(AUTHORITY_REVALIDATION_SIGNAL_GAP_MS);
    await act(async () => { environment.dispatchWindow("pageshow"); await settle(); });
    assert.equal(text(renderer, "status"), "authenticated-unavailable");
    assert.equal(text(renderer, "principal"), "none");
    assert.equal(renderer.root.findAllByProps({ id: "sensitive" }).length, 0);
    await act(async () => { restore.resolve(accountResponse("account-b")); await settle(); });
    assert.equal(text(renderer, "principal"), "account-b");
    assert.equal(text(renderer, "sensitive"), "Payment Identity:account-b");
  });
});

function accountResponse(accountId: string): Response {
  return new Response(JSON.stringify({
    ok: true,
    account: {
      id: accountId,
      actorSubject: `zp:account:${accountId}`,
      status: "active",
      createdAt: "2026-01-01T00:00:00.000Z",
      identities: [],
      paymentAccess: { enabled: true },
    },
  }), { status: 200, headers: { "Content-Type": "application/json" } });
}

function deferredResponse() {
  let resolve!: (response: Response) => void;
  const promise = new Promise<Response>((done) => { resolve = done; });
  return { promise, resolve };
}

function text(renderer: ReactTestRenderer, id: string): string {
  return renderer.root.findByProps({ id }).children.join("");
}

async function settle() {
  await Promise.resolve();
  await new Promise<void>((resolve) => setImmediate(resolve));
}

class BrowserHarness {
  private readonly originalWindow = globalThis.window;
  private readonly originalDocument = globalThis.document;
  private readonly originalFetch = globalThis.fetch;
  private readonly originalDateNow = Date.now;
  private readonly windowListeners = new Map<string, Set<() => void>>();
  private readonly documentListeners = new Map<string, Set<() => void>>();
  private readonly timers = new Map<number, { callback: () => void; dueAt: number }>();
  private readonly intervals = new Map<number, () => void>();
  private nextTimer = 0;
  private now = 10_000;
  private visibilityState: DocumentVisibilityState = "visible";
  private logoutForm: { action: string; method: string; attached: boolean } | undefined;
  readonly hasBroadcastChannel = false;
  logoutSubmissions = 0;

  constructor(private readonly fetchImplementation: typeof fetch) {}

  install() {
    const windowValue = {
      addEventListener: (type: string, listener: () => void) => this.add(this.windowListeners, type, listener),
      removeEventListener: (type: string, listener: () => void) => this.remove(this.windowListeners, type, listener),
      setTimeout: (callback: () => void, delay = 0) => this.timeout(callback, delay),
      clearTimeout: (id: number) => this.timers.delete(id),
      setInterval: (callback: () => void) => this.timer(this.intervals, callback),
      clearInterval: (id: number) => this.intervals.delete(id),
      location: { reload: () => undefined, search: "" },
    };
    const documentValue = {
      addEventListener: (type: string, listener: () => void) => this.add(this.documentListeners, type, listener),
      removeEventListener: (type: string, listener: () => void) => this.remove(this.documentListeners, type, listener),
      body: {
        appendChild: (form: { action: string; method: string; attached: boolean }) => {
          form.attached = true;
          this.logoutForm = form;
          return form;
        },
      },
      createElement: (tagName: string) => {
        assert.equal(tagName, "form");
        const form = {
          action: "",
          method: "",
          hidden: false,
          attached: false,
          submit: () => { this.logoutSubmissions += 1; },
          remove: () => { form.attached = false; },
        };
        return form;
      },
    };
    Object.defineProperty(documentValue, "visibilityState", { get: () => this.visibilityState });
    Object.defineProperty(globalThis, "window", { configurable: true, value: windowValue });
    Object.defineProperty(globalThis, "document", { configurable: true, value: documentValue });
    globalThis.fetch = this.fetchImplementation;
    Date.now = () => this.now;
  }

  restore() {
    Object.defineProperty(globalThis, "window", { configurable: true, value: this.originalWindow });
    Object.defineProperty(globalThis, "document", { configurable: true, value: this.originalDocument });
    globalThis.fetch = this.originalFetch;
    Date.now = this.originalDateNow;
  }

  advance(milliseconds: number) { this.now += milliseconds; }
  get logoutTransportAttached() { return this.logoutForm?.attached ?? false; }
  get logoutTarget() { return this.logoutForm ? { action: this.logoutForm.action, method: this.logoutForm.method } : undefined; }
  runInitialTimers() { this.runDueTimers(); }
  runDueTimers() {
    for (const [id, timer] of [...this.timers]) {
      if (timer.dueAt > this.now) continue;
      this.timers.delete(id);
      timer.callback();
    }
  }
  runIntervals() { for (const callback of this.intervals.values()) callback(); }
  dispatchWindow(type: string) { for (const listener of this.windowListeners.get(type) ?? []) listener(); }
  dispatchVisible() { this.visibilityState = "visible"; for (const listener of this.documentListeners.get("visibilitychange") ?? []) listener(); }

  private timer(collection: Map<number, () => void>, callback: () => void): number {
    const id = ++this.nextTimer;
    collection.set(id, callback);
    return id;
  }

  private timeout(callback: () => void, delay: number): number {
    const id = ++this.nextTimer;
    this.timers.set(id, { callback, dueAt: this.now + delay });
    return id;
  }

  private add(collection: Map<string, Set<() => void>>, type: string, listener: () => void) {
    const listeners = collection.get(type) ?? new Set();
    listeners.add(listener);
    collection.set(type, listeners);
  }

  private remove(collection: Map<string, Set<() => void>>, type: string, listener: () => void) {
    collection.get(type)?.delete(listener);
  }
}
