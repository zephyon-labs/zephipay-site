import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { ZephyonProgressView, type ZpViewState } from "../src/components/product/personal/ZephyonProgressPanel";
import { parseZpResponse, ZP_MILESTONE_LABELS } from "../src/lib/zp/contract";

const populated = {
  ok: true as const,
  requestId: "request-1",
  zp: {
    totalPoints: "90071992547409931234567890", sentCount: "1", receivedCount: "0", policyVersion: 1,
    unlockedMilestones: ["FIRST_PAYMENT_SENT" as const],
    pendingMilestones: [
      { milestone: "FIRST_PAYMENT_RECEIVED" as const, dimension: "RECEIVED" as const, current: "0", target: "1", progressPercent: 0 },
      { milestone: "TEN_PAYMENTS_SENT" as const, dimension: "SENT" as const, current: "1", target: "10", progressPercent: 10 },
    ],
  },
};
const render = (state: ZpViewState) => renderToStaticMarkup(<ZephyonProgressView state={state} />);

describe("Zephyon account progression", () => {
  it("renders authenticated populated ZP without losing bigint precision", () => {
    const parsed = parseZpResponse(populated);
    assert.ok(parsed);
    const html = render({ status: "ready", data: parsed });
    assert.match(html, /90071992547409931234567890/);
    assert.match(html, /First payment sent/);
    assert.match(html, /First payment received/);
    assert.match(html, /10 payments sent/);
  });

  it("renders a polished authenticated zero state with honest progress", () => {
    const parsed = parseZpResponse({ ...populated, zp: { ...populated.zp, totalPoints: "0", sentCount: "0", unlockedMilestones: [], pendingMilestones: [{ milestone: "FIRST_PAYMENT_SENT", dimension: "SENT", current: "0", target: "1", progressPercent: 0 }] } });
    assert.ok(parsed);
    const html = render({ status: "ready", data: parsed });
    assert.match(html, />0<\/span> <span[^>]*>ZP/);
    assert.match(html, /progression starts with meaningful activity/);
    assert.match(html, /0 of 1/);
  });

  it("uses bounded loading and local error states without fake values", () => {
    const loading = render({ status: "loading" }), error = render({ status: "error" });
    assert.match(loading, /aria-busy="true"/); assert.match(loading, /Loading ZP progress/);
    assert.doesNotMatch(loading, />0 ZP|0 of 1/);
    assert.match(error, /ZP progress is temporarily unavailable/); assert.match(error, /role="status"/);
  });

  it("centralizes friendly milestone labels and never renders raw enums", () => {
    assert.equal(ZP_MILESTONE_LABELS.FIRST_PAYMENT_SENT, "First payment sent");
    assert.equal(ZP_MILESTONE_LABELS.FIRST_PAYMENT_RECEIVED, "First payment received");
    assert.equal(ZP_MILESTONE_LABELS.TEN_PAYMENTS_SENT, "10 payments sent");
    assert.equal(ZP_MILESTONE_LABELS.TWENTY_FIVE_PAYMENTS_SENT, "25 payments sent");
    const parsed = parseZpResponse(populated); assert.ok(parsed);
    assert.doesNotMatch(render({ status: "ready", data: parsed }), /FIRST_PAYMENT_|TEN_PAYMENTS_|TWENTY_FIVE_PAYMENTS_/);
  });

  it("adds text semantics for unlocked milestones and accessible pending progress", () => {
    const parsed = parseZpResponse(populated); assert.ok(parsed);
    const html = render({ status: "ready", data: parsed });
    assert.match(html, /First payment sent<\/span><span class="sr-only"> unlocked/);
    assert.match(html, /role="progressbar"/); assert.match(html, /aria-valuemin="0"/); assert.match(html, /aria-valuemax="100"/);
    assert.match(html, /aria-valuenow="10"/); assert.match(html, /aria-label="10 payments sent progress"/);
  });

  it("renders ZTS as a truthful non-scored companion and keeps ZP non-monetary", () => {
    const parsed = parseZpResponse(populated); assert.ok(parsed);
    const html = render({ status: "ready", data: parsed });
    assert.match(html, /Zephyon Trust Score/); assert.match(html, /Trust profile coming soon/); assert.match(html, /No trust score is available yet/);
    assert.doesNotMatch(html, /ZERA|redeem|cash value|reward|trust tier|risk rating/i);
  });

  it("strictly rejects malformed API payloads", () => {
    assert.equal(parseZpResponse({ ...populated, zp: { ...populated.zp, totalPoints: 10 } }), undefined);
    assert.equal(parseZpResponse({ ...populated, zp: { ...populated.zp, pendingMilestones: [{ ...populated.zp.pendingMilestones[0], progressPercent: 101 }] } }), undefined);
    assert.equal(parseZpResponse({ ...populated, accountId: "private" }), undefined);
    assert.equal(parseZpResponse({ ...populated, zp: { ...populated.zp, unlockedMilestones: ["UNKNOWN"] } }), undefined);
  });

  it("mounts only for authenticated Personal workspaces and uses the same-origin BFF", async () => {
    const [workspace, panel] = await Promise.all([source("src/components/marketing/personal-workspace/PersonalWorkspace.tsx"), source("src/components/product/personal/ZephyonProgressPanel.tsx")]);
    assert.match(workspace, /authenticated \? <ZephyonProgressPanel \/> : null/);
    assert.equal((workspace.match(/<ZephyonProgressPanel \/>/g) ?? []).length, 1);
    assert.match(panel, /fetch\("\/api\/account\/zp"/); assert.match(panel, /credentials: "same-origin"/); assert.match(panel, /cache: "no-store"/);
  });

  it("keeps the server boundary authenticated, uncached, bounded, and sanitized", async () => {
    const [route, client] = await Promise.all([source("src/app/api/account/zp/route.ts"), source("src/lib/zp/serverClient.ts")]);
    assert.match(route, /private, no-store/); assert.match(route, /callZpApi/); assert.doesNotMatch(route, /Authorization|ZEPHIPAY_BACKEND_URL/);
    assert.match(client, /getSession\(\)/); assert.match(client, /getAccessToken/); assert.match(client, /Authorization: `Bearer \$\{token\}`/);
    assert.match(client, /new URL\("\/api\/account\/zp", backendUrl\)/); assert.match(client, /AbortSignal\.timeout\(5_000\)/); assert.match(client, /cache: "no-store"/);
    assert.match(client, /ZP progress is temporarily unavailable/);
  });
});

async function source(path: string) { return readFile(new URL(`../${path}`, import.meta.url), "utf8"); }
