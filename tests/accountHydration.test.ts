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
    assert.match(layout, /<AccountHydrationProvider>\{children\}<\/AccountHydrationProvider>/);
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
    assert.match(provider, /activeRequest\.current\?\.abort\(\)/);
    assert.match(provider, /setAccount\(null\)[\s\S]*setStatus\("signed-out"\)/);
    assert.match(provider, /ACCOUNT_HYDRATION_REFRESH_EVENT/);
    assert.match(session, /onSubmit=\{clear\}/);
    assert.doesNotMatch(provider, /localStorage|sessionStorage|email|token|cookie/i);
  });

  it("keeps Payment Identity authoritative and refreshes presentation only after a successful mutation", async () => {
    const [provider, identity, identityRoute, identityClient, payment] = await Promise.all([
      source("src/components/auth/AccountHydrationProvider.tsx"),
      source("src/components/product/personal/IdentityInterface.tsx"),
      source("src/app/api/account/identity/route.ts"),
      source("src/lib/identity/serverClient.ts"),
      source("src/components/product/personal/PaymentIntentWorkspace.tsx"),
    ]);
    assert.match(identity, /fetch\("\/api\/account\/identity"/);
    assert.match(identity, /window\.dispatchEvent\(new Event\(ACCOUNT_HYDRATION_REFRESH_EVENT\)\)/);
    assert.match(identityRoute, /callIdentityApi\("PUT"/);
    assert.match(identityClient, /Authorization: `Bearer \$\{token\}`/);
    assert.match(payment, /\/api\/payment-intents/);
    assert.doesNotMatch(provider, /authorize|scope|payment-intents|execute|receipt|identity\/route/i);
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
