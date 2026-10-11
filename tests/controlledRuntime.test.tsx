import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { generateKeyPairSync, randomUUID, sign } from "node:crypto";
import { act, create, type ReactTestRenderer } from "react-test-renderer";
import type { SessionData } from "@auth0/nextjs-auth0/types";
import { ControlledConfirmation } from "../src/components/product/personal/ControlledConfirmation";
import { ControlledRuntime } from "../src/components/product/personal/ControlledRuntime";
import { authenticatedRequests } from "../src/lib/auth/authenticatedRequests";
import { validateRuntimeResult, type ControlledRuntimeResult } from "../src/lib/controlledConfirmation/runtimeContract";
import { controlledRouteAction } from "../src/lib/controlledConfirmation/routeAction";
import { sendControlledRequest } from "../src/lib/controlledConfirmation/transport";
import { signWebRequest, verifyRuntimeResponse, verifyWebRequest, webDigest, type Handoff } from "../src/lib/controlledConfirmation/handoffContract";
import { toWebSession, withWebSessionReference } from "../src/lib/controlledConfirmation/session";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
const paymentId = "11111111-1111-4111-8111-111111111111";
const originalFetch = globalThis.fetch;
let view: ReactTestRenderer | undefined;
afterEach(async () => { if (view) await act(async () => view!.unmount()); view = undefined; globalThis.fetch = originalFetch; authenticatedRequests.invalidate(); });
const flush = async () => { for (let i = 0; i < 30; i++) await Promise.resolve(); };
const text = () => JSON.stringify(view!.toJSON());
const button = (name: string) => view!.root.findAllByType("button").find(b => b.findAllByType("span").some(s => s.props.children === name));
const click = async (name: string) => { await act(async () => { button(name)!.props.onClick(); await flush(); }); };
async function mount(runtime = false, confirmed = true) {
  await act(async () => { view = create(runtime ? <ControlledRuntime paymentId={paymentId} confirmed={confirmed}/> : <ControlledConfirmation paymentId={paymentId} eligible/>); await flush(); });
}
function result(state: ControlledRuntimeResult["state"] = "NOT_EVALUATED"): ControlledRuntimeResult {
  return { paymentId, state, mode: "non-value", productionReady: false, executionAuthorized: false,
    historicalStatus: state === "NOT_EVALUATED" ? "NONE" : state === "REJECTED" ? "REJECTED" : "APPROVED",
    currentApproval: state === "APPROVED", decisionId: state === "NOT_EVALUATED" ? null : "decision:original",
    expiresAt: state === "NOT_EVALUATED" ? null : new Date(Date.now() + 120000).toISOString() };
}
function session(): SessionData {
  return withWebSessionReference({ user: { sub: "auth0|alice" }, tokenSet: { accessToken: "offline-access", idToken: "offline-id", expiresAt: Math.floor(Date.now()/1000)+300 }, internal: { sid: "offline", createdAt: Math.floor(Date.now()/1000) } });
}

