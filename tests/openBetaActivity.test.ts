import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

import { formatMockUsdc, parseOpenBetaActivityResponse } from "../src/lib/openBetaActivity/contract";

const valid = {
  ok: true,
  data: {
    scope: "open_beta", rail: "mock", settlement: "simulated", generatedAt: "2026-08-09T07:00:00.000Z",
    betaTesters: 2, paymentsCompleted: 3, mockUsdcProcessed: { amountRaw: "1250000", decimals: 6 }, durableReceipts: 3,
    paymentCompletionRate: { completed: 3, initiated: 4, basisPoints: 7500 },
    devnetQa: { totalLiveRuns: 1, passed: 1, failed: 0, latestResult: "PASSED", latestActorFlow: "H2H", latestCanonicalPaymentFlow: "P2P", invariantViolationCount: 0, latestDurationMs: 11104, latestAt: "2026-08-16T05:20:52.000Z" },
  },
};

describe("Open Beta activity public contract", () => {
  it("accepts the exact aggregate contract and preserves large integer amounts", () => {
    assert.deepEqual(parseOpenBetaActivityResponse(valid), valid.data);
    assert.equal(formatMockUsdc("0"), "0.00");
    assert.equal(formatMockUsdc("1250000"), "1.25");
    assert.equal(formatMockUsdc("900719925474099312345"), "900,719,925,474,099.312345");
  });

  it("rejects malformed, inconsistent, and privacy-bearing projections", () => {
    assert.equal(parseOpenBetaActivityResponse({ ...valid, data: { ...valid.data, actorSubject: "private" } }), undefined);
    assert.equal(parseOpenBetaActivityResponse({ ...valid, data: { ...valid.data, mockUsdcProcessed: { amountRaw: "1.5", decimals: 6 } } }), undefined);
    assert.equal(parseOpenBetaActivityResponse({ ...valid, data: { ...valid.data, paymentCompletionRate: { completed: 3, initiated: 4, basisPoints: 9999 } } }), undefined);
    assert.equal(parseOpenBetaActivityResponse({ ...valid, data: { ...valid.data, paymentCompletionRate: { completed: 0, initiated: 0, basisPoints: 0 } } }), undefined);
    assert.equal(parseOpenBetaActivityResponse({ ...valid, data: { ...valid.data, devnetQa: { ...valid.data.devnetQa, passed: 2 } } }), undefined);
  });

  it("accepts a zero-run QA state and remains compatible when QA telemetry is unavailable", () => {
    const { devnetQa, ...legacy } = valid.data; assert.ok(devnetQa);
    assert.deepEqual(parseOpenBetaActivityResponse({ ok: true, data: legacy }), legacy);
    const zero = { totalLiveRuns: 0, passed: 0, failed: 0, latestResult: null, latestActorFlow: null, latestCanonicalPaymentFlow: null, invariantViolationCount: 0, latestDurationMs: null, latestAt: null };
    assert.deepEqual(parseOpenBetaActivityResponse({ ok: true, data: { ...legacy, devnetQa: zero } })?.devnetQa, zero);
  });
});

describe("Open Beta activity homepage placement and trust boundary", () => {
  it("renders immediately after Verified Network Activity without restructuring navigation", async () => {
    const page = await source("src/app/page.tsx"), network = await source("src/components/marketing/NetworkMetrics.tsx"), panel = await source("src/components/marketing/OpenBetaActivity.tsx");
    assert.match(page, /<NetworkMetrics\s*\/>\s*<OpenBetaActivity\s*\/>/);
    assert.ok(page.indexOf("<OpenBetaActivity />") < page.indexOf('id="runtime"'));
    assert.match(network, /Verified network activity/); assert.match(network, /Live activity will appear here/); assert.match(network, /Status pending/); assert.match(network, /No verified public activity yet/);
    assert.doesNotMatch(network, /Open Beta Activity|Mock USDC processed/);
    assert.match(panel, /Open Beta Activity/); assert.match(panel, /Real testing across Mock Rail and Solana Devnet\./); assert.match(panel, /No production or Mainnet funds are transferred\./); assert.match(panel, /Beta activity is temporarily unavailable\./); assert.match(panel, /Not yet available/); assert.match(panel, /Devnet testing/); assert.match(panel, /live P2P/); assert.match(panel, /Live Devnet reporting is being connected/); assert.match(panel, /Live QA telemetry syncing/);
    assert.doesNotMatch(panel, /Friends & Family|mainnet volume|production volume|Solana volume/i);
    const navigation = await source("src/config/navigation.ts"); assert.doesNotMatch(navigation, /open-beta-activity|telemetry\/open-beta/i);
  });
});

async function source(path: string) { return readFile(new URL(`../${path}`, import.meta.url), "utf8"); }
