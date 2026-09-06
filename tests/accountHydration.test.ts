import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

const source = (path: string) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

describe("shared authenticated account hydration", () => {
  it("coalesces account-aware consumers behind one root provider request", async () => {
    const [layout, provider, session, cta] = await Promise.all([
      source("src/app/layout.tsx"),
      source("src/components/auth/AccountHydrationProvider.tsx"),
      source("src/components/auth/AccountSession.tsx"),
      source("src/components/auth/AccountAwareBetaCta.tsx"),
    ]);
    assert.match(layout, /<AccountHydrationProvider><SendDraftProvider><ZpHydrationProvider>\{children\}<\/ZpHydrationProvider><\/SendDraftProvider><\/AccountHydrationProvider>/);
    assert.equal(([provider, session, cta].join("\n").match(/fetch\("\/api\/account"/g) ?? []).length, 1);
    assert.match(session, /useAccountHydration\(\)/);
    assert.match(cta, /useAccountHydration\(\)/);
    assert.doesNotMatch(`${session}\n${cta}`, /useEffect|new AbortController|fetch\("\/api\/account"/);
  });

  it("revalidates explicitly, clears logout state, and cannot reuse an aborted session response", async () => {
    const [provider, session] = await Promise.all([
      source("src/components/auth/AccountHydrationProvider.tsx"),
      source("src/components/auth/AccountSession.tsx"),
    ]);
    assert.match(provider, /cache: "no-store"/);
    assert.match(provider, /hydrationFence\.current\.invalidate\(\)/);
    assert.match(provider, /hydrationFence\.current\.mayCommit\(ticket, snapshotRef\.current\)/);
    assert.match(provider, /commit\(\{ type: "signed-out" \}\)/);
    assert.match(provider, /commit\(\{ type: "logout" \}\)/);
    assert.match(provider, /authenticatedRequests\.invalidate\(\)/);
    assert.match(provider, /ACCOUNT_HYDRATION_REFRESH_EVENT/);
    assert.match(session, /onSubmit=\{submitLogout\}/);
    assert.match(session, /startLogoutTransport\(beginLogout\)/);
    assert.doesNotMatch(provider, /localStorage|sessionStorage|email|token|cookie/i);
  });

  it("never renders guest CTAs while session-backed account details are loading or unavailable", async () => {
    const [route, provider, session, response] = await Promise.all([
      source("src/app/api/account/route.ts"),
      source("src/components/auth/AccountHydrationProvider.tsx"),
      source("src/components/auth/AccountSession.tsx"),
      source("src/lib/accountResponse.ts"),
    ]);
    assert.match(route, /safeError\(502, "Account service is temporarily unavailable\.", true\)/);
    assert.match(response, /isAuthenticatedAccountFailure/);
    assert.match(provider, /"authenticated-unavailable"/);
    assert.match(session, /status === "loading"[\s\S]*Checking sign-in/);
    assert.match(session, /status === "authenticated-unavailable"[\s\S]*Signed-in session; account details unavailable/);
    const loading = session.slice(session.indexOf('if (status === "loading")'), session.indexOf('if (status === "reauthentication-required")'));
    assert.doesNotMatch(loading, /Sign in|Create account/);
    assert.match(session, /status === "reauthentication-required"[\s\S]*Session expired[\s\S]*Sign in again/);
  });

  it("keeps Payment Identity authoritative and refreshes presentation only after a successful mutation", async () => {
    const [provider, identity, identityRoute, identityClient, payment] = await Promise.all([
      source("src/components/auth/AccountHydrationProvider.tsx"),
      source("src/components/product/personal/IdentityInterface.tsx"),
      source("src/app/api/account/identity/route.ts"),
      source("src/lib/identity/serverClient.ts"),
      source("src/components/product/personal/PaymentIntentWorkspace.tsx"),
    ]);
    assert.match(identity, /authenticatedJson\("\/api\/account\/identity"/);
    assert.match(identity, /window\.dispatchEvent\(new Event\(ACCOUNT_HYDRATION_REFRESH_EVENT\)\)/);
    assert.match(identityRoute, /callIdentityApi\("PUT"/);
    assert.match(identityClient, /Authorization: `Bearer \$\{token\}`/);
    assert.match(payment, /\/api\/payment-intents/);
    assert.doesNotMatch(provider, /Authorization:|paymentScopes|\/api\/payment-intents|\/execute|\/receipt|identity\/route/i);
  });

  it("leaves email verification as server-session presentation, separate from account ownership", async () => {
    const [page, identity, provider] = await Promise.all([
      source("src/app/personal/identity/page.tsx"),
      source("src/components/product/personal/IdentityInterface.tsx"),
      source("src/components/auth/AccountHydrationProvider.tsx"),
    ]);
    assert.match(page, /session\.user\.email_verified === true/);
    assert.match(identity, /This does not change your Payment Identity or payment ownership/);
    assert.doesNotMatch(provider, /emailVerified|email_verified|providerSubject|actorSubject/);
  });
});
