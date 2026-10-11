import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { act } from "react-test-renderer";
import { ProtectedAccountBoundary } from "../src/components/auth/AuthenticatedBoundary";
import { PersonalSendExperience } from "../src/components/product/personal/PersonalSendExperience";
import type { WebState } from "../src/lib/controlledConfirmation/handoffContract";
import { INTENT_ID, PaymentApi, buttons, click, intent, json, mountPayment, text } from "./helpers/round1Harness";

let mounted: Awaited<ReturnType<typeof mountPayment>> | undefined;
afterEach(async () => { await mounted?.close(); mounted = undefined; });
const paymentUrl = `/api/payment-intents/${INTENT_ID}`;
const noExecutionCopy = /Execution has not occurred|no funds have moved/i;
const newPaymentCopy = /This confirmation cannot continue here\. Start a new eligible payment\./;
const paymentCalls = (api: PaymentApi) => api.calls.filter(call => call.url.startsWith("/api/payment-intents/"));

function controlledApi(initial: WebState["state"] = "READY") {
  const api = new PaymentApi(), original = api.fetch, actions: string[] = [];
  let state = initial;
  api.paymentIntent = intent("awaiting_confirmation", true);
  Object.defineProperty(api, "fetch", { value: async (input: RequestInfo | URL, init?: RequestInit) => {
    if (String(input).endsWith("/controlled-confirmation")) {
      const body = JSON.parse(String(init?.body));
      api.calls.push({ url: String(input), method: init?.method ?? "GET", body });
      actions.push(body.action);
      if (body.action === "confirm") state = "CONFIRMED";
      return json({ paymentId: INTENT_ID, state });
    }
    return original(input, init);
  } });
  return { api, actions, setState(value: WebState["state"]) { state = value; } };
}

async function mountControlled(api: PaymentApi) {
  mounted = await mountPayment({ api, url: `/personal/send?controlled=1&intent=${INTENT_ID}`,
    content: <ProtectedAccountBoundary returnTo="/personal/send"><PersonalSendExperience controlled /></ProtectedAccountBoundary> });
  return mounted;
}

// PaymentIntentWorkspace uses global timers for execution/receipt polling, not
// the harness's window timers. Observe a full 2.5-second polling interval.
async function observePollingInterval() {
  await act(async () => { await new Promise<void>(resolve => setTimeout(resolve, 2700)); });
}

test("controlled recovery: eligible payment retains authentication, explicit consent and truthful pre-execution state", async () => {
  const fixture = controlledApi(), h = await mountControlled(fixture.api);
  assert.match(text(h.renderer.root), /Ready to confirm/);
  assert.match(text(h.renderer.root), /Circle USDC · Solana Devnet/);
  assert.match(text(h.renderer.root), /Execution has not occurred and no funds have moved/);
  assert.equal(buttons(h.renderer, "Continue with authentication").length, 1);
  assert.deepEqual(fixture.actions, ["prepare"]);
  fixture.setState("CONFIRMABLE");
  await click(h.renderer, "Recover confirmation status");
  assert.equal(buttons(h.renderer, "Confirm payment").length, 1);
  assert(!fixture.actions.includes("confirm"), "authentication readiness alone is not consent");
  await click(h.renderer, "Confirm payment");
  assert.match(text(h.renderer.root), /Payment confirmed/);
  assert.match(text(h.renderer.root), /Execution has not occurred and no funds have moved/);
  assert.deepEqual(fixture.actions, ["prepare", "recover", "confirm", "runtime-recover"]);
  assert.deepEqual(paymentCalls(fixture.api).map(c => c.url), [paymentUrl, ...fixture.actions.map(() => `${paymentUrl}/controlled-confirmation`)]);
});

