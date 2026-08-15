import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

describe("in-place Personal payment flow", () => {
  it("uses one canonical state machine in PersonalWorkspace", async () => {
    const personal = await source("src/components/marketing/personal-workspace/PersonalWorkspace.tsx");
    assert.match(personal, /<PaymentIntentWorkspace inPlace recoveryId=\{recoveryId\} \/>/);
    assert.doesNotMatch(personal, /fetch\(|\/api\/send|selectedRail|providerIdempotencyKey/);
    assert.doesNotMatch(personal, /router\.(?:push|replace)\("\/personal\/send/);
  });

  it("keeps compose mounted through review so Back restores entered values", async () => {
    const flow = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
    assert.match(flow, /className=\{intent\|\|devnetDraft\?"hidden":undefined\}>\{compose\}/);
    assert.match(flow, /function backToCompose\(\)\{setIntent\(undefined\)/);
    assert.doesNotMatch(flow, /function backToCompose[^}]*setResetKey/);
    assert.match(flow, /<PaymentComposeForm key=\{resetKey\}/);
  });

  it("does not navigate the in-place flow during review or execution", async () => {
    const flow = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
    assert.match(flow, /window\.history\.replaceState\(null,"",`\/personal\?intent=/);
    assert.match(flow, /else router\.replace\(`\/personal\/send\?intent=/);
    assert.doesNotMatch(flow, /AdvancedWallet|onIntent=/);
  });

  it("preserves backend-authoritative recipient resolution and trust", async () => {
    const recipient = await source("src/components/product/personal/PaymentComposeForm.tsx");
    assert.match(recipient, /\/api\/recipients\/search/);
    assert.match(recipient, /\/api\/recipients\/\$\{encodeURIComponent\(found\.recipients\[0\]\.accountId\)\}/);
    assert.match(recipient, /trustModeForRecipient\(recipient\)/);
    assert.match(recipient, /trustAcknowledged/);
    assert.doesNotMatch(recipient, /localStorage|sessionStorage/);
  });

  it("uses Review payment without execution, then one Send payment decision", async () => {
    const flow = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
    const recipient = await source("src/components/product/personal/PaymentComposeForm.tsx");
    assert.match(recipient, /"Review payment"\s*:\s*"Review request"/);
    assert.equal((flow.match(/>Send payment<\/Button>/g) ?? []).length, 1);
    assert.doesNotMatch(`${flow}\n${recipient}`, />Confirm payment<\/Button>|Review and Send/);
    assert.match(flow, /onClick=\{confirmAndExecute\}[^>]*>Send payment/);
  });

  it("reuses canonical execution, polling, receipt, and activity behavior", async () => {
    const flow = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
    assert.match(flow, /\/confirm/);
    assert.match(flow, /\/execute/);
    assert.match(flow, /setTimeout\(poll,2500\)/);
    assert.match(flow, /setTimeout\(poll,4000\)/);
    assert.match(flow, /if\(polling\.current\)return/);
    assert.match(flow, /\/receipt/);
    assert.match(flow, /zephipay:activity-refresh/);
    assert.doesNotMatch(flow, /\/api\/send|selectedRail|providerIdempotencyKey/);
  });

  it("keeps Purpose optional and conditional in review and receipt", async () => {
    const flow = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
    const recipient = await source("src/components/product/personal/PaymentComposeForm.tsx");
    assert.match(recipient, /Purpose \(optional\)/);
    assert.match(recipient, /purpose:\s*cleanPurpose\s*\|\|\s*null/);
    assert.match(flow, /intent\.purpose\?\[\["Purpose",intent\.purpose\]/);
    assert.match(flow, /receipt\.memo\?<p/);
  });

  it("preserves authenticated direct-entry recovery and protects the public workspace", async () => {
    const page = await source("src/app/personal/page.tsx");
    const direct = await source("src/app/personal/send/page.tsx");
    const personal = await source("src/components/marketing/personal-workspace/PersonalWorkspace.tsx");
    assert.match(page, /authConfigured\(\) && Boolean\(await getAuth0\(\)\.getSession\(\)\)/);
    assert.match(page, /isPaymentIntentId\(rawIntent\)/);
    assert.match(page, /<PersonalWorkspace authenticated=\{authenticated\} recoveryId=\{recoveryId\} \/>/);
    assert.match(personal, /\/auth\/login\?returnTo=%2Fpersonal%23personal-workspace/);
    assert.match(direct, /isPaymentIntentId/);
    assert.match(direct, /<PersonalSendExperience recoveryId=\{recoveryId\} \/>/);
  });
});

async function source(path: string) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}
