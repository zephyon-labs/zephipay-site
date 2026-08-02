import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

import { isAccountResponse } from "../src/lib/accountResponse";

describe("account BFF contract", () => {
  it("accepts only canonical actor/account responses", () => {
    const id = "00000000-0000-4000-8000-000000000001";
    assert.equal(isAccountResponse({ ok: true, account: { id, actorSubject: `zp:account:${id}`, status: "active", createdAt: new Date().toISOString(), identities: [] } }), true);
    assert.equal(isAccountResponse({ ok: true, account: { id, actorSubject: "forged", status: "active", createdAt: "now", identities: [] } }), false);
    assert.equal(isAccountResponse({ ok: true, token: "must-not-pass" }), false);
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