for (const devnet of [true, false]) for (const status of ["processing", "unknown", "completed", "failed"] as const) {
  test(`controlled recovery: ${devnet ? "direct-wallet" : "identity"} ${status} stops at the payment lifecycle boundary`, async () => {
    const fixture = controlledApi(), { api } = fixture;
    api.paymentIntent = intent(status, devnet);
    api.status = status === "completed" ? "settled" : status === "failed" ? "failed" : "pending";
    api.devnetStatus = status === "completed" ? "settled" : status === "failed" ? "failed" : "accepted";
    const h = await mountControlled(api);
    assert.match(text(h.renderer.root), /This payment is no longer eligible for controlled confirmation\./);
    assert.doesNotMatch(text(h.renderer.root), noExecutionCopy);
    assert.equal(buttons(h.renderer, "Continue with authentication").length, 0);
    assert.equal(buttons(h.renderer, "Confirm payment").length, 0);
    assert.equal(buttons(h.renderer, "Recover confirmation status").length, 0);
    if (status === "processing" || status === "unknown") await observePollingInterval();
    assert.deepEqual(fixture.actions, [], "ineligible lifecycle must not prepare a ceremony");
    assert.deepEqual(paymentCalls(api).map(c => ({ url: c.url, method: c.method })), [{ url: paymentUrl, method: "GET" }], "no ordinary execution/receipt reads or polling and no confirmation POST");
  });
}

for (const state of ["AUTHENTICATION_REQUIRED", "SESSION_CHANGED", "EXPIRED", "REVOKED"] as const) {
  test(`controlled recovery: ${state} fails closed and requires a new eligible payment`, async () => {
    const fixture = controlledApi(state), h = await mountControlled(fixture.api);
    assert.match(text(h.renderer.root), newPaymentCopy);
    assert.doesNotMatch(text(h.renderer.root), /retry confirmation/i);
    assert.equal(buttons(h.renderer, "Continue with authentication").length, 0);
    assert.equal(buttons(h.renderer, "Confirm payment").length, 0);
    await click(h.renderer, "Recover confirmation status");
    assert.match(text(h.renderer.root), newPaymentCopy);
    assert.deepEqual(fixture.actions, state === "AUTHENTICATION_REQUIRED" ? ["prepare", "recover"] : ["prepare", "runtime-recover", "recover", "runtime-recover"], "recovery reads history without replacing a ceremony or creating consent or policy decisions");
    assert(!paymentCalls(fixture.api).some(c => /\/confirm$|\/executions?|\/receipt$/.test(c.url)));
  });
}

for (const devnet of [true, false]) {
  test(`ordinary recovery: paired ${devnet ? "direct-wallet" : "identity"} completed payment still reads execution and receipt`, async () => {
    const api = new PaymentApi(); api.paymentIntent = intent("completed", devnet); api.status = "settled"; api.devnetStatus = "settled";
    mounted = await mountPayment({ api, url: `/personal/send?intent=${INTENT_ID}` });
    assert.match(text(mounted.renderer.root), /Your payment is complete and its durable receipt is available/);
    assert.deepEqual(paymentCalls(api).map(c => c.url), [paymentUrl, `${paymentUrl}/${devnet ? "devnet/execution" : "execution"}`, `${paymentUrl}/receipt`]);
    assert(paymentCalls(api).every(c => c.method === "GET"));
    assert.doesNotMatch(text(mounted.renderer.root), noExecutionCopy);
  });

  test(`ordinary recovery: ${devnet ? "direct-wallet" : "identity"} processing still polls and renders authoritative failure`, async () => {
    const api = new PaymentApi(); api.paymentIntent = intent("processing", devnet); api.status = "pending"; api.devnetStatus = "accepted";
    mounted = await mountPayment({ api, url: `/personal/send?intent=${INTENT_ID}` });
    const executionUrl = `${paymentUrl}/${devnet ? "devnet/execution" : "execution"}`;
    assert.equal(api.calls.filter(c => c.url === executionUrl).length, 1);
    api.status = "failed"; api.devnetStatus = "failed";
    await observePollingInterval();
    assert.equal(api.calls.filter(c => c.url === executionUrl).length, 2, "ordinary polling remains active");
    assert.match(text(mounted.renderer.root), devnet ? /Payment did not settle/ : /Payment could not be completed/);
    assert.equal(buttons(mounted.renderer, "Start another payment").length, 1);
    assert(paymentCalls(api).every(c => c.method === "GET"));
    assert(!api.calls.some(c => c.url.endsWith("/receipt")));
  });
}
