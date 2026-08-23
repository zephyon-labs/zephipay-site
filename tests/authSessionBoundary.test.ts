import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { Button } from "../src/components/ui/Button";
import {
  authenticatedBoundaryKey,
  canRenderAuthenticatedState,
  crossTabAuthAction,
  initialAuthLifecycle,
  transitionAuthLifecycle,
  type AuthLifecycleState,
} from "../src/lib/auth/authLifecycle";
import {
  AuthenticatedRequestCoordinator,
  AuthenticatedRequestInvalidatedError,
} from "../src/lib/auth/authenticatedRequests";
import { authLoginHref, protectedRouteDecision, sdkLogoutUrl } from "../src/lib/auth/navigation";
import { beginConfirmedPaymentFollowUp } from "../src/lib/paymentIntents/authenticatedContinuation";

function authenticate(accountId: string, state: AuthLifecycleState = initialAuthLifecycle): AuthLifecycleState {
  return transitionAuthLifecycle(state, { type: "authenticated", accountId });
}

function visibleAccountState(state: AuthLifecycleState, values: readonly string[]): readonly string[] {
  return canRenderAuthenticatedState(state) ? values : [];
}

function deferredResponse() {
  let resolve!: (response: Response) => void;
  const promise = new Promise<Response>((done) => { resolve = done; });
  return { promise, resolve };
}

function deferredBody() {
  let resolveBody!: (value: unknown) => void;
  let markStarted!: () => void;
  const body = new Promise<unknown>((resolve) => { resolveBody = resolve; });
  const started = new Promise<void>((resolve) => { markStarted = resolve; });
  const response = {
    status: 200,
    headers: new Headers({ "Content-Type": "application/json" }),
    json: async () => { markStarted(); return body; },
  } as Response;
  return { response, started, resolve: resolveBody };
}

function jsonResponse(value: unknown, status = 200): Response {
  return new Response(JSON.stringify(value), { status, headers: { "Content-Type": "application/json" } });
}

describe("authoritative authenticated UI lifecycle", () => {
  it("synchronously hides every account-derived surface on explicit logout", () => {
    const values = ["canonical account", "Payment Identity", "ZP", "activity", "payment intent", "execution", "receipt", "request", "recipient"];
    const authenticated = authenticate("account-a");
    assert.deepEqual(visibleAccountState(authenticated, values), values);
    const signingOut = transitionAuthLifecycle(authenticated, { type: "logout" });
    assert.equal(signingOut.status, "signing-out");
    assert.deepEqual(visibleAccountState(signingOut, values), []);
    assert.equal(authenticatedBoundaryKey(signingOut), undefined);
  });

  it("cannot leave Payment Identity or other cached state visible after session loss", () => {
    const authenticated = authenticate("account-a");
    for (const event of [{ type: "signed-out" }, { type: "authenticated-unavailable" }, { type: "transient-error" }] as const) {
      const next = transitionAuthLifecycle(authenticated, event);
      assert.deepEqual(visibleAccountState(next, ["Payment Identity", "activity", "receipt"]), []);
      assert.equal(next.accountId, undefined);
    }
  });

  it("invalidates the authenticated generation before a foreground authority refresh", () => {
    const authenticated = authenticate("account-a");
    const loading = transitionAuthLifecycle(authenticated, { type: "loading" });
    assert.equal(loading.status, "loading");
    assert.equal(loading.generation, authenticated.generation + 1);
    assert.equal(authenticatedBoundaryKey(loading), undefined);
  });

  it("changes the keyed subtree generation for User A → logout → User B", () => {
    const userA = authenticate("account-a");
    const keyA = authenticatedBoundaryKey(userA);
    const signedOut = transitionAuthLifecycle(userA, { type: "logout" });
    const userB = authenticate("account-b", signedOut);
    assert.notEqual(authenticatedBoundaryKey(userB), keyA);
    assert.equal(userB.accountId, "account-b");
    assert.deepEqual(visibleAccountState(userB, ["B identity"]), ["B identity"]);
  });

  it("forces a reload on cross-tab principal replacement and invalidates on cross-tab logout", () => {
    const userA = authenticate("account-a");
    assert.equal(crossTabAuthAction(userA, { type: "principal", accountId: "account-b" }), "reload");
    assert.equal(crossTabAuthAction(userA, { type: "principal", accountId: "account-a" }), "none");
    assert.equal(crossTabAuthAction(userA, { type: "logout" }), "invalidate");
    assert.equal(crossTabAuthAction(initialAuthLifecycle, { type: "principal", accountId: "account-b" }), "refresh");
  });
});

