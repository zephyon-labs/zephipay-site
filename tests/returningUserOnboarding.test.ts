import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

import { classifyIdentityFailure } from "../src/lib/identity/errors";

const source = (path: string) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

describe("returning-user and first-run lifecycle", () => {
  it("preserves safe identity failure categories", () => {
    assert.equal(classifyIdentityFailure(401).body.code, "AUTHENTICATION_REQUIRED");
    assert.equal(classifyIdentityFailure(403).body.code, "AUTHORIZATION_DENIED");
    assert.equal(classifyIdentityFailure(404).body.code, "NOT_FOUND");
    assert.equal(classifyIdentityFailure(429).body.code, "RATE_LIMITED");
    assert.equal(classifyIdentityFailure(500).body.code, "TEMPORARILY_UNAVAILABLE");
    assert.equal(classifyIdentityFailure(504).body.code, "TEMPORARILY_UNAVAILABLE");
    assert.equal(classifyIdentityFailure(409, "VERSION_CONFLICT").body.code, "VERSION_CONFLICT");
  });

  it("routes new signups through optional onboarding and returning logins to Personal Home", async () => {
    const auth = await source("src/lib/auth0.ts");
    const session = await source("src/components/auth/AccountSession.tsx");
    const cta = await source("src/components/auth/AccountAwareBetaCta.tsx");
    assert.match(auth, /signInReturnToPath: "\/personal"/);
    assert.match(`${session}\n${cta}`, /screen_hint=signup&returnTo=%2Fpersonal%2Fidentity/);
  });

  it("shows authoritative verification guidance without blocking Mock Send", async () => {
    const page = await source("src/app/personal/identity/page.tsx");
    const identity = await source("src/components/product/personal/IdentityInterface.tsx");
    assert.match(page, /session\.user\.email_verified === true/);
    for (const phrase of ["Verify your email", "Check your inbox", "I’ve verified my email — check again", "You can continue using Mock Send during this beta"]) assert.match(identity, new RegExp(phrase));
    assert.doesNotMatch(identity, /emailVerified.*(?:disable|block)|(?:disable|block).*emailVerified/i);
  });

  it("uses absent identity as a durable optional state and supports later setup", async () => {
    const identity = await source("src/components/product/personal/IdentityInterface.tsx");
    const status = await source("src/components/product/personal/PaymentIdentityStatus.tsx");
    for (const phrase of ["Create your Payment Identity", "Set up Payment Identity", "Skip for now", "You don’t need a Payment Identity to send a payment"]) assert.match(identity, new RegExp(phrase));
    assert.match(identity, /href="\/personal"/);
    assert.doesNotMatch(identity, /synthetic|fake|create.*skip/i);
    assert.match(status, /body\.identity \? "configured" : "incomplete"/);
    assert.match(status, /Payment Identity not set up/);
  });

  it("Try again makes a fresh uncached authoritative read without mutation", async () => {
    const identity = await source("src/components/product/personal/IdentityInterface.tsx");
    assert.match(identity, /async function load\(\)/);
    assert.match(identity, /fetch\("\/api\/account\/identity", \{ cache: "no-store" \}\)/);
    assert.match(identity, /<Action onClick=\{\(\) => void load\(\)\}>Try again<\/Action>/);
    const loadBody = identity.slice(identity.indexOf("async function load()"), identity.indexOf("useEffect("));
    assert.doesNotMatch(loadBody, /method: "PUT"|method: "POST"/);
  });

  it("recovers settlement and the same receipt after transient reads without another execute", async () => {
    const payment = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
    assert.match(payment, /setTimeout\(poll,4000\)/);
    assert.match(payment, /setTimeout\(recover,2000\)/);
    assert.match(payment, /if\(parsed\.status==="settled"\)await readReceipt\(id,signal\)/);
    assert.match(payment, /if\(mutationInFlight\.current\)return/);
    assert.equal((payment.match(/\/execute`/g) ?? []).length, 1);
    assert.doesNotMatch(payment, /\/api\/send/);
  });
});
