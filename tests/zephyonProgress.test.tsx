import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { getDevelopmentZpPreview } from "../src/components/auth/ZpHydrationProvider";
import { selectPrimaryPendingMilestone, ZephyonProgressView, type ZpViewState } from "../src/components/product/personal/ZephyonProgressPanel";
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
  it("renders the development populated preview with its exact progression fixture", () => {
    const state = developmentPreview("?zpPreview=populated"); assert.ok(state);
    const html = render(state);
    assert.match(html, />340<\/span>/); assert.match(html, /aria-valuenow="68"/); assert.match(html, />68%<\/p>/);
    assert.match(html, /17<\/span> \/ 25/); assert.match(html, /25 payments sent/);
    for (const label of ["First payment sent", "First payment received", "10 payments sent"]) assert.match(html, new RegExp(label));
    assert.doesNotMatch(html, /FIRST_PAYMENT_|TEN_PAYMENTS_|TWENTY_FIVE_PAYMENTS_|ZERA/);
  });

  it("renders honest zero, loading, and error development previews", () => {
    const zero = developmentPreview("?zpPreview=zero"), loading = developmentPreview("?zpPreview=loading"), error = developmentPreview("?zpPreview=error");
    assert.ok(zero && loading && error);
    const zeroHtml = render(zero), loadingHtml = render(loading), errorHtml = render(error);
    assert.match(zeroHtml, />0%<\/p>/); assert.match(zeroHtml, /aria-valuenow="0"/);
    assert.doesNotMatch(loadingHtml, />340<|aria-valuenow|\d+%/);
    assert.doesNotMatch(errorHtml, />340<|aria-valuenow|\d+%|\d+ \/ \d+/);
  });

  it("makes previews unavailable outside development and retains the default fetch path", async () => {
    const previous = process.env.NODE_ENV;
    setNodeEnv("production");
    try { assert.equal(getDevelopmentZpPreview("?zpPreview=populated"), undefined); }
    finally { setNodeEnv(previous); }
    const provider = await source("src/components/auth/ZpHydrationProvider.tsx");
    assert.match(provider, /process\.env\.NODE_ENV !== "development"/);
    assert.match(provider, /getDevelopmentZpPreview\(window\.location\.search\)/);
    assert.match(provider, /if \(preview\)[\s\S]*return[\s\S]*fetch\("\/api\/account\/zp"/);
  });

  it("renders authenticated populated ZP without losing bigint precision", () => {
    const parsed = parseZpResponse(populated);
    assert.ok(parsed);
    const html = render({ status: "ready", zp: parsed.zp });
    assert.match(html, /90071992547409931234567890/);
    assert.match(html, /First payment sent/);
    assert.match(html, /First payment received/);
    assert.match(html, /10 payments sent/);
  });

  it("renders a polished authenticated zero state with honest progress", () => {
    const parsed = parseZpResponse({ ...populated, zp: { ...populated.zp, totalPoints: "0", sentCount: "0", unlockedMilestones: [], pendingMilestones: [{ milestone: "FIRST_PAYMENT_SENT", dimension: "SENT", current: "0", target: "1", progressPercent: 0 }] } });
    assert.ok(parsed);
    const html = render({ status: "ready", zp: parsed.zp });
    assert.match(html, />0<\/span> <span[^>]*>ZP/);
    assert.match(html, /progression starts with meaningful activity/);
    assert.match(html, /0<\/span> \/ 1/); assert.match(html, /aria-valuenow="0"/); assert.match(html, />0%<\/p>/);
  });

  it("selects the highest-progress primary milestone and preserves backend order on ties", () => {
    assert.equal(selectPrimaryPendingMilestone(populated.zp.pendingMilestones)?.milestone, "TEN_PAYMENTS_SENT");
    const tied = populated.zp.pendingMilestones.map((item) => ({ ...item, progressPercent: 25 }));
    assert.equal(selectPrimaryPendingMilestone(tied)?.milestone, "FIRST_PAYMENT_RECEIVED");
  });

  it("makes one primary meter dominant and keeps remaining milestones secondary", () => {
    const parsed = parseZpResponse(populated); assert.ok(parsed);
    const html = render({ status: "ready", zp: parsed.zp });
    assert.match(html, /Toward[\s\S]*10 payments sent[\s\S]*1<\/span> \/ 10/);
    assert.match(html, /aria-label="10 payments sent progress"[\s\S]*aria-valuenow="10"/);
    assert.match(html, /Also in progress[\s\S]*First payment received[\s\S]*0 \/ 1/);
    assert.equal((html.match(/h-3 overflow-hidden rounded-full/g) ?? []).length, 1);
    assert.equal((html.match(/h-1\.5 overflow-hidden rounded-full/g) ?? []).length, 1);
  });

  it("uses bounded loading and local error states without fake values", () => {
    const loading = render({ status: "loading" }), error = render({ status: "error" });
    assert.match(loading, /aria-busy="true"/); assert.match(loading, /Loading ZP progress/);
    assert.doesNotMatch(loading, />0 ZP|0 \/ 1|\d+%/);
    assert.match(error, /ZP progress is temporarily unavailable/); assert.match(error, /role="status"/);
    assert.doesNotMatch(error, /aria-valuenow|\d+%|\d+ \/ \d+/);
  });

  it("renders achieved progress without fabricating another target", () => {
    const parsed = parseZpResponse({ ...populated, zp: { ...populated.zp, pendingMilestones: [] } }); assert.ok(parsed);
    const html = render({ status: "ready", zp: parsed.zp });
    assert.match(html, /Progress achieved/); assert.match(html, /All currently available milestones are unlocked/);
    assert.doesNotMatch(html, /role="progressbar"|Toward|Also in progress/);
  });

  it("centralizes friendly milestone labels and never renders raw enums", () => {
    assert.equal(ZP_MILESTONE_LABELS.FIRST_PAYMENT_SENT, "First payment sent");
    assert.equal(ZP_MILESTONE_LABELS.FIRST_PAYMENT_RECEIVED, "First payment received");
    assert.equal(ZP_MILESTONE_LABELS.TEN_PAYMENTS_SENT, "10 payments sent");
    assert.equal(ZP_MILESTONE_LABELS.TWENTY_FIVE_PAYMENTS_SENT, "25 payments sent");
    const parsed = parseZpResponse(populated); assert.ok(parsed);
    assert.doesNotMatch(render({ status: "ready", zp: parsed.zp }), /FIRST_PAYMENT_|TEN_PAYMENTS_|TWENTY_FIVE_PAYMENTS_/);
  });

  it("adds text semantics for unlocked milestones and accessible pending progress", () => {
    const parsed = parseZpResponse(populated); assert.ok(parsed);
    const html = render({ status: "ready", zp: parsed.zp });
    assert.match(html, /First payment sent<\/span><span class="sr-only"> unlocked/);
    assert.match(html, /role="progressbar"/); assert.match(html, /aria-valuemin="0"/); assert.match(html, /aria-valuemax="100"/);
    assert.match(html, /aria-valuenow="10"/); assert.match(html, /aria-label="10 payments sent progress"/);
  });

  it("renders ZTS as a truthful non-scored companion and keeps ZP non-monetary", () => {
    const parsed = parseZpResponse(populated); assert.ok(parsed);
    const html = render({ status: "ready", zp: parsed.zp });
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
    const provider = await source("src/components/auth/ZpHydrationProvider.tsx");
    assert.doesNotMatch(panel, /fetch\(|\/api\/account\/zp/);
    assert.match(provider, /fetch\("\/api\/account\/zp"/); assert.match(provider, /credentials: "same-origin"/); assert.match(provider, /cache: "no-store"/);
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

function developmentPreview(search: string): ZpViewState | undefined {
  const previous = process.env.NODE_ENV;
  setNodeEnv("development");
  try {
    const preview = getDevelopmentZpPreview(search);
    return preview?.status === "ready" ? preview : preview?.status === "loading" || preview?.status === "error" ? { status: preview.status } : undefined;
  }
  finally { setNodeEnv(previous); }
}

function setNodeEnv(value: string | undefined) { Object.defineProperty(process.env, "NODE_ENV", { value, writable: true, configurable: true, enumerable: true }); }