test("Runtime UI: confirmation and callback readiness never implicitly evaluate; explicit click, duplicate and lost response recover", async () => {
  const actions: string[] = []; let confirmed = false, stored = result(), finish: ((r: Response) => void) | undefined;
  globalThis.fetch = async (_url, init) => {
    const { action } = JSON.parse(String(init?.body)); actions.push(action);
    if (action === "confirm") confirmed = true;
    if (action === "runtime-evaluate") { assert(confirmed); stored = result("APPROVED"); return new Promise(resolve => { finish = resolve; }); }
    return Response.json(action === "runtime-recover" ? stored : { paymentId, state: confirmed ? "CONFIRMED" : "CONFIRMABLE" });
  };
  await mount(); assert.deepEqual(actions, ["prepare"]); assert.equal(button("Check payment policy"), undefined);
  await click("Confirm payment"); assert.match(text(), /Payment confirmed/);
  assert.deepEqual(actions, ["prepare", "confirm", "runtime-recover"]);
  const evaluate = button("Check payment policy")!;
  await act(async () => { evaluate.props.onClick(); evaluate.props.onClick(); await flush(); });
  assert.equal(actions.filter(a => a === "runtime-evaluate").length, 1);
  assert.match(text(), /Checking payment policy/); assert.doesNotMatch(text(), /Approved to continue/);
  await act(async () => { finish!(Response.json({ error: "private diagnostic must not render" }, { status: 503 })); await flush(); });
  assert.match(text(), /Policy status unavailable/); assert.doesNotMatch(text(), /private diagnostic|Approved to continue/);
  await click("Recover policy status"); assert.match(text(), /Approved to continue/);
  assert.match(text(), /next execution-preparation stage/); assert.match(text(), /no funds have moved/);
  assert.doesNotMatch(text(), /Sent|Paid|Settled|Completed|Transaction authorized/);
  await act(async () => view!.unmount()); view = undefined;
  await mount(); assert.match(text(), /Approved to continue/);
  assert.equal(actions.filter(a => a === "runtime-evaluate").length, 1, "reload only recovers");
  assert.equal(stored.decisionId, "decision:original");
});

for (const [state, label] of [["REJECTED", "Unable to proceed"], ["EXPIRED", "Policy approval expired"],
  ["NO_LONGER_CURRENT", "Policy approval no longer current"], ["UNAVAILABLE", "Policy status unavailable"]] as const) {
  test(`Runtime UI: ${state} does not display historical approval as current`, async () => {
    const actions: string[] = [];
    globalThis.fetch = async (_url, init) => { actions.push(JSON.parse(String(init?.body)).action); return Response.json(result(state)); };
    await mount(true); assert.match(text(), new RegExp(label)); assert.doesNotMatch(text(), /Approved to continue/);
    assert.equal(button("Check payment policy"), undefined);
    if (state !== "REJECTED") assert.match(text(), /An earlier approval is recorded/);
    else assert.match(text(), /did not meet payment policy requirements/);
    await click("Recover policy status"); assert.deepEqual(actions, ["runtime-recover", "runtime-recover"]);
  });
}

test("Runtime UI: revoked confirmation session can recover history without regaining consent or approval", async () => {
  const actions: string[] = [];
  globalThis.fetch = async (_url, init) => {
    const action = JSON.parse(String(init?.body)).action; actions.push(action);
    return action === "runtime-recover" ? Response.json(result("NO_LONGER_CURRENT")) : Response.json({ error: "revoked" }, { status: 409 });
  };
  await mount(); assert.deepEqual(actions, ["prepare", "runtime-recover"]);
  assert.match(text(), /An earlier approval is recorded/); assert.doesNotMatch(text(), /Approved to continue/);
  assert.equal(button("Check payment policy"), undefined); assert.equal(button("Confirm payment"), undefined);
});

test("Runtime UI: NOT_EVALUATED recovery requires confirmed context and never silently evaluates", async () => {
  const actions: string[] = [];
  globalThis.fetch = async (_url, init) => { actions.push(JSON.parse(String(init?.body)).action); return Response.json(result()); };
  await mount(true, false); assert.deepEqual(actions, ["runtime-recover"]); assert.equal(button("Check payment policy"), undefined);
  await click("Recover policy status"); assert.deepEqual(actions, ["runtime-recover", "runtime-recover"]);
});

test("Runtime UI: obsolete session response and malformed current approval fail closed", async () => {
  let finish: ((r: Response) => void) | undefined;
  globalThis.fetch = async () => new Promise(resolve => { finish = resolve; });
  await mount(true); authenticatedRequests.invalidate();
  await act(async () => { finish!(Response.json(result("APPROVED"))); await flush(); });
  assert.doesNotMatch(text(), /Approved to continue/);
  globalThis.fetch = async () => Response.json({ ...result("APPROVED"), currentApproval: false });
  await click("Recover policy status"); assert.match(text(), /Policy status unavailable/); assert.doesNotMatch(text(), /Approved to continue/);
});

