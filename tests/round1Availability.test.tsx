import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { readFile } from "node:fs/promises";
import { ActivityInterfacePreview } from "../src/components/product/personal/ActivityInterfacePreview";
import { VerifiedReceiptInterface } from "../src/components/product/personal/VerifiedReceiptInterface";
import { navigationSections } from "../src/components/navigation/navigation-data";
import { AT, buttons, click, EXECUTION_ID, INTENT_ID, json, mountPayment, PaymentApi, RECIPIENT_ID, text } from "./helpers/round1Harness";

let mounted: Awaited<ReturnType<typeof mountPayment>> | undefined;
afterEach(async () => { await mounted?.close(); mounted = undefined; });

describe("Round 1 receipt truthfulness", () => {
  it("direct receipt preview clearly disclaims account history and links to real Personal Activity", async () => {
    mounted = await mountPayment({ url: "/personal/receipts", content: <VerifiedReceiptInterface /> });
    const copy = text(mounted.renderer.root);
    assert.match(copy, /unavailable preview, not your account receipt history/);
    assert.doesNotMatch(copy, /0 records|No receipts to display|Authenticated payment receipts matching/);
    const links = mounted.renderer.root.findAllByType("a");
    assert.ok(links.some(link => link.props.href === "/personal/activity#activity-interface"));
    assert.equal(mounted.api.calls.some(call => call.url.includes("/receipt")), false);
    const route = await readFile(new URL("../src/app/personal/receipts/page.tsx", import.meta.url), "utf8");
    assert.match(route, /<VerifiedReceiptInterface/);
    assert.match(route, /Open Personal Activity/);
  });

  it("Verified receipts navigation enters authoritative activity, whose settled record opens durable recovery", async () => {
    const receiptLink = navigationSections.find(section => section.label === "Personal")?.groups.flatMap(group => group.links).find(link => link.label === "Verified receipts");
    assert.equal(receiptLink?.href, "/personal/activity#activity-interface");
    const api = new PaymentApi();
    api.activity = [{
      paymentIntentId: INTENT_ID, executionId: EXECUTION_ID, receiptId: "receipt:round1-durable", status: "completed",
      recipient: { type: "payment_identity", displayName: "Recipient Example", username: "recipient", verificationState: "verified", trustOutcome: "not_required" },
      amountRaw: "2000000", amount: "2", asset: "USDC", memo: "Dinner", createdAt: AT, settledAt: AT, receiptAvailable: true,
    }];
    mounted = await mountPayment({ api, url: "/personal/activity", content: <ActivityInterfacePreview /> });
    const links = mounted.renderer.root.findAllByType("a");
    assert.ok(links.some(link => text(link) === "View durable receipt" && link.props.href === "/personal/send?intent=" + INTENT_ID));
    assert.match(text(mounted.renderer.root), /Payment sent/);
    assert.equal(api.mutations().length, 0);
  });
});

describe("Round 1 read-only Request availability", () => {
  for (const signedIn of [true, false]) {
    it("offers no Request creation or sign-in-unlock promise when " + (signedIn ? "signed in" : "signed out"), async () => {
      const api = new PaymentApi();
      if (!signedIn) api.accountRead = async () => json({ ok: false }, 401);
      mounted = await mountPayment({ api, personal: true });
      await click(mounted.renderer, "Request");
      assert.match(text(mounted.renderer.root), /Request is unavailable in this beta round/);
      assert.doesNotMatch(text(mounted.renderer.root), /Sign in to request|Review request|Send request/);
      assert.equal(mounted.renderer.root.findAllByType("form").length, 0);
      assert.equal(api.mutations().length, 0);
    });
  }

  it("keeps existing sent, received, and accepted records readable without Accept, Decline, Cancel, or payment actions", async () => {
    const api = new PaymentApi();
    const party = (accountId: string, username: string) => ({ accountId, username, displayName: username, accountType: "personal", verificationState: "verified", capturedAt: AT, schemaVersion: 1 });
    const base = {
      requestId: INTENT_ID, role: "payer", direction: "request_received", status: "pending", version: "0", requestHash: "a".repeat(64),
      requester: party(RECIPIENT_ID, "requester"), payer: party(EXECUTION_ID, "payer"),
      amountRaw: "2000000", amount: "2", asset: "USDC", purpose: "Existing request", createdAt: AT, updatedAt: AT,
    };
    api.requests = [
      base,
      { ...base, requestId: EXECUTION_ID, role: "requester", direction: "requested" },
      { ...base, requestId: RECIPIENT_ID, status: "accepted", linkedPaymentIntentId: INTENT_ID },
    ];
    const before = JSON.stringify(api.requests);
    mounted = await mountPayment({ api, personal: true });
    assert.match(text(mounted.renderer.root), /Request from @requester/);
    assert.match(text(mounted.renderer.root), /Requested from @payer/);
    assert.match(text(mounted.renderer.root), /Accepted — payment not completed/);
    for (const label of ["Accept", "Decline", "Cancel request", "Review accepted payment", "Send request"]) {
      assert.equal(buttons(mounted.renderer, label).length, 0);
      assert.equal(mounted.renderer.root.findAllByType("a").some(link => text(link) === label), false);
    }
    await click(mounted.renderer, "Request");
    await click(mounted.renderer, "Send");
    assert.equal(JSON.stringify(api.requests), before);
    assert.equal(api.calls.filter(call => call.url.startsWith("/api/payment-requests") && call.method !== "GET").length, 0);
  });
});
