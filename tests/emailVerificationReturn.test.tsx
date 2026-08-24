import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { EmailVerificationLanding } from "../src/components/auth/EmailVerificationLanding";
import {
  parseVerificationContinuation,
  parseVerificationRequest,
  resolveVerificationStatus,
  verificationLandingHref,
  verificationLoginHref,
  type VerificationSearchParams,
} from "../src/lib/auth/emailVerification";

describe("Phase 2B email-verification return", () => {
  it("keeps a same-session false claim unverified despite a success hint", () => {
    const request = parseVerificationRequest({ success: "true", message: "verified", email: "user-a@example.test" });
    const model = resolveVerificationStatus(true, false, request.result);
    const html = render(model, request.continuation);
    assert.deepEqual(model, { status: "refresh-required", result: "processed" });
    assert.match(html, /Verification request processed/);
    assert.match(html, /Check verification status/);
    assert.doesNotMatch(html, />Email verified</);
  });

  it("shows verified only after a deliberate fresh session has a true claim", () => {
    const request = parseVerificationRequest({});
    const stale = resolveVerificationStatus(true, false, request.result);
    const fresh = resolveVerificationStatus(true, true, request.result);
    assert.equal(stale.status, "refresh-required");
    assert.equal(fresh.status, "verified");
    assert.match(render(fresh, "/personal/identity"), />Email verified</);
    assert.match(render(fresh, "/personal/identity"), /href="\/personal\/identity"/);
  });

  it("uses the same canonical login/callback path and carries no identity selector", () => {
    const href = verificationLoginHref("/personal/identity");
    const login = new URL(href, "https://zephipay.test");
    assert.equal(login.pathname, "/auth/login");
    assert.equal(login.searchParams.get("returnTo"), "/email-verified?continue=%2Fpersonal%2Fidentity");
    assert.equal(login.searchParams.has("email"), false);
    assert.equal(login.searchParams.has("sub"), false);
    assert.equal(login.searchParams.has("account"), false);
    const rejected = new URL(verificationLoginHref("https://evil.example/path"), "https://zephipay.test");
    assert.equal(rejected.searchParams.get("returnTo"), "/email-verified?continue=%2Fpersonal");
  });

  it("keeps a no-session success hint signed out and non-account-specific", () => {
    const request = parseVerificationRequest({ success: "true", email: "user-a@example.test" });
    const model = resolveVerificationStatus(false, false, request.result);
    const html = render(model, request.continuation);
    assert.deepEqual(model, { status: "sign-in-required", result: "processed" });
    assert.match(html, /Sign in to confirm status/);
    assert.doesNotMatch(html, /user-a@example\.test|Payment Identity:/);
  });

  it("renders only a deliberate full-document login action and never starts login automatically", async () => {
    const [page, component] = await Promise.all([
      source("src/app/email-verified/page.tsx"),
      source("src/components/auth/EmailVerificationLanding.tsx"),
    ]);
    assert.match(component, /verificationLoginHref\(continuation\)/);
    assert.match(component, /fullDocument/);
    assert.doesNotMatch(`${page}\n${component}`, /redirect\(|router\.(?:push|replace)|location\.(?:assign|replace)|useEffect/);
  });

  it("preserves User B authority when a User A link is opened in B's session", () => {
    const request = parseVerificationRequest({ success: "true", email: "user-a@example.test", message: "User A verified" });
    const currentUserB = resolveVerificationStatus(true, false, request.result);
    const html = render(currentUserB, request.continuation);
    assert.equal(currentUserB.status, "refresh-required");
    assert.doesNotMatch(html, /user-a@example\.test|User A/);
    assert.match(html, /current application session does not yet confirm/);
    const verifiedUserB = render(resolveVerificationStatus(true, true, request.result), request.continuation);
    assert.match(verifiedUserB, /current signed-in ZephiPay session confirms/);
    assert.doesNotMatch(verifiedUserB, /user-a@example\.test|User A/);
    assert.match(verifiedUserB, /To use a different account, log out first/);
  });

  it("accepts only the three exact continuation paths", () => {
    for (const path of ["/personal", "/personal/identity", "/personal/send"] as const) {
      assert.equal(parseVerificationContinuation(path), path);
      assert.equal(new URL(verificationLandingHref(path), "https://zephipay.test").searchParams.get("continue"), path);
    }
  });

  it("rejects external, protocol-relative, encoded external, query-bearing, and unknown continuations", () => {
    for (const value of [
      "https://evil.example/path",
      "//evil.example/path",
      "%2F%2Fevil.example%2Fpath",
      "%252F%252Fevil.example%252Fpath",
      "/personal?next=https://evil.example",
      "/email-verified",
      "/unknown",
      "personal",
    ]) assert.equal(parseVerificationContinuation(value), "/personal", value);
  });

  it("falls back for missing, malformed, repeated, and conflicting continuation values", () => {
    for (const value of [undefined, "", ["/personal/send"], ["/personal", "/personal/send"]]) {
      assert.equal(parseVerificationContinuation(value), "/personal");
    }
  });

  it("keeps expired, reused, malformed, and unknown results non-authoritative", () => {
    for (const parameters of [
      { success: "false", message: "Access expired." },
      { success: "false", message: "This URL can be used only once" },
      { success: "yes" },
      { success: ["true", "false"] },
      {},
    ] satisfies VerificationSearchParams[]) {
      const request = parseVerificationRequest(parameters);
      const model = resolveVerificationStatus(false, false, request.result);
      assert.notEqual(model.status, "verified");
      assert.doesNotMatch(render(model, request.continuation), />Email verified</);
    }
  });

  it("drops raw vendor email/message fields instead of logging, persisting, or reflecting them", async () => {
    const rawEmail = "sensitive-user@example.test";
    const rawMessage = "raw vendor outcome with private context";
    const request = parseVerificationRequest({ success: "false", email: rawEmail, message: rawMessage });
    assert.deepEqual(Object.keys(request).sort(), ["continuation", "result"]);
    const html = render(resolveVerificationStatus(false, false, request.result), request.continuation);
    assert.doesNotMatch(html, new RegExp(`${rawEmail}|${rawMessage}`));
    const [model, page] = await Promise.all([
      source("src/lib/auth/emailVerification.ts"),
      source("src/app/email-verified/page.tsx"),
    ]);
    assert.doesNotMatch(`${model}\n${page}`, /console\.|localStorage|sessionStorage|fetch\(|authenticatedJson|callIdentityApi/);
  });

  it("preserves the canonical same-principal account path without provisioning or Payment Identity mutation", async () => {
    const [page, model, provider] = await Promise.all([
      source("src/app/email-verified/page.tsx"),
      source("src/lib/auth/emailVerification.ts"),
      source("src/components/auth/AccountHydrationProvider.tsx"),
    ]);
    assert.match(page, /getApplicationSession\(\)/);
    assert.match(page, /session\?\.user\.email_verified === true/);
    assert.doesNotMatch(`${page}\n${model}`, /actor_subject|providerSubject|PaymentIdentity|payment-intents|\/api\/account|provision|merge|POST|PUT|PATCH|DELETE/);
    assert.match(provider, /fetch\("\/api\/account"/);
    assert.doesNotMatch(provider, /emailVerified|email_verified|providerSubject|actorSubject/);
  });

  it("is explicitly dynamic/no-cache and documents both supported tenant paths", async () => {
    const [page, runbook] = await Promise.all([
      source("src/app/email-verified/page.tsx"),
      source("docs/auth-campaign.md"),
    ]);
    assert.match(page, /export const dynamic = "force-dynamic"/);
    assert.match(page, /export const revalidate = 0/);
    assert.match(runbook, /Redirect To[^\n]*`https:\/\/zephipay\.com\/email-verified`/);
    assert.match(runbook, /includeEmailInRedirect` to `false`/);
    assert.match(runbook, /Application Login URI[^\n]*`https:\/\/zephipay\.com\/auth\/login\?returnTo=%2Femail-verified`/);
    assert.match(runbook, /external SMTP provider/);
    assert.match(runbook, /Authorization Code with PKCE/);
  });
});

function render(model: ReturnType<typeof resolveVerificationStatus>, continuation: ReturnType<typeof parseVerificationContinuation>): string {
  return renderToStaticMarkup(<EmailVerificationLanding model={model} continuation={continuation} />);
}

async function source(path: string): Promise<string> {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}
