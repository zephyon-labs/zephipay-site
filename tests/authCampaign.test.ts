import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

import { isAccountResponse } from "../src/lib/accountResponse";
import { betaCtaState } from "../src/lib/betaCtaState";
import { authenticatedAccountCta } from "../src/lib/accountSessionCta";

describe("account BFF contract", () => {
  it("accepts only canonical actor/account responses", () => {
    const id = "00000000-0000-4000-8000-000000000001";
    const account = { id, actorSubject: `zp:account:${id}`, status: "active", createdAt: new Date().toISOString(), identities: [], paymentAccess: { enabled: false } };
    assert.equal(isAccountResponse({ ok: true, account }), true);
    assert.equal(isAccountResponse({ ok: true, account: { ...account, paymentAccess: undefined } }), false);
    assert.equal(isAccountResponse({ ok: true, account: { ...account, paymentAccess: { enabled: "yes" } } }), false);
    assert.equal(isAccountResponse({ ok: true, account: { ...account, paymentAccess: { enabled: true, note: "private" } } }), false);
    assert.equal(isAccountResponse({ ok: true, account: { id, actorSubject: "forged", status: "active", createdAt: "now", identities: [] } }), false);
    assert.equal(isAccountResponse({ ok: true, token: "must-not-pass" }), false);
  });

  it("derives every beta CTA state from the authoritative account response and fails closed", () => {
    const id = "00000000-0000-4000-8000-000000000001";
    const response = (enabled: boolean) => ({ ok: true, account: {
      id, actorSubject: `zp:account:${id}`, status: "active", createdAt: new Date().toISOString(), identities: [], paymentAccess: { enabled },
    } });
    assert.equal(betaCtaState(401), "signed-out");
    assert.equal(betaCtaState(200), "signed-in");
    assert.equal(betaCtaState(403), "signed-in");
    assert.equal(betaCtaState(502), "signed-in");
    assert.equal(betaCtaState(503), "signed-in");
    assert.equal(response(false).account.paymentAccess.enabled, false);
    assert.equal(response(true).account.paymentAccess.enabled, true);
  });

  it("uses one account-aware CTA with the approved labels and destination", async () => {
    const component = await readFile(new URL("../src/components/auth/AccountAwareBetaCta.tsx", import.meta.url), "utf8");
    assert.match(component, /Join beta/);
    assert.match(component, /Open ZephiPay Beta/);
    assert.match(component, /"\/personal\/send"/);
    assert.match(component, /"\/auth\/login\?screen_hint=signup"/);
    assert.match(component, /betaCtaState\(response\.status\)/);
    assert.doesNotMatch(component, /Request beta access|beta\.zephipay\.com|paymentAccess/);
  });

  it("makes the authenticated header CTA useful on the payment workspace", async () => {
    assert.deepEqual(authenticatedAccountCta("/personal/send"), { label: "Personal Home", href: "/personal" });
    assert.deepEqual(authenticatedAccountCta("/personal"), { label: "Open ZephiPay Beta", href: "/personal/send" });
    assert.deepEqual(authenticatedAccountCta("/"), { label: "Open ZephiPay Beta", href: "/personal/send" });
    const session = await readFile(new URL("../src/components/auth/AccountSession.tsx", import.meta.url), "utf8");
    assert.match(session, /authenticatedAccountCta\(pathname\)/);
    assert.match(session, /\/auth\/login\?screen_hint=signup/);
    assert.doesNotMatch(session, /Live Beta|Request beta access|beta\.zephipay\.com/);
  });

  it("keeps access tokens server-only and authenticated responses uncached", async () => {
    const route = await readFile(new URL("../src/app/api/account/route.ts", import.meta.url), "utf8");
    const auth = await readFile(new URL("../src/lib/auth0.ts", import.meta.url), "utf8");
    assert.match(route, /Authorization: `Bearer \$\{token\}`/);
    assert.match(route, /no-store, private/);
    assert.doesNotMatch(route, /NEXT_PUBLIC_ZEPHIPAY_API_URL/);
    assert.match(auth, /enableAccessTokenEndpoint: false/);
    assert.match(auth, /sameSite: "lax"/);
  });
});
