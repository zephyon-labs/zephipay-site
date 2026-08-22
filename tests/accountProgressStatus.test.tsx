import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { AccountProgressStatusView, shouldShowAccountProgress } from "../src/components/auth/AccountProgressStatus";
import { getDevelopmentZpPreview, resolveZpHydration, shouldRequestZp } from "../src/components/auth/ZpHydrationProvider";
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

  it("deterministically transitions loading preview to populated without a request or remount race", () => {
    const previous = process.env.NODE_ENV; setNodeEnv("development");
    try {
      const stored = { status: "idle" as const, zp: null };
      const loading = getDevelopmentZpPreview("zpPreview=loading");
      const populated = getDevelopmentZpPreview("zpPreview=populated");
      assert.equal(resolveZpHydration("authenticated", "account-1", stored, loading).status, "loading");
      const transitioned = resolveZpHydration("authenticated", "account-1", stored, populated);
      assert.equal(transitioned.status, "ready");
      if (transitioned.status === "ready") assert.equal(transitioned.zp.totalPoints, "340");
      const hardRemount = resolveZpHydration("authenticated-unavailable", undefined, { status: "idle", zp: null }, populated);
      assert.equal(hardRemount.status, "ready");
    } finally { setNodeEnv(previous); }
  });

  it("maps account authority, preview overrides, visibility, and request counts independently", () => {
    const previous = process.env.NODE_ENV; setNodeEnv("development");
    try {
      const stored = { status: "ready" as const, zp: summary("99"), accountKey: "account-1" };
      const populated = getDevelopmentZpPreview("?zpPreview=populated");
      const zero = getDevelopmentZpPreview("?zpPreview=zero");
      const loading = getDevelopmentZpPreview("?zpPreview=loading");
      const error = getDevelopmentZpPreview("?zpPreview=error");
      assert.ok(populated && zero && loading && error);

      for (const preview of [populated, zero, loading, error]) {
        const state = resolveZpHydration("authenticated-unavailable", undefined, stored, preview);
        assert.equal(state.status, preview.status);
        assert.equal(shouldRequestZp("authenticated-unavailable", undefined, preview), false);
        assert.equal(shouldShowAccountProgress(false, "authenticated-unavailable", state), true);
      }
      assert.equal(resolveZpHydration("authenticated-unavailable", undefined, stored).status, "error");
      assert.equal(resolveZpHydration("error", undefined, stored).status, "error");
      assert.equal(resolveZpHydration("loading", undefined, stored).status, "loading");
      const signedOut = resolveZpHydration("signed-out", undefined, stored);
      assert.equal(signedOut.status, "idle");
      assert.equal(shouldShowAccountProgress(false, "signed-out", populated), false);
      assert.equal(shouldRequestZp("signed-out", undefined, populated), false);
      assert.equal(shouldRequestZp("authenticated", "account-1", undefined), true);
      assert.equal(shouldRequestZp("authenticated", "account-1", populated), false);
    } finally { setNodeEnv(previous); }
  });

  it("ignores a production selector and exposes unavailable as bounded error", () => {
    const previous = process.env.NODE_ENV; setNodeEnv("production");
    try {
      const preview = getDevelopmentZpPreview("?zpPreview=populated");
      assert.equal(preview, undefined);
      const state = resolveZpHydration("authenticated-unavailable", undefined, { status: "idle", zp: null }, preview);
      assert.equal(state.status, "error");
      assert.equal(shouldRequestZp("authenticated-unavailable", undefined, preview), false);
      assert.equal(shouldShowAccountProgress(false, "authenticated-unavailable", state), false);
      assert.match(renderToStaticMarkup(<ZephyonProgressView state={state} />), /ZP progress is temporarily unavailable/);
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
    assert.match(provider, /shouldRequestZp\(accountStatus, accountKey, preview\)/);
    assert.match(provider, /resolveZpHydration\(accountStatus, accountKey, stored, preview\)/);
    assert.doesNotMatch(provider, /setTimeout|clearTimeout/);
    assert.match(provider, /window\.addEventListener\("popstate", onChange\)/);
    assert.equal((`${provider}\n${panel}`.match(/fetch\("\/api\/account\/zp"/g) ?? []).length, 1);
    assert.doesNotMatch(panel, /fetch\(|parseZpResponse/);
    assert.doesNotMatch(provider, /setInterval|poll|Authorization|ZEPHIPAY_BACKEND_URL/);
  });

  it("keeps signed-out rendering gated and preserves header/mobile controls", async () => {
    const [status, siteHeader, session, mobile] = await Promise.all([source("src/components/auth/AccountProgressStatus.tsx"), source("src/components/layout/SiteHeader.tsx"), source("src/components/auth/AccountSession.tsx"), source("src/components/navigation/MobileNavigation.tsx")]);
    assert.match(status, /shouldShowAccountProgress\(Boolean\(account\), accountStatus, zpState\)/);
    assert.match(siteHeader, /<AccountProgressStatus className="ml-auto lg:ml-0" \/>/); assert.match(siteHeader, /lg:hidden/);
    assert.match(session, /cta\.label/); assert.match(session, /Log out/); assert.match(mobile, /AccountSession mobile/); assert.match(mobile, /ThemeToggle/);
    assert.match(status, /min-h-10/); assert.match(status, /shrink-0/); assert.match(status, /max-w-20 overflow-x-auto/); assert.match(status, /focus-visible:ring-2/);
  });

  it("keeps primary account controls stable while descriptive copy yields first", async () => {
    const [session, siteHeader] = await Promise.all([source("src/components/auth/AccountSession.tsx"), source("src/components/layout/SiteHeader.tsx")]);
    assert.equal((session.match(/shrink-0 whitespace-nowrap rounded-full bg-brand-primary/g) ?? []).length, 2);
    assert.equal((session.match(/<form className="shrink-0"/g) ?? []).length, 2);
    assert.match(session, /hidden text-foreground-secondary 2xl:inline">Signed in · Beta account/);
    assert.match(session, /hidden text-foreground-secondary 2xl:inline">Signed in · Account details unavailable/);
    assert.doesNotMatch(session, /text-foreground-secondary xl:inline/);
    assert.match(siteHeader, /gap-3 px-4 sm:px-5 xl:gap-4/);
  });

  it("uses one slim explicit capsule and keeps it persistent beside the mobile menu", async () => {
    const [status, siteHeader] = await Promise.all([source("src/components/auth/AccountProgressStatus.tsx"), source("src/components/layout/SiteHeader.tsx")]);
    const html = header("340");
    assert.match(html, /href="\/personal#zephyon-progress"/);
    assert.match(html, />ZP<\/span><span[^>]*>340<\/span>/);
    assert.match(html, />·<\/span>/);
    assert.match(html, />ZTS<\/span><span aria-hidden="true">—<\/span>/);
    assert.match(status, /min-h-10 shrink-0[\s\S]*gap-2[\s\S]*px-2\.5/);
    assert.doesNotMatch(status, /shadow-\[var\(--shadow-soft\)\]|border-r/);
    assert.ok(siteHeader.indexOf("<AccountProgressStatus") < siteHeader.indexOf("<button"));
    assert.match(siteHeader, /aria-label=\{[\s\S]*Open navigation menu[\s\S]*lg:hidden/);
    assert.doesNotMatch(html, /ZERA|currency|\$|ZTS\s*\d/i);
  });
});

async function source(path: string) { return readFile(new URL(`../${path}`, import.meta.url), "utf8"); }
function setNodeEnv(value: string | undefined) { Object.defineProperty(process.env, "NODE_ENV", { value, writable: true, configurable: true, enumerable: true }); }
