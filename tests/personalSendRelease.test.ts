import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

import { receiptReferenceCode } from "../src/lib/paymentIntents/receiptReference";

describe("Personal Send open-beta presentation", () => {
  it("uses a deterministic display reference without replacing canonical IDs", async () => {
    const receiptId = "receipt:canonical-authoritative-id";
    const reference = receiptReferenceCode(receiptId);
    assert.equal(reference, receiptReferenceCode(receiptId));
    assert.match(reference, /^ZP-[0-9A-HJKMNP-TV-Z]{10}$/);
    assert.notEqual(reference, receiptId);

    const workspace = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
    assert.match(workspace, /Reference code/);
    assert.match(workspace, /receiptReferenceCode\(receipt\.receiptId\)/);
    assert.match(workspace, /Canonical receipt ID",receipt\.receiptId/);
    assert.match(workspace, /Execution ID",receipt\.executionId/);
  });

  it("renders settled success language, optional purpose, and primary actions", async () => {
    const workspace = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
    assert.match(workspace, /title="Payment sent"/);
    assert.match(workspace, /"Sending payment"/);
    assert.match(workspace, /"Confirming payment"/);
    assert.doesNotMatch(workspace, /Payment queued|Payment settled/);
    assert.match(workspace, /receipt\.memo\?<p/);
    assert.match(workspace, />Send another payment</);
    assert.match(workspace, />Personal Home</);
    assert.match(workspace, />View activity</);
  });

  it("bypasses acknowledgement only for synthetic beta recipients", async () => {
    const compose = await source("src/components/product/personal/PaymentComposeForm.tsx");
    const trust = await source("src/lib/recipients/recipientState.ts");
    assert.match(compose, /trustModeForRecipient\(recipient\)/);
    assert.match(compose, /identitySource === "synthetic_beta" \? "Beta · Unverified"/);
    assert.match(trust, /recipient\.identitySource === "synthetic_beta"/);
    assert.match(trust, /return trustModeFor\(recipient\.verificationState\)/);
    assert.match(compose, /mode === "confirmation_required" && !trustAcknowledged/);
  });

  it("recovers settled execution through its durable backend receipt and keeps legacy send absent", async () => {
    const workspace = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
    const executable = await Promise.all([
      source("src/components/product/personal/PaymentIntentWorkspace.tsx"),
      source("src/components/product/personal/PaymentComposeForm.tsx"),
      source("src/lib/paymentIntents/backendProxy.ts"),
    ]);
    assert.match(workspace, /if\(parsed\.status==="settled"\)await readReceipt\(id,signal\)/);
    assert.match(workspace, /execution\?\.status!=="settled"\|\|receipt/);
    assert.doesNotMatch(executable.join("\n"), /\/api\/send/);
  });
});

async function source(path: string) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}
