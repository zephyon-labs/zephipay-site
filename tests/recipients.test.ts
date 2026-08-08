import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

import { parseRecipientResolveResponse, parseRecipientSearchResponse, type PublicRecipient } from "../src/lib/recipients/contract";
import { normalizeRecipientError } from "../src/lib/recipients/errors";
import { parseRecipientSearchInput, validRecipientAccountId } from "../src/lib/recipients/requests";
import { canReachDirectoryHandoff, openAdvancedWallet, selectDirectoryRecipient, trustModeFor } from "../src/lib/recipients/recipientState";

const accountId = "00000000-0000-4000-8000-000000000001";
const recipient = (overrides: Partial<PublicRecipient> = {}): PublicRecipient => ({
  accountId, username: "Recipient_01", displayName: "Recipient Example", accountType: "personal",
  verificationState: "unverified", payabilityState: "available", ...overrides,
});

describe("recipient public contract", () => {
  it("accepts only the exact privacy-safe search and resolution projections", () => {
    assert.deepEqual(parseRecipientSearchResponse({ ok: true, recipients: [recipient()] })?.recipients[0], recipient());
    assert.deepEqual(parseRecipientResolveResponse({ ok: true, recipient: recipient({ verificationState: "verified" }) })?.recipient.verificationState, "verified");
    assert.equal(parseRecipientSearchResponse({ ok: true, recipients: [recipient(), recipient({ accountId: accountId.replace(/1$/, "2") })] }), undefined);
    for (const privateField of ["walletAddress", "email", "issuer", "subject", "actorSubject", "status", "allowlist", "version", "createdAt", "verificationEvidence", "zts", "transactions"]) {
      assert.equal(parseRecipientSearchResponse({ ok: true, recipients: [{ ...recipient(), [privateField]: "private" }] }), undefined);
    }
    assert.equal(parseRecipientResolveResponse({ ok: true, recipient: recipient(), requestId: "extra" }), undefined);
  });

  it("rejects malformed identifiers, enums, avatars, and over-broad roots", () => {
    for (const malformed of [
      recipient({ accountId: "bad" }), recipient({ accountType: "social" as PublicRecipient["accountType"] }),
      recipient({ verificationState: "authenticated" as PublicRecipient["verificationState"] }),
      recipient({ payabilityState: "enabled" as PublicRecipient["payabilityState"] }),
      { ...recipient(), avatarUrl: "http://tracking.example/avatar" },
    ]) assert.equal(parseRecipientResolveResponse({ ok: true, recipient: malformed }), undefined);
    assert.equal(parseRecipientSearchResponse({ ok: true, recipients: [], token: "secret" }), undefined);
  });
});

describe("recipient requests and safe errors", () => {
  it("forwards one exact username field and rejects blank or unexpected input", () => {
    assert.deepEqual(parseRecipientSearchInput({ username: " Recipient_01 " }), { username: "Recipient_01" });
    for (const value of [{ username: "" }, { username: "   " }, { username: "user", email: "x@example.com" }, { displayName: "Alex" }, null]) {
      assert.equal(parseRecipientSearchInput(value), undefined);
    }
    assert.equal(validRecipientAccountId(accountId), true);
    assert.equal(validRecipientAccountId("not-an-account"), false);
  });

  it("normalizes rate limits and infrastructure failures without upstream details", () => {
    assert.equal(normalizeRecipientError(429).body.error, "Too many recipient searches. Wait a moment and try again.");
    assert.equal(normalizeRecipientError(500).body.error, "Recipient search is temporarily unavailable.");
    assert.doesNotMatch(JSON.stringify(normalizeRecipientError(500)), /stack|database|token/i);
  });
});

