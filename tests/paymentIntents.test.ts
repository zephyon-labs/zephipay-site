import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

import { parsePaymentIntentResponse } from "../src/lib/paymentIntents/contract";
import { hasTrustedOrigin } from "../src/lib/paymentIntents/origin";
import { parseConfirmInput, parseCreateInput, paymentIntentRequestFromRecipient, validIdempotencyKey } from "../src/lib/paymentIntents/requests";
import { normalizePaymentError } from "../src/lib/paymentIntents/errors";

const id = "00000000-0000-4000-8000-000000000001";
const hash = "a".repeat(64);
const recipient = "11111111111111111111111111111111";

function payload(status: "awaiting_confirmation" | "processing", extra: Record<string, unknown> = {}) {
  return { ok: true, paymentIntent: { id, status, version: "900719925474099312345", requestHash: hash,
    recipient, amountRaw: "9223372036854775807", amount: "9223372036854.775807", asset: "USDC",
    network: "solana-devnet", purpose: "Dinner", createdAt: "2026-08-03T12:00:00.000Z", ...extra } };
}

describe("payment intent response validation", () => {
  it("accepts the exact awaiting_confirmation and processing contracts", () => {
    assert.equal(parsePaymentIntentResponse(payload("awaiting_confirmation"))?.paymentIntent.status, "awaiting_confirmation");
    assert.equal(parsePaymentIntentResponse({ ...payload("processing"), applied: true })?.applied, true);
  });

  it("preserves bigint-like fields as strings and ignores unexposed evidence", () => {
    const parsed = parsePaymentIntentResponse(payload("processing", { executionStartedAt: "secret", internalEvidence: { token: "no" } }));
    assert.equal(parsed?.paymentIntent.version, "900719925474099312345");
    assert.equal(parsed?.paymentIntent.amountRaw, "9223372036854775807");
    assert.equal("internalEvidence" in (parsed?.paymentIntent ?? {}), false);
  });

  it("rejects malformed UUID, hash, version, status, dates, and applied", () => {
    for (const malformed of [
      payload("processing", { id: "bad" }), payload("processing", { requestHash: "A".repeat(64) }),
      payload("processing", { version: "01" }), payload("processing", { status: "PROCESSING" }),
      payload("processing", { createdAt: "today" }), { ...payload("processing"), applied: "yes" },
    ]) assert.equal(parsePaymentIntentResponse(malformed), undefined);
  });
});

describe("browser request validation and CSRF", () => {
  it("accepts only bounded create, confirm, and idempotency inputs", () => {
    assert.deepEqual(parseCreateInput({ recipient, amount: "1.000001", purpose: " Dinner " }), { recipient, amount: "1.000001", purpose: "Dinner" });
    assert.equal(parseCreateInput({ recipient, amount: "1", purpose: "x", actorSubject: "forged" }), undefined);
    assert.deepEqual(parseConfirmInput({ requestHash: hash, expectedVersion: "0" }), { requestHash: hash, expectedVersion: "0" });
    assert.equal(parseConfirmInput({ requestHash: hash, expectedVersion: "0", amount: "2" }), undefined);
    assert.equal(validIdempotencyKey("intent_1234567890abcdef"), true);
    assert.equal(validIdempotencyKey("short"), false);
  });

  it("keeps human-readable recipients out of the unchanged backend request contract", () => {
    assert.deepEqual(paymentIntentRequestFromRecipient({ recipientInput: recipient, walletFallback: "", amount: "1", purpose: "Dinner" }), {
      recipient, amount: "1", purpose: "Dinner",
    });
    assert.equal(paymentIntentRequestFromRecipient({ recipientInput: "Alex @zephipay", walletFallback: "", amount: "1", purpose: "Dinner" }), undefined);
    assert.deepEqual(paymentIntentRequestFromRecipient({ recipientInput: "alex@example.com", walletFallback: recipient, amount: "1", purpose: "Dinner" }), {
      recipient, amount: "1", purpose: "Dinner",
    });
    assert.deepEqual(Object.keys(paymentIntentRequestFromRecipient({ recipientInput: "Alex", walletFallback: recipient, amount: "1", purpose: "Dinner" }) ?? {}).sort(), ["amount", "purpose", "recipient"]);
  });

  it("accepts trusted origins and rejects mismatches", () => {
    const trusted = new Request("https://zephipay.test/api/payment-intents", { headers: { Origin: "https://zephipay.test" } });
    const mismatch = new Request("https://zephipay.test/api/payment-intents", { headers: { Origin: "https://evil.test" } });
    assert.equal(hasTrustedOrigin(trusted), true);
    assert.equal(hasTrustedOrigin(mismatch), false);
  });
});

