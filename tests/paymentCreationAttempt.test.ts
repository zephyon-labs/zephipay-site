import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { creationAttemptFor, paymentCreationFingerprint } from "../src/lib/paymentIntents/creationAttempt";

const base = { recipientAccountId: "account-1", amount: "12.50", purpose: "Dinner", trustAcknowledged: false } as const;

describe("payment creation attempts", () => {
  it("reuses one key only for an identical canonical attempt", () => {
    let generated = 0;
    const createKey = () => `key-${++generated}`;
    const fingerprint = paymentCreationFingerprint(base);
    const first = creationAttemptFor(undefined, fingerprint, createKey);
    const retry = creationAttemptFor(first, paymentCreationFingerprint({ ...base }), createKey);
    assert.strictEqual(retry, first);
    assert.equal(generated, 1);
  });

  it("generates a new key when any payment or trust input changes", () => {
    const first = creationAttemptFor(undefined, paymentCreationFingerprint(base), () => "key-1");
    const changes = [
      { ...base, recipientAccountId: "account-2" },
      { ...base, amount: "12.51" },
      { ...base, purpose: "Lunch" },
      { ...base, trustAcknowledged: true },
    ];
    for (const [index, change] of changes.entries()) {
      const next = creationAttemptFor(first, paymentCreationFingerprint(change), () => `key-${index + 2}`);
      assert.notEqual(next.idempotencyKey, first.idempotencyKey);
    }
  });

  it("starts with a fresh key after the attempt is cleared", () => {
    const fingerprint = paymentCreationFingerprint(base);
    const first = creationAttemptFor(undefined, fingerprint, () => "key-1");
    const reset = creationAttemptFor(undefined, fingerprint, () => "key-2");
    assert.notEqual(reset.idempotencyKey, first.idempotencyKey);
  });

  it("guards rapid mutations and resolves execution conflicts by reading authority", async () => {
    const source = await readFile(new URL("../src/components/product/personal/PaymentIntentWorkspace.tsx", import.meta.url), "utf8");
    assert.match(source, /if\(mutationInFlight\.current\)return/);
    assert.match(source, /if\(!intent\|\|mutationInFlight\.current\)return/);
    assert.match(source, /if\(response\.status===409\)\{await readExecution\(confirmed\.id\);return\}/);
    assert.match(source, /function startAnother\(\)\{creationAttempt\.current=undefined/);
    assert.equal((source.match(/\/execute`,\{method:"POST"/g) ?? []).length, 1);
  });
});