describe("trust and mutually exclusive modes", () => {
  it("uses only backend verification and payability states", () => {
    assert.equal(trustModeFor("verified"), "ready");
    assert.equal(trustModeFor("unverified"), "confirmation_required");
    assert.equal(trustModeFor("pending"), "confirmation_required");
    assert.equal(trustModeFor("restricted"), "blocked");
    assert.equal(canReachDirectoryHandoff(recipient({ verificationState: "verified" }), false), true);
    assert.equal(canReachDirectoryHandoff(recipient({ verificationState: "unverified" }), false), false);
    assert.equal(canReachDirectoryHandoff(recipient({ verificationState: "unverified" }), true), true);
    assert.equal(canReachDirectoryHandoff(recipient({ verificationState: "restricted" }), true), false);
    assert.equal(canReachDirectoryHandoff(recipient({ payabilityState: "unavailable" }), true), false);
  });

  it("clears recipient trust when opening wallet and clears wallet when selecting recipient", () => {
    const selected = recipient();
    assert.deepEqual(openAdvancedWallet({ advancedWalletOpen: false, walletAddress: "wallet", selectedRecipient: selected, trustAcknowledged: true }), {
      advancedWalletOpen: true, walletAddress: "wallet", trustAcknowledged: false,
    });
    assert.deepEqual(selectDirectoryRecipient({ advancedWalletOpen: true, walletAddress: "wallet", trustAcknowledged: true }, selected), {
      advancedWalletOpen: false, walletAddress: "", selectedRecipient: selected, trustAcknowledged: false,
    });
  });
});

describe("recipient BFF and UI invariants", () => {
  it("keeps authenticated tokens server-only with origin, timeout, and no-store controls", async () => {
    const client = await source("src/lib/recipients/serverClient.ts");
    const search = await source("src/app/api/recipients/search/route.ts");
    const resolve = await source("src/app/api/recipients/[accountId]/route.ts");
    const response = await source("src/lib/recipients/routeResponse.ts");
    assert.match(client, /import "server-only"/); assert.match(client, /getSession\(\)/);
    assert.match(client, /getAccessToken\(\{ audience, scope: "read:account" \}\)/);
    assert.match(client, /Authorization: `Bearer \$\{token\}`/); assert.match(client, /AbortSignal\.timeout\(5_000\)/);
    assert.match(client, /cache: "no-store"/); assert.doesNotMatch(client, /token[^\n]*body/);
    assert.match(search, /hasTrustedOrigin/); assert.match(search, /parseRecipientSearchInput/);
    assert.match(resolve, /validRecipientAccountId/); assert.match(response, /no-store, private/);
  });

  it("implements explicit search, bounded async states, stale protection, and fresh resolution", async () => {
    const ui = await source("src/components/product/personal/RecipientExperience.tsx");
    assert.match(ui, /<form onSubmit=\{search\}/); assert.match(ui, /type="submit"/);
    assert.match(ui, /status === "loading"/); assert.match(ui, /rate_limited/); assert.match(ui, /No payment identity found/);
    assert.match(ui, /requestSequence/); assert.match(ui, /AbortController/); assert.match(ui, /sequence !== requestSequence\.current/);
    assert.match(ui, /\/api\/recipients\/\$\{encodeURIComponent\(recipient\.accountId\)\}/);
    assert.match(ui, /parseRecipientResolveResponse/); assert.doesNotMatch(ui, /localStorage|sessionStorage|router\.|searchParams/);
    assert.doesNotMatch(ui, /type="email"|name="email"|name="displayName"|placeholder="email/i);
  });

  it("provides focus, live-region, trust, and intent-creation boundaries", async () => {
    const ui = await source("src/components/product/personal/RecipientExperience.tsx");
    assert.match(ui, /role="status"/); assert.match(ui, /aria-live="polite"/); assert.match(ui, /warningHeading\.current\?\.focus/);
    assert.match(ui, /requestAnimationFrame\(\(\) => resultAction\.current\?\.focus/);
    assert.match(ui, /Identity not verified/); assert.match(ui, /Identity verification pending/); assert.match(ui, /Continue anyway/);
    assert.match(ui, /Recipient unavailable/); assert.match(ui, /no payment has been created/);
    assert.match(ui, /temporary and is not yet stored/); assert.match(ui, /\/api\/payment-intents/);
    assert.doesNotMatch(ui, /wallet address resolved|funds processing/i);
  });

  it("keeps Advanced Wallet collapsed, mutually exclusive, and backward compatible", async () => {
    const workspace = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
    assert.match(workspace, /useState\(false\)/); assert.match(workspace, /setOpen\(!open\)/);
    assert.match(workspace, /setAdvancedOpen\(false\)/);
    assert.match(workspace, /setResetKey/); assert.match(workspace, /No Solana transaction is submitted/);
    assert.match(workspace, /fetch\("\/api\/payment-intents"/); assert.match(workspace, /recipient:wallet\.trim\(\)/);
    assert.match(workspace, /isCanonicalSolanaAddressInput/); assert.match(workspace, /\/personal\/send\?intent=/);
  });
});

async function source(path: string) { return readFile(new URL(`../${path}`, import.meta.url), "utf8"); }