describe("BFF and UI security invariants", () => {
  it("keeps tokens server-only with the payment audience/scopes and bounded upstream behavior", async () => {
    const client = await source("src/lib/paymentIntents/serverClient.ts");
    const auth = await source("src/lib/auth0.ts");
    assert.match(client, /import "server-only"/);
    assert.match(client, /getSession\(\)/);
    assert.match(client, /getAccessToken\(\{ audience, scope: paymentScopes \}\)/);
    assert.match(client, /Authorization: `Bearer \$\{token\}`/);
    assert.match(client, /AbortSignal\.timeout\(5_000\)/);
    assert.match(client, /cache: "no-store"/);
    assert.match(auth, /read:payments write:payments/);
    assert.doesNotMatch(client, /token[^\n]*body/);
  });

  it("preserves safe meaningful upstream statuses and normalizes unknown failures", () => {
    for (const status of [400, 401, 403, 404, 409, 503]) assert.equal(normalizePaymentError(status).status, status);
    assert.deepEqual(normalizePaymentError(500), { status: 502, body: { ok: false, error: "Payment service is temporarily unavailable." } });
    assert.equal(normalizePaymentError(403).body.error, "Test payment access has not been activated for this account.");
  });

  it("forwards authenticated create/read/confirm/execute/receipt/activity calls", async () => {
    const create = await source("src/app/api/payment-intents/route.ts");
    const read = await source("src/app/api/payment-intents/[id]/route.ts");
    const confirm = await source("src/app/api/payment-intents/[id]/confirm/route.ts");
    const execute = await source("src/app/api/payment-intents/[id]/execute/route.ts");
    const execution = await source("src/app/api/payment-intents/[id]/execution/route.ts");
    const receipt = await source("src/app/api/payment-intents/[id]/receipt/route.ts");
    const activity = await source("src/app/api/activity/route.ts");
    const client = await source("src/lib/paymentIntents/serverClient.ts");
    assert.match(create, /idempotencyKey/); assert.match(create, /x-request-id/); assert.match(create, /hasTrustedOrigin/);
    assert.match(read, /validPaymentIntentId/); assert.match(confirm, /parseConfirmInput/); assert.match(confirm, /hasTrustedOrigin/);
    assert.match(client, /normalizePaymentError\(response\.status\)/);
    assert.match(execute,/parseConfirmInput/);assert.match(execute,/hasTrustedOrigin/);assert.match(execution,/callExecutionApi/);assert.match(receipt,/callExecutionApi/);assert.match(activity,/limit/);
    assert.doesNotMatch([create, read, confirm, execute, execution, receipt, activity, client].join("\n"), /api\/send|providerIdempotencyKey|selectedRail/);
  });

  it("uses authoritative review/confirm values, honest language, URL recovery, and double-submit protection", async () => {
    const ui = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
    assert.match(ui, /requestHash:intent\.requestHash,expectedVersion:intent\.version/);
    assert.match(ui, /requestHash:confirmed\.requestHash,expectedVersion:confirmed\.version/);
    assert.match(ui, /\/execute/);assert.match(ui,/\[200,202\]/);assert.match(ui,/Confirm payment/);
    assert.match(ui, /if\(busy\)return/);
    assert.match(ui, /creationKey\.current\?\?=crypto\.randomUUID\(\)/);
    assert.match(ui, /\/personal\/send\?intent=/);
    assert.match(ui, /router\.replace\("\/personal\/send"\)/);
    assert.match(ui, /RecipientExperience/);
    assert.match(ui, /Advanced options · Send by wallet address/);
    assert.match(ui, /simulated Mock Rail beta/);
    assert.match(ui, /JSON\.stringify\(body\)/);
    assert.match(ui,/AbortController/);assert.match(ui,/polling\.current/);assert.match(ui,/clearTimeout/);assert.match(ui,/Payment status is still being confirmed/);
    assert.doesNotMatch(ui, /beta\.zephipay\.com|location\.(?:assign|replace)/);
    assert.doesNotMatch(ui, /placeholder wallet|default wallet/i);
    assert.doesNotMatch(ui, /localStorage|sessionStorage|\/api\/send|selectedRail|providerIdempotencyKey/);
  });

  it("shows generic beta denial and supports idempotent confirmation payloads", async () => {
    const errors = await source("src/lib/paymentIntents/errors.ts");
    const contract = parsePaymentIntentResponse({ ...payload("processing"), applied: false });
    assert.equal(contract?.applied, false);
    assert.match(errors, /Test payment access has not been activated for this account\./);
  });
});

async function source(path: string) { return readFile(new URL(`../${path}`, import.meta.url), "utf8"); }