test("Runtime UI: focus, hidden page and persisted restoration remove stale approval and recover only", async () => {
  const oldWindow = globalThis.window, oldDocument = globalThis.document;
  const events = new EventTarget(), doc = new EventTarget();
  Object.defineProperty(globalThis, "window", { configurable: true, value: events });
  Object.defineProperty(globalThis, "document", { configurable: true, value: doc });
  Object.defineProperty(doc, "visibilityState", { configurable: true, value: "visible" });
  const actions: string[] = []; let current = result("APPROVED");
  globalThis.fetch = async (_url, init) => { actions.push(JSON.parse(String(init?.body)).action); return Response.json(current); };
  try {
    await mount(true); assert.match(text(), /Approved to continue/);
    await act(async () => { events.dispatchEvent(new Event("pagehide")); await flush(); });
    assert.doesNotMatch(text(), /Approved to continue/);
    current = result("NO_LONGER_CURRENT"); const event = new Event("pageshow"); Object.defineProperty(event, "persisted", { value: true });
    await act(async () => { events.dispatchEvent(event); await flush(); });
    assert.match(text(), /Policy approval no longer current/);
    await act(async () => { events.dispatchEvent(new Event("focus")); await flush(); });
    assert(actions.every(a => a === "runtime-recover")); assert.equal(actions.length, 3);
    await act(async () => view!.unmount()); view = undefined;
  } finally {
    Object.defineProperty(globalThis, "window", { configurable: true, value: oldWindow });
    Object.defineProperty(globalThis, "document", { configurable: true, value: oldDocument });
  }
});

test("Runtime UI: approval expiry clears the claim and asks Backend for authoritative expiry", async t => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: Date.parse("2026-10-10T12:00:00.000Z") });
  let calls = 0;
  globalThis.fetch = async () => Response.json(++calls === 1 ? { ...result("APPROVED"), expiresAt: new Date(Date.now()+60).toISOString() } : result("EXPIRED"));
  await mount(true); assert.match(text(), /Approved to continue/);
  await act(async () => { t.mock.timers.tick(100); await flush(); });
  assert.equal(calls, 2); assert.match(text(), /Policy approval expired/); assert.doesNotMatch(text(), /Approved to continue/);
});

test("Runtime wire: exact schema forbids authority, evidence, contradictory state and unsupported fields", () => {
  for (const state of ["NOT_EVALUATED", "APPROVED", "REJECTED", "EXPIRED", "NO_LONGER_CURRENT", "UNAVAILABLE"] as const) { const value = result(state); assert.deepEqual(validateRuntimeResult(value), value); }
  for (const change of [{ currentApproval: false }, { historicalStatus: "REJECTED" }, { executionAuthorized: true }, { productionReady: true },
    { policy: "private" }, { evidence: {} }, { reason: "private" }, { decisionId: "<script>" }, { expiresAt: "forever" }]) {
    assert.throws(() => validateRuntimeResult({ ...result("APPROVED"), ...change }));
  }
});

