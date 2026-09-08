import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { act } from "react-test-renderer";
import { ROUND_ONE_DEVNET_EXECUTION_AVAILABLE, ROUND_ONE_DEVNET_NOTICE, ROUND_ONE_REQUESTS_AVAILABLE } from "../src/lib/round1Availability";
import { buttons, click, field, flush, INTENT_ID, mountPayment, PaymentApi, populate, review, text, WALLET } from "./helpers/round1Harness";

let mounted: Awaited<ReturnType<typeof mountPayment>> | undefined;
afterEach(async () => { await mounted?.close(); mounted = undefined; });

async function compose(wallet = WALLET, amount = "2") {
  assert.ok(mounted);
  const { renderer } = mounted;
  await click(renderer, "Solana Devnet wallet");
  for (const [placeholder, value] of [["Solana wallet address", wallet], ["0.00", amount], ["What is this payment for?", "Controlled beta"]]) {
    await act(async () => field(renderer, placeholder).props.onChange({ target: { value } }));
  }
}

describe("controlled Devnet beta activation", () => {
  it("enables only Devnet, keeps Request disabled, and uses truthful test-network copy", () => {
    assert.equal(ROUND_ONE_DEVNET_EXECUTION_AVAILABLE, true);
    assert.equal(ROUND_ONE_REQUESTS_AVAILABLE, false);
    assert.equal(ROUND_ONE_DEVNET_NOTICE, "Solana Devnet payments are available for controlled beta testing. Devnet assets have no real-world value.");
    assert.doesNotMatch(ROUND_ONE_DEVNET_NOTICE, /Mainnet|Phantom|not included/);
  });

  it("enables the wallet selector and reaches Devnet review from Personal Send without confirming or executing", async () => {
      mounted = await mountPayment();
      const { api, renderer } = mounted;
      assert.equal(buttons(renderer, "ZephiPay username")[0].props["aria-pressed"], true);
      assert.equal(buttons(renderer, "Solana Devnet wallet")[0].props.disabled, false);
      await compose();
      assert.match(text(renderer.root), /Mainnet is not supported/);
      assert.equal(api.mutations().length, 0);
      await review(renderer);
      assert.match(text(renderer.root), /Review Devnet payment/);
      assert.match(text(renderer.root), /available for controlled beta testing/);
      assert.match(text(renderer.root), /Devnet assets have no real-world value/);
      assert.equal(buttons(renderer, "Send on Solana Devnet").length, 1);
      assert.equal(buttons(renderer, "Send payment").length, 0);
      assert.deepEqual(api.mutations(), [{ url: "/api/payment-intents", method: "POST", body: { recipient: WALLET, amount: "2", purpose: "Controlled beta" } }]);
      assert.equal(api.calls.some(call => call.url.startsWith("/api/recipients")), false);
  });

  it("keeps the Personal workspace username-only and executes through the existing Mock Send contract", async () => {
    mounted = await mountPayment({ personal: true });
    const { api, renderer } = mounted;
    assert.equal(buttons(renderer, "Solana Devnet wallet").length, 0);
    await populate(renderer); await review(renderer);
    assert.equal(api.mutations().length, 1);
    assert.equal(api.mutations()[0].body?.recipientType, "payment_identity");
    await click(renderer, "Send payment");
    assert.equal(api.calls.filter(call => call.url.endsWith("/confirm")).length, 1);
    assert.equal(api.calls.filter(call => call.url === `/api/payment-intents/${INTENT_ID}/execute`).length, 1);
    assert.equal(api.calls.some(call => call.url.includes("/devnet/")), false);
  });

  for (const wallet of ["not-a-solana-address", ` ${WALLET}`, `${WALLET} `]) {
    it(`blocks invalid wallet input ${JSON.stringify(wallet)} before intent creation`, async () => {
      mounted = await mountPayment();
      await compose(wallet); await review(mounted.renderer);
      assert.match(text(mounted.renderer.root), /Enter a canonical Solana wallet address/);
      assert.equal(mounted.api.mutations().length, 0);
      assert.equal(buttons(mounted.renderer, "Send on Solana Devnet").length, 0);
    });
  }

  for (const amount of ["0", "-1", "1.0000001"]) {
    it(`blocks invalid amount ${amount} before intent creation`, async () => {
      mounted = await mountPayment();
      await compose(WALLET, amount); await review(mounted.renderer);
      assert.match(text(mounted.renderer.root), /Enter a positive USDC amount with no more than 6 decimal places/);
      assert.equal(mounted.api.mutations().length, 0);
    });
  }

  it("requires an explicit Send action, confirms the frozen hash/version, and then posts the exact Devnet contract once", async () => {
    const api = new PaymentApi(); api.allowDevnetExecution = true; api.devnetStatus = "accepted";
    mounted = await mountPayment({ api });
    const { renderer } = mounted;
    await compose(); await review(renderer);
    assert.equal(api.mutations().length, 1);
    const frozen = api.paymentIntent;
    await click(renderer, "Send on Solana Devnet");
    assert.deepEqual(api.mutations().slice(1), [
      { url: `/api/payment-intents/${INTENT_ID}/confirm`, method: "POST", body: { requestHash: frozen.requestHash, expectedVersion: frozen.version } },
      { url: `/api/payment-intents/${INTENT_ID}/devnet/execute`, method: "POST", body: { requestHash: frozen.requestHash, expectedVersion: "1", mode: "solana-devnet" } },
    ]);
    assert.equal(buttons(renderer, "Send on Solana Devnet").length, 0);
    assert.doesNotMatch(text(renderer.root), /Your payment is complete/);
    const details = buttons(renderer).find(button => button.props["aria-controls"] === "devnet-test-details");
    assert.ok(details);
    await act(async () => details.props.onClick());
    assert.match(text(renderer.root), /secure backend rail/);
    assert.match(text(renderer.root), /Connected Phantom provides test-wallet context and does not sign this payment/);
    assert.doesNotMatch(text(renderer.root), /Phantom (?:signs|funds|pays for|executes) (?:this|the|your) (?:payment|transaction)/i);
  });

  for (const failure of ["lost", "invalid-json", "invalid-shape", "unavailable"] as const) {
    it(`fences an ambiguous ${failure} execution response across stale callbacks, manual checks, and remount`, async () => {
      const api = new PaymentApi(); api.allowDevnetExecution = true; api.executionFailure = failure; api.executionReadsUnavailable = true;
      mounted = await mountPayment({ api });
      const { renderer } = mounted;
      await compose(); await review(renderer);
      const send = buttons(renderer, "Send on Solana Devnet")[0].props.onClick;
      await click(renderer, "Send on Solana Devnet");
      assert.equal(api.calls.filter(call => call.url.endsWith("/devnet/execute")).length, 1);
      const afterContact = api.mutations().length;
      assert.equal(afterContact, 3);
      assert.equal(buttons(renderer, "Send on Solana Devnet").length, 0);
      assert.equal(buttons(renderer, "Back").length, 0);
      await act(async () => { await send(); await flush(); });
      await click(renderer, "Check Devnet status");
      assert.equal(api.mutations().length, afterContact);
      assert.ok(api.calls.some(call => call.url.endsWith("/devnet/execution") && call.method === "GET"));
      assert.equal(api.calls.some(call => call.url.endsWith("/execute") && !call.url.endsWith("/devnet/execute")), false);
      const beforeRemount = api.calls.length;
      await mounted.close(); mounted = undefined;
      api.executionReadsUnavailable = false;
      mounted = await mountPayment({ api, url: `/personal/send?intent=${INTENT_ID}` });
      await click(mounted.renderer, "Check Devnet status");
      assert.ok(api.calls.slice(beforeRemount).every(call => call.method === "GET"));
      assert.equal(api.mutations().length, afterContact);
      assert.equal(buttons(mounted.renderer, "Send on Solana Devnet").length, 0);
      assert.match(text(mounted.renderer.root), /Verifying transaction status/);
    });
  }

  it("shows success only after the durable receipt and recovers it without another execution POST", async () => {
    const api = new PaymentApi(); api.allowDevnetExecution = true; api.devnetStatus = "settled"; api.receiptUnavailable = true;
    mounted = await mountPayment({ api });
    await compose(); await review(mounted.renderer); await click(mounted.renderer, "Send on Solana Devnet");
    assert.doesNotMatch(text(mounted.renderer.root), /Your payment is complete/);
    assert.equal(buttons(mounted.renderer, "Send another payment").length, 0);
    assert.equal(buttons(mounted.renderer, "Send on Solana Devnet").length, 0);
    api.receiptUnavailable = false;
    await click(mounted.renderer, "Check Devnet status");
    assert.match(text(mounted.renderer.root), /Your payment is complete and its durable receipt is available/);
    assert.equal(api.calls.filter(call => call.url.endsWith("/devnet/execute")).length, 1);
    assert.equal(api.mutations().length, 3);
    assert.ok(api.calls.filter(call => call.url.endsWith("/receipt")).every(call => call.method === "GET"));
  });
});
