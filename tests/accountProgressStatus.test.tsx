import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { AccountProgressStatusView } from "../src/components/auth/AccountProgressStatus";
import { getDevelopmentZpPreview } from "../src/components/auth/ZpHydrationProvider";
import { ZephyonProgressView } from "../src/components/product/personal/ZephyonProgressPanel";
import type { ZpSummary } from "../src/lib/zp/contract";

const summary = (totalPoints: string): ZpSummary => ({ totalPoints, sentCount: "0", receivedCount: "0", policyVersion: 1, unlockedMilestones: [], pendingMilestones: [] });
const header = (totalPoints: string) => renderToStaticMarkup(<AccountProgressStatusView state={{ status: "ready", zp: summary(totalPoints) }} />);

describe("authenticated header progression status", () => {
  it("renders exact populated, zero, and bigint ZP strings without monetary semantics", () => {
    assert.match(header("340"), />340<\/span>/);
    assert.match(header("0"), />0<\/span>/);
    assert.match(header("90071992547409931234567890"), /90071992547409931234567890/);
    assert.doesNotMatch(header("340"), /ZERA|\$|currency|cash|redeem|reward/i);
  });

  it("renders stable loading and bounded error states without flashing zero", () => {
    const loading = renderToStaticMarkup(<AccountProgressStatusView state={{ status: "loading", zp: null }} />);
    const error = renderToStaticMarkup(<AccountProgressStatusView state={{ status: "error", zp: null }} />);
    assert.match(loading, /Loading Zephyon Points/); assert.doesNotMatch(loading, />0<\/span>/);
    assert.match(error, /Zephyon Points temporarily unavailable/); assert.match(error, />—<\/span>/);
  });

  it("keeps ZTS scoreless, explicitly unavailable, and links to the full progression surface", () => {
    const html = header("340");
    assert.match(html, /href="\/personal#zephyon-progress"/);
    assert.match(html, /Zephyon Trust Score not available yet/);
    assert.match(html, /ZTS<\/span><span aria-hidden="true">—/);
    assert.doesNotMatch(html, /ZTS\s*\d|trust tier|trust level|%/i);
  });

  it("shares the populated development preview between header and Personal detail", () => {
    const previous = process.env.NODE_ENV; setNodeEnv("development");
    try {
      const preview = getDevelopmentZpPreview("?zpPreview=populated"); assert.equal(preview?.status, "ready");
      if (preview?.status !== "ready") return;
      assert.match(renderToStaticMarkup(<AccountProgressStatusView state={preview} />), />340<\/span>/);
      const panel = renderToStaticMarkup(<ZephyonProgressView state={preview} />);
      assert.match(panel, /id="zephyon-progress"/); assert.match(panel, />340<\/span>/); assert.match(panel, /aria-valuenow="68"/);
    } finally { setNodeEnv(previous); }
  });

  it("cannot activate previews in production", () => {
    const previous = process.env.NODE_ENV; setNodeEnv("production");
    try { assert.equal(getDevelopmentZpPreview("?zpPreview=populated"), undefined); }
    finally { setNodeEnv(previous); }
  });

  it("fetches once only after usable authentication and masks stale account state", async () => {
    const [provider, panel, layout] = await Promise.all([source("src/components/auth/ZpHydrationProvider.tsx"), source("src/components/product/personal/ZephyonProgressPanel.tsx"), source("src/app/layout.tsx")]);
    assert.match(layout, /<AccountHydrationProvider><ZpHydrationProvider>/);
    assert.match(provider, /accountStatus === "authenticated" \? account\?\.id : undefined/);
    assert.match(provider, /if \(!accountKey\) return;/);
    assert.match(provider, /if \(!accountKey\) return idle/);
    assert.match(provider, /stored\.accountKey !== accountKey[\s\S]*status: "loading"/);
    assert.equal((`${provider}\n${panel}`.match(/fetch\("\/api\/account\/zp"/g) ?? []).length, 1);
    assert.doesNotMatch(panel, /fetch\(|parseZpResponse/);
    assert.doesNotMatch(provider, /setInterval|poll|Authorization|ZEPHIPAY_BACKEND_URL/);
  });

  it("keeps signed-out rendering gated and preserves header/mobile controls", async () => {
    const [status, siteHeader, session, mobile] = await Promise.all([source("src/components/auth/AccountProgressStatus.tsx"), source("src/components/layout/SiteHeader.tsx"), source("src/components/auth/AccountSession.tsx"), source("src/components/navigation/MobileNavigation.tsx")]);
    assert.match(status, /if \(!account \|\| accountStatus !== "authenticated"\) return null/);
    assert.match(siteHeader, /<AccountProgressStatus className="ml-auto lg:ml-0" \/>/); assert.match(siteHeader, /lg:hidden/);
    assert.match(session, /cta\.label/); assert.match(session, /Log out/); assert.match(mobile, /AccountSession mobile/); assert.match(mobile, /ThemeToggle/);
    assert.match(status, /min-h-10/); assert.match(status, /shrink-0/); assert.match(status, /max-w-20 overflow-x-auto/); assert.match(status, /focus-visible:ring-2/);
  });
});

async function source(path: string) { return readFile(new URL(`../${path}`, import.meta.url), "utf8"); }
function setNodeEnv(value: string | undefined) { Object.defineProperty(process.env, "NODE_ENV", { value, writable: true, configurable: true, enumerable: true }); }