test("Runtime BFF: authenticated, origin-checked, gated, minimal reference and bounded error only", async () => {
  const current = session(), calls: unknown[] = [];
  const ports = { enabled: true, trustedOrigin: (r: Request) => r.headers.get("origin") === "https://site.test", session: async () => current,
    call: async () => { throw new Error("Must not use confirmation or legacy fallback"); },
    runtime: async (action: string, body: unknown) => { calls.push({ action, body }); return result(); } };
  const req = (body: unknown = { action: "runtime-recover" }, origin = "https://site.test") => new Request("https://site.test/api", { method: "POST", headers: { origin }, body: JSON.stringify(body) });
  for (const action of ["runtime-evaluate", "runtime-recover"]) {
    const response = await controlledRouteAction(req({ action }), paymentId, ports);
    assert.equal(response.status, 200); assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.deepEqual(calls.at(-1), { action, body: { paymentId, session: toWebSession(current) } });
  }
  calls.length = 0;
  for (const field of ["policy", "evidence", "envelopeDigest", "amount", "asset", "destination", "evaluatedAt", "state", "currentApproval", "session", "paymentId"])
    assert.equal((await controlledRouteAction(req({ action: "runtime-evaluate", [field]: "forged" }), paymentId, ports)).status, 409);
  assert.equal((await controlledRouteAction(req(), paymentId, { ...ports, enabled: false })).status, 404);
  assert.equal((await controlledRouteAction(req(), paymentId, { ...ports, runtime: undefined })).status, 404);
  assert.equal((await controlledRouteAction(req(), paymentId, { ...ports, session: async () => null })).status, 401);
  assert.equal((await controlledRouteAction(req({}, "https://foreign.test"), paymentId, ports)).status, 403);
  assert.equal((await controlledRouteAction(new Request("https://site.test/api"), paymentId, ports)).status, 405);
  assert.equal(calls.length, 0);
  const failure = await controlledRouteAction(req(), paymentId, { ...ports, runtime: async () => { throw new Error("secret policy evidence"); } });
  assert.equal(failure.status, 409); assert.doesNotMatch(await failure.text(), /secret|evidence/);
  assert.equal((await controlledRouteAction(req(), paymentId, { ...ports, runtime: async () => ({ ...result(), paymentId: randomUUID() }) })).status, 409);
});

test("Runtime signed transport: pinned keys, exact action/payment/request binding and fresh retry identity", async () => {
  const site = generateKeyPairSync("ed25519"), backend = generateKeyPairSync("ed25519");
  const context = { environment: "TEST", configuration: "a".repeat(64), siteOrigin: "https://site.test", backendOrigin: "https://backend.test", clientId: "test", issuer: "https://issuer.test/" };
  const body = { paymentId, session: toWebSession(session()) }, requests: Handoff[] = [];
  const seal = (value: unknown) => { const payload = JSON.stringify(value); return { payload, signature: sign(null, Buffer.from(payload), backend.privateKey).toString("base64url") }; };
  const respond = (request: Handoff, value: unknown = result("APPROVED")) => seal({ type: "zephipay-controlled-runtime-response-v1", requestDigest: webDigest(request.payload), state: value });
  const transport = { context, siteKey: site.privateKey, backendKey: backend.publicKey, fetch: (async (url, init) => {
    assert.equal(String(url), context.backendOrigin + "/internal/controlled-confirmation/runtime-recover");
    assert.equal(init?.cache, "no-store"); assert.equal(init?.redirect, "error");
    const request = JSON.parse(String(init?.body)); requests.push(request);
    assert.deepEqual(verifyWebRequest(request, context, "runtime-recover", site.publicKey, Date.now()/1000).body, body);
    return Response.json(respond(request));
  }) as typeof fetch };
  const first = await sendControlledRequest("runtime-recover", body, transport);
  const second = await sendControlledRequest("runtime-recover", body, transport);
  assert.equal(first.decisionId, second.decisionId); assert.notEqual(requests[0].payload, requests[1].payload);
  assert.throws(() => verifyRuntimeResponse(requests[1], respond(requests[0]), backend.publicKey));
  assert.throws(() => verifyRuntimeResponse(requests[0], respond(requests[0]), site.publicKey));
  assert.throws(() => verifyRuntimeResponse(requests[0], respond(requests[0], { ...first, paymentId: randomUUID() }), backend.publicKey));
  const ordinary = signWebRequest(context, "confirm", body, site.privateKey);
  assert.throws(() => verifyRuntimeResponse(ordinary, respond(ordinary), backend.publicKey));
  const expired = { ...requests[0], payload: JSON.stringify({ ...JSON.parse(requests[0].payload), expiresAt: 0 }) };
  assert.throws(() => verifyRuntimeResponse(expired, respond(expired), backend.publicKey));
});
