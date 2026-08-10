import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

import { parseIdentityReadResponse, parseIdentityWriteResponse } from "../src/lib/identity/contract";
import { parseIdentityWriteInput, toBackendIdentityWrite } from "../src/lib/identity/requests";

const identity = {
  accountId: "11111111-1111-4111-8111-111111111111", accountType: "personal", username: "Alice_01", displayName: "Alice Example",
  avatarUrl: "https://example.com/alice.png", publicIdentityStatus: "active", discoverability: "private", verificationState: "unverified",
  payabilityState: "unavailable", version: "0", createdAt: "2026-08-06T12:00:00.000Z", updatedAt: "2026-08-06T12:00:00.000Z",
};

describe("Economic Identity site contract", () => {
  it("strictly projects the privacy-safe current identity and rejects malformed upstream responses", () => {
    assert.deepEqual(parseIdentityReadResponse({ ok: true, identity, destinations: [] }), { ok: true, identity: {
      accountType: "personal", username: "Alice_01", displayName: "Alice Example", avatarUrl: "https://example.com/alice.png",
      discoverability: "private", verificationState: "unverified", payabilityState: "unavailable", version: "0",
    } });
    assert.equal(parseIdentityReadResponse({ ok: true, identity: { ...identity, email: "private@example.com" }, destinations: [] }), undefined);
    assert.equal(parseIdentityWriteResponse({ ok: true, identity: { ...identity, verificationState: "invented" } }), undefined);
    assert.equal(parseIdentityReadResponse({ ok: true, identity, destinations: [], actorSubject: "forbidden" }), undefined);
  });

  it("accepts only editable fields and produces the narrowed backend request", () => {
    const parsed = parseIdentityWriteInput({ username: "Alice_01", displayName: "Alice Example", avatarUrl: "https://example.com/a.png", discoverability: "username_only", expectedVersion: "4" });
    assert.deepEqual(toBackendIdentityWrite(parsed!), { username: "Alice_01", displayName: "Alice Example", avatarUrl: "https://example.com/a.png", discoverability: "USERNAME_ONLY", expectedVersion: "4" });
    for (const field of ["accountType", "verificationState", "payabilityState", "publicIdentityStatus", "accountId", "email", "actorSubject", "createdAt"]) {
      assert.equal(parseIdentityWriteInput({ username: "Alice_01", displayName: "Alice", discoverability: "private", [field]: "forbidden" }), undefined);
    }
    assert.equal(parseIdentityWriteInput({ username: "ab", displayName: "Alice", discoverability: "private" }), undefined);
    assert.equal(parseIdentityWriteInput({ username: "Alice_01", displayName: " ", discoverability: "private" }), undefined);
    assert.equal(parseIdentityWriteInput({ username: "Alice_01", displayName: "Alice", avatarUrl: "http://example.com/a.png", discoverability: "private" }), undefined);
  });

  it("keeps the BFF authenticated, same-origin, bounded, uncached, and server-only", async () => {
    const route = await readFile(new URL("../src/app/api/account/identity/route.ts", import.meta.url), "utf8");
    const client = await readFile(new URL("../src/lib/identity/serverClient.ts", import.meta.url), "utf8");
    const errors = await readFile(new URL("../src/lib/identity/errors.ts", import.meta.url), "utf8");
    assert.match(route, /hasTrustedOrigin\(request\)/); assert.match(route, /parseIdentityWriteInput/); assert.match(route, /private, no-store/);
    assert.match(client, /getSession\(\)/); assert.match(client, /getAccessToken/); assert.match(client, /AbortSignal\.timeout\(5_000\)/);
    assert.match(client, /cache: "no-store"/); assert.match(errors, /USERNAME_UNAVAILABLE/); assert.match(errors, /VERSION_CONFLICT/);
    assert.doesNotMatch(route, /Authorization/);
  });

  it("provides the approved workspace, accessibility, trust copy, and authority boundaries", async () => {
    const page = await readFile(new URL("../src/app/personal/identity/page.tsx", import.meta.url), "utf8");
    const ui = await readFile(new URL("../src/components/product/personal/IdentityInterface.tsx", import.meta.url), "utf8");
    assert.match(page, /getSession\(\)/); assert.match(page, /returnTo=%2Fpersonal%2Fidentity/);
    for (const phrase of ["Create your Payment Identity", "Save changes", "Reload latest", "You have unsaved changes", "Identity verification has not been completed", "Verification incomplete", "Identity verified", "Identity restricted", "Available for payments", "Not currently available", "Payment availability restricted", "Verified does not mean public", "verification onboarding is not yet available in this beta", "Authentication, email verification, and beta authorization are not KYC"]) assert.match(ui, new RegExp(phrase));
    assert.match(ui, /<fieldset>/); assert.match(ui, /aria-live="polite"/); assert.match(ui, /aria-invalid/); assert.match(ui, /document\.getElementById\(first\)\?\.focus/);
    assert.doesNotMatch(ui, /Trust Score|Zephyon Trust Score|Verify now|wallet address|actor subject|transaction history/iu);
  });
});
