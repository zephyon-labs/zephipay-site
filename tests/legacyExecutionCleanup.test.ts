import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { access } from "node:fs/promises";
import { describe, it } from "node:test";

describe("legacy Personal workspace execution cleanup", () => {
  it("embeds the canonical payment flow in the authenticated Personal workspace", async () => {
    const workspace = await source("src/components/marketing/personal-workspace/PersonalWorkspace.tsx");
    assert.match(workspace, /<PaymentIntentWorkspace inPlace recoveryId=\{recoveryId\} \/>/);
    assert.doesNotMatch(workspace, /validateSendPayment|router\.push\("\/personal\/send"\)/);
    assert.match(workspace, /Sign in before entering payment details/);
  });

  it("contains no active legacy send call or client-selected execution authority", async () => {
    const workspace = await source("src/components/marketing/personal-workspace/PersonalWorkspace.tsx");
    const canonical = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
    assert.doesNotMatch(workspace, /sendPayment|\/api\/send|executePayment|selectedRail|providerIdempotencyKey/);
    assert.match(canonical, /\/confirm/);
    assert.match(canonical, /\/execute/);
    assert.match(canonical, /\/execution/);
    assert.match(canonical, /\/receipt/);
    assert.doesNotMatch(canonical, /\/api\/send|selectedRail|providerIdempotencyKey/);
  });

  it("removes the obsolete browser-direct legacy client", async () => {
    await assert.rejects(access(new URL("../src/lib/zephipay/client.ts", import.meta.url)));
  });

  it("preserves Auth0 enforcement at the canonical handoff destination", async () => {
    const page = await source("src/app/personal/send/page.tsx");
    assert.match(page, /getAuth0\(\)\.getSession\(\)/);
    assert.match(page, /redirect\("\/auth\/login\?returnTo=%2Fpersonal%2Fsend"\)/);
  });
});

async function source(path: string) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}