describe("authenticated request generation fencing", () => {
  it("rejects a pre-logout delayed result so polling cannot repopulate cleared UI", async () => {
    const delayed = deferredResponse();
    const coordinator = new AuthenticatedRequestCoordinator((() => delayed.promise) as typeof fetch);
    const request = coordinator.json("/api/activity");
    coordinator.invalidate();
    delayed.resolve(new Response(JSON.stringify({ account: "A" }), { status: 200 }));
    await assert.rejects(request, (error) => error instanceof AuthenticatedRequestInvalidatedError || (error instanceof DOMException && error.name === "AbortError"));
  });

  it("prevents a delayed User A response from populating User B while accepting B", async () => {
    const a = deferredResponse();
    const b = deferredResponse();
    let call = 0;
    const coordinator = new AuthenticatedRequestCoordinator((() => (++call === 1 ? a.promise : b.promise)) as typeof fetch);
    const requestA = coordinator.text("/api/account/identity");
    coordinator.invalidate();
    const requestB = coordinator.text("/api/account/identity");
    a.resolve(new Response("A", { status: 200 }));
    b.resolve(new Response("B", { status: 200 }));
    await assert.rejects(requestA);
    let body: string | undefined;
    (await requestB).apply((view) => { body = view.body; });
    assert.equal(body, "B");
  });

  it("treats BFF 401 as authoritative session loss with a bounded reauthentication category", async () => {
    const signedOut = new AuthenticatedRequestCoordinator((async () => new Response(null, { status: 401 })) as typeof fetch);
    const reauthentication = new AuthenticatedRequestCoordinator((async () => new Response(null, {
      status: 401,
      headers: { "X-ZephiPay-Auth-State": "reauthentication-required" },
    })) as typeof fetch);
    const failures: string[] = [];
    signedOut.subscribeToUnauthorized((failure) => { failures.push(failure); });
    reauthentication.subscribeToUnauthorized((failure) => { failures.push(failure); });
    await assert.rejects(signedOut.json("/api/payment-intents"), AuthenticatedRequestInvalidatedError);
    await assert.rejects(reauthentication.json("/api/payment-intents"), AuthenticatedRequestInvalidatedError);
    assert.deepEqual(failures, ["signed-out", "reauthentication-required"]);
  });

  it("does not sign out on a transient 5xx or network failure", async () => {
    let unauthorized = 0;
    const serverFailure = new AuthenticatedRequestCoordinator((async () => new Response(null, { status: 503 })) as typeof fetch);
    serverFailure.subscribeToUnauthorized(() => { unauthorized += 1; });
    let status: number | undefined;
    (await serverFailure.json("/api/activity")).apply((view) => { status = view.response.status; });
    assert.equal(status, 503);
    const networkFailure = new AuthenticatedRequestCoordinator((async () => { throw new TypeError("network unavailable"); }) as typeof fetch);
    networkFailure.subscribeToUnauthorized(() => { unauthorized += 1; });
    await assert.rejects(networkFailure.json("/api/activity"), TypeError);
    assert.equal(unauthorized, 0);
  });

  it("keeps the generation fence active through body consumption and suppresses post-body effects", async () => {
    const body = deferredBody();
    const coordinator = new AuthenticatedRequestCoordinator((async () => body.response) as typeof fetch);
    const effects = { state: 0, navigation: 0, event: 0, followUp: 0 };
    const request = coordinator.json("/api/activity").then(() => {
      effects.state += 1;
      effects.navigation += 1;
      effects.event += 1;
      effects.followUp += 1;
    });
    await body.started;
    coordinator.invalidate();
    body.resolve({ accountId: "account-a" });
    await assert.rejects(request, AuthenticatedRequestInvalidatedError);
    assert.deepEqual(effects, { state: 0, navigation: 0, event: 0, followUp: 0 });
  });

  it("cannot apply User A body effects after logout and a completed User B request", async () => {
    const userA = deferredBody();
    let calls = 0;
    const coordinator = new AuthenticatedRequestCoordinator((async () => {
      calls += 1;
      return calls === 1 ? userA.response : jsonResponse({ accountId: "account-b" });
    }) as typeof fetch);
    const applied: string[] = [];
    const requestA = coordinator.json("/api/account/identity").then((result) => {
      result.apply(({ body }) => { applied.push((body as { accountId: string }).accountId); });
    });
    await userA.started;
    coordinator.invalidate();
    const requestB = coordinator.json("/api/account/identity").then((result) => {
      result.apply(({ body }) => { applied.push((body as { accountId: string }).accountId); });
    });
    await requestB;
    userA.resolve({ accountId: "account-a" });
    await assert.rejects(requestA, AuthenticatedRequestInvalidatedError);
    assert.deepEqual(applied, ["account-b"]);
  });

  it("rejects the exact result-to-consumer microtask handoff after the final body check", async () => {
    let call = 0;
    const coordinator = new AuthenticatedRequestCoordinator((async () => {
      call += 1;
      return call === 1
        ? jsonResponse({ accountId: "account-a" })
        : new Response(null, { status: 401 });
    }) as typeof fetch);
    const readyResult = await coordinator.json("/api/account/identity");
    const effects = { state: 0, navigation: 0, event: 0, followUp: 0 };

    // The 401 continuation is queued first. The already-returned A result then
    // reaches its consumer in the following microtask, after invalidation.
    const invalidation = coordinator.json("/api/session-check");
    const consumer = Promise.resolve().then(() => {
      readyResult.apply(() => {
        effects.state += 1;
        effects.navigation += 1;
        effects.event += 1;
        effects.followUp += 1;
      });
    });

    await assert.rejects(invalidation, AuthenticatedRequestInvalidatedError);
    await assert.rejects(consumer, AuthenticatedRequestInvalidatedError);
    assert.deepEqual(effects, { state: 0, navigation: 0, event: 0, followUp: 0 });
  });

  it("suppresses the real confirmed-payment follow-up when its result becomes stale", async () => {
    const confirmedPayment = {
      ok: true,
      paymentIntent: {
        id: "00000000-0000-4000-8000-000000000001",
        status: "processing",
        version: "2",
        requestHash: "a".repeat(64),
        recipient: "11111111111111111111111111111111",
        amountRaw: "1000000",
        amount: "1",
        asset: "USDC",
        network: "solana-devnet",
        purpose: null,
        createdAt: "2026-08-03T12:00:00.000Z",
        userConfirmedAt: "2026-08-03T12:00:01.000Z",
      },
      applied: true,
    };
    let executionRequests = 0;
    let call = 0;
    const coordinator = new AuthenticatedRequestCoordinator((async (input) => {
      call += 1;
      const url = String(input);
      if (url.endsWith("/devnet/execute")) {
        executionRequests += 1;
        return jsonResponse({ ok: true, execution: { status: "processing" } }, 202);
      }
      if (call === 2) return new Response(null, { status: 401 });
      return jsonResponse(confirmedPayment);
    }) as typeof fetch);
    const staleConfirmation = await coordinator.json("/api/payment-intents/00000000-0000-4000-8000-000000000001/confirm");
    const effects = { state: 0, navigation: 0, event: 0 };

    const invalidation = coordinator.json("/api/session-check");
    const staleContinuation = Promise.resolve().then(() => beginConfirmedPaymentFollowUp(
      staleConfirmation,
      "solana-devnet",
      () => {
        effects.state += 1;
        effects.navigation += 1;
        effects.event += 1;
      },
    ));
    await assert.rejects(invalidation, AuthenticatedRequestInvalidatedError);
    await assert.rejects(staleContinuation, AuthenticatedRequestInvalidatedError);
    assert.deepEqual(effects, { state: 0, navigation: 0, event: 0 });
    assert.equal(executionRequests, 0);

    const freshConfirmation = await coordinator.json("/api/payment-intents/00000000-0000-4000-8000-000000000001/confirm");
    const freshContinuation = beginConfirmedPaymentFollowUp(freshConfirmation, "solana-devnet", () => {
      effects.state += 1;
      effects.navigation += 1;
      effects.event += 1;
    });
    await freshContinuation.response;
    assert.deepEqual(effects, { state: 1, navigation: 1, event: 1 });
    assert.equal(executionRequests, 1);
  });
});

describe("protected navigation and logout handoff", () => {
  it("uses a local signed-out gate and starts Auth0 only after a deliberate link", () => {
    const decision = protectedRouteDecision(false, "/personal/send");
    assert.deepEqual(decision, { kind: "local-signed-out-gate", signInHref: "/auth/login?returnTo=%2Fpersonal%2Fsend" });
    assert.equal(authLoginHref("/personal/identity"), "/auth/login?returnTo=%2Fpersonal%2Fidentity");
    assert.equal(authLoginHref("/personal/send").includes("prompt="), false);
    assert.deepEqual(protectedRouteDecision(true, "/personal/send"), { kind: "content" });
  });

  it("renders an Auth0 transaction action as an ordinary full-document anchor", () => {
    const html = renderToStaticMarkup(Button({ href: authLoginHref("/personal/send"), fullDocument: true, children: "Sign in to continue" }));
    assert.match(html, /^<a /);
    assert.match(html, /href="\/auth\/login\?returnTo=%2Fpersonal%2Fsend"/);
    assert.doesNotMatch(html, /target="_blank"/);
  });

  it("hands the exact-origin POST wrapper to the Auth0 v4.26.0 /auth/logout route", () => {
    assert.equal(sdkLogoutUrl("https://pay.example", "https://pay.example")?.toString(), "https://pay.example/auth/logout");
    assert.equal(sdkLogoutUrl("https://pay.example", "https://evil.example"), undefined);
  });
});
