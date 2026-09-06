import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { act } from "react-test-renderer";
import {
  accountResponse, buttons, click, deferred, field, flush, intent, INTENT_ID,
  mountPayment, PaymentApi, populate, review, text, visible,
} from "./helpers/round1Harness";

let mounted: Awaited<ReturnType<typeof mountPayment>> | undefined;
afterEach(async () => { await mounted?.close(); mounted = undefined; });

describe("Round 1 mounted Send draft ownership", () => {
  for (const signal of ["focus", "visible", "periodic"] as const) {
    it("preserves typed input across same-account " + signal + " revalidation while removing controls", async () => {
      mounted = await mountPayment();
      const { api, browser, renderer } = mounted;
      await populate(renderer, "@recipient", "12.345", "Shared dinner");
      const check = deferred<Response>();
      api.accountRead = () => check.promise;
      browser.advance(signal === "periodic" ? 300_000 : 6_000);
      await act(async () => { browser.signal(signal); await flush(); });
      assert.equal(renderer.root.findAllByType("input").filter(visible).length, 0);
      assert.equal(buttons(renderer, "Review payment").length, 0);
      assert.equal(api.mutations().length, 0);
      await act(async () => { check.resolve(accountResponse("account-a")); await flush(); });
      assert.equal(field(renderer, "@username").props.value, "@recipient");
      assert.equal(field(renderer, "0.00").props.value, "12.345");
      assert.equal(field(renderer, "What is this payment for?").props.value, "Shared dinner");
      assert.equal(buttons(renderer, "Review payment").length, 1);
    });
  }

  it("retains only typed fields through transient same-account failures and a fresh authority check", async () => {
    mounted = await mountPayment();
    const { api, browser, renderer } = mounted;
    await populate(renderer);
    api.accountRead = async () => new Response("unavailable", { status: 503 });
    browser.advance();
    await act(async () => { browser.signal("visible"); await flush(); });
    assert.equal(buttons(renderer, "Review payment").length, 0);
    api.accountRead = undefined;
    await click(renderer, "Test refresh authority");
    assert.equal(field(renderer, "@username").props.value, "@recipient");
    const draft = JSON.parse(text(renderer.root.findByProps({ id: "typed-draft" })));
    assert.deepEqual(Object.keys(draft).sort(), ["amount", "purpose", "recipientMode", "username", "walletAddress"]);
    assert.equal(draft.purpose, "Dinner");
  });

  for (const exit of ["logout", "signed-out", "expired"] as const) {
    it("clears draft after " + exit + " even when the same account later signs in", async () => {
      mounted = await mountPayment();
      const { api, browser, renderer } = mounted;
      await populate(renderer);
      if (exit === "logout") await click(renderer, "Test logout");
      else {
        api.accountRead = async () => new Response(JSON.stringify({ ok: false }), {
          status: 401, headers: exit === "expired" ? { "X-ZephiPay-Auth-State": "reauthentication-required" } : {},
        });
        browser.advance();
        await act(async () => { browser.signal("focus"); await flush(); });
      }
      assert.equal(buttons(renderer, "Review payment").length, 0);
      api.accountRead = undefined;
      await click(renderer, "Test refresh authority");
      assert.equal(field(renderer, "@username").props.value, "");
      assert.equal(field(renderer, "0.00").props.value, "");
      assert.equal(field(renderer, "What is this payment for?").props.value, "");
    });
  }

  it("never makes User A draft available to User B or resurrects it when A returns", async () => {
    mounted = await mountPayment();
    const { api, browser, renderer } = mounted;
    await populate(renderer, "@private_recipient", "9", "Private purpose");
    for (const account of ["account-b", "account-a"]) {
      api.account = account;
      browser.advance();
      await act(async () => { browser.signal("focus"); await flush(); });
      assert.equal(field(renderer, "@username").props.value, "");
      assert.equal(field(renderer, "What is this payment for?").props.value, "");
      assert.doesNotMatch(text(renderer.root), /private_recipient|Private purpose/);
    }
  });

  it("re-resolves recipient verification and acknowledgement instead of retaining trust with the draft", async () => {
    const api = new PaymentApi(); api.recipientVerified = false;
    mounted = await mountPayment({ api });
    const { browser, renderer } = mounted;
    await populate(renderer);
    await review(renderer);
    const acknowledgment = renderer.root.findAllByType("input").find(node => node.props.type === "checkbox" && visible(node));
    assert.ok(acknowledgment);
    await act(async () => acknowledgment.props.onChange({ target: { checked: true } }));
    browser.advance();
    await act(async () => { browser.signal("focus"); await flush(); });
    assert.equal(field(renderer, "@username").props.value, "@recipient");
    assert.equal(renderer.root.findAllByType("input").filter(node => node.props.type === "checkbox" && visible(node)).length, 0);
    await review(renderer);
    assert.equal(api.calls.filter(call => call.url === "/api/recipients/search").length, 2);
    assert.equal(api.mutations().length, 0);
    assert.equal(renderer.root.findAllByType("input").find(node => node.props.type === "checkbox" && visible(node))?.props.checked, false);
  });
});

describe("Round 1 mounted URL recovery", () => {
  it("recovers a newly created in-place intent from the current URL after the whole account subtree remounts", async () => {
    mounted = await mountPayment({ personal: true });
    const { api, browser, renderer } = mounted;
    await populate(renderer);
    await review(renderer);
    assert.equal(browser.url.searchParams.get("intent"), INTENT_ID);
    assert.equal(buttons(renderer, "Send payment").length, 1);
    const before = api.calls.filter(call => call.url === "/api/payment-intents/" + INTENT_ID).length;
    browser.advance();
    await act(async () => { browser.signal("focus"); await flush(); });
    await act(async () => { await flush(); });
    assert.ok(api.calls.filter(call => call.url === "/api/payment-intents/" + INTENT_ID).length > before);
    assert.equal(buttons(renderer, "Send payment").length, 1);
    assert.equal(api.mutations().length, 1);
  });

  it("clears a server-provided recovered completion and never resurrects it through tab navigation", async () => {
    const api = new PaymentApi(); api.paymentIntent = intent("processing"); api.status = "settled";
    mounted = await mountPayment({ api, personal: true, url: "/personal?intent=" + INTENT_ID, serverRecoveryId: INTENT_ID });
    const { browser, renderer } = mounted;
    assert.match(text(renderer.root), /Your payment is complete/);
    await click(renderer, "Send another payment");
    assert.equal(browser.url.searchParams.has("intent"), false);
    assert.equal(field(renderer, "0.00").props.value, "");
    const reads = api.calls.filter(call => call.url === "/api/payment-intents/" + INTENT_ID).length;
    await click(renderer, "Request");
    await click(renderer, "Send");
    assert.equal(buttons(renderer, "Review payment").length, 1);
    assert.equal(api.calls.filter(call => call.url === "/api/payment-intents/" + INTENT_ID).length, reads);
    assert.doesNotMatch(text(renderer.root), /Your payment is complete/);
    assert.equal(api.mutations().length, 0);
  });

  it("keeps ordinary input on Back but clears its old URL pointer", async () => {
    mounted = await mountPayment();
    const { browser, renderer } = mounted;
    await populate(renderer);
    await review(renderer);
    await click(renderer, "Back");
    assert.equal(browser.url.searchParams.has("intent"), false);
    assert.equal(field(renderer, "@username").props.value, "@recipient");
    assert.equal(field(renderer, "0.00").props.value, "2");
  });

  for (const query of ["?intent=bad", "?intent=" + INTENT_ID + "&intent=" + INTENT_ID]) {
    it("ignores invalid or duplicate URL pointers instead of falling back to stale server input: " + query, async () => {
      mounted = await mountPayment({ url: "/personal/send" + query, serverRecoveryId: INTENT_ID });
      assert.equal(buttons(mounted.renderer, "Review payment").length, 1);
      assert.equal(mounted.api.calls.some(call => call.url.startsWith("/api/payment-intents/")), false);
    });
  }
});

describe("Round 1 mounted uncertain Mock execution", () => {
  for (const failure of ["lost", "invalid-json", "invalid-shape", "unavailable"] as const) {
    it("fences " + failure + " after POST contact and permits only GET recovery", async () => {
      const api = new PaymentApi(); api.executionFailure = failure; api.executionReadsUnavailable = true;
      mounted = await mountPayment({ api });
      const { renderer, browser } = mounted;
      await populate(renderer);
      await review(renderer);
      const send = buttons(renderer, "Send payment")[0].props.onClick, back = buttons(renderer, "Back")[0].props.onClick;
      await click(renderer, "Send payment");
      const afterContact = api.mutations().length;
      assert.equal(api.calls.filter(call => call.url.endsWith("/execute")).length, 1);
      assert.equal(buttons(renderer, "Send payment").length, 0);
      assert.equal(buttons(renderer, "Back").length, 0);
      assert.equal(buttons(renderer, "Review payment").length, 0);
      assert.equal(buttons(renderer, "Start another payment").length, 0);
      await act(async () => { await send(); back(); await flush(); });
      assert.equal(api.mutations().length, afterContact);
      const hiddenCompose = renderer.root.findAllByType("form")[0];
      assert.ok(hiddenCompose);
      await act(async () => { await hiddenCompose.props.onSubmit({ preventDefault() {} }); await flush(); });
      assert.equal(api.mutations().length, afterContact);
      await click(renderer, "Check payment status");
      assert.equal(api.mutations().length, afterContact);
      assert.ok(api.calls.some(call => call.url.endsWith("/execution") && call.method === "GET"));
      // Revalidation discards local attempt flags. The surviving URL must still
      // recover authoritative processing state rather than re-open compose.
      browser.advance();
      await act(async () => { browser.signal("focus"); await flush(); });
      await act(async () => { await flush(); });
      assert.equal(buttons(renderer, "Review payment").length, 0);
      assert.equal(buttons(renderer, "Send payment").length, 0);
      assert.equal(api.mutations().length, afterContact);
    });
  }

  it("resolves an uncertain POST through GET settlement and the durable receipt without another execution", async () => {
    const api = new PaymentApi(); api.executionFailure = "lost"; api.executionReadsUnavailable = true;
    mounted = await mountPayment({ api });
    const { renderer, browser } = mounted;
    await populate(renderer); await review(renderer); await click(renderer, "Send payment");
    api.executionReadsUnavailable = false; api.status = "settled";
    await click(renderer, "Check payment status");
    assert.match(text(renderer.root), /Your payment is complete/);
    assert.equal(api.calls.filter(call => call.url.endsWith("/execute")).length, 1);
    await click(renderer, "Send another payment");
    assert.equal(browser.url.search, "");
    assert.equal(field(renderer, "0.00").props.value, "");
  });

  it("withholds success and another-payment actions until a settled execution yields its durable receipt", async () => {
    const api = new PaymentApi(); api.status = "settled"; api.receiptUnavailable = true;
    mounted = await mountPayment({ api });
    const { renderer } = mounted;
    await populate(renderer); await review(renderer); await click(renderer, "Send payment");
    assert.doesNotMatch(text(renderer.root), /Your payment is complete/);
    assert.equal(buttons(renderer, "Send another payment").length, 0);
    assert.equal(buttons(renderer, "Send payment").length, 0);
    const executionReads = api.calls.filter(call => call.url.endsWith("/execution")).length;
    assert.equal(executionReads, 0, "Receipt unavailability must not reopen settled execution recovery");
    api.receiptUnavailable = false;
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 2_100)); });
    assert.match(text(renderer.root), /Your payment is complete/);
    assert.equal(api.calls.filter(call => call.url.endsWith("/execute")).length, 1);
    assert.equal(api.calls.filter(call => call.url.endsWith("/execution")).length, executionReads);
  });

  for (const status of ["failed", "cancelled"] as const) {
    it("preserves start-another behavior for authoritative " + status, async () => {
      const api = new PaymentApi(); api.status = status;
      mounted = await mountPayment({ api });
      const { renderer, browser } = mounted;
      await populate(renderer); await review(renderer); await click(renderer, "Send payment");
      assert.equal(buttons(renderer, "Start another payment").length, 1);
      assert.equal(api.calls.some(call => call.url.endsWith("/receipt")), false);
      await click(renderer, "Start another payment");
      assert.equal(browser.url.search, "");
      assert.equal(field(renderer, "0.00").props.value, "");
      assert.equal(api.calls.filter(call => call.url.endsWith("/execute")).length, 1);
    });
  }
});

describe("Round 1 mounted Devnet availability", () => {
  it("disables new public Devnet initiation and guards even a stale/programmatic compose callback", async () => {
    mounted = await mountPayment();
    const { api, renderer, browser } = mounted;
    const mode = buttons(renderer, "Solana Devnet wallet")[0];
    assert.equal(mode.props.disabled, true);
    await act(async () => mode.props.onClick());
    assert.equal(buttons(renderer, "Review payment")[0].props.disabled, true);
    await populateWallet();
    browser.advance();
    await act(async () => { browser.signal("focus"); await flush(); });
    assert.equal(buttons(renderer, "Solana Devnet wallet")[0].props["aria-pressed"], true);
    assert.equal(field(renderer, "Solana wallet address").props.value, "11111111111111111111111111111111");
    assert.equal(field(renderer, "0.00").props.value, "2");
    await review(renderer);
    assert.equal(api.mutations().length, 0);
    assert.match(text(renderer.root), /New Solana Devnet payments are not included/);
    async function populateWallet() {
      await act(async () => field(renderer, "Solana wallet address").props.onChange({ target: { value: "11111111111111111111111111111111" } }));
      await act(async () => field(renderer, "0.00").props.onChange({ target: { value: "2" } }));
    }
  });

  for (const status of ["awaiting_confirmation", "processing"] as const) {
    it("keeps existing " + status + " Devnet intent recovery and status checks GET-only", async () => {
      const api = new PaymentApi(); api.paymentIntent = intent(status, true);
      mounted = await mountPayment({ api, url: "/personal/send?intent=" + INTENT_ID });
      const { renderer } = mounted;
      assert.equal(buttons(renderer, "Send on Solana Devnet").length, 0);
      assert.equal(buttons(renderer, "Send payment").length, 0);
      assert.equal(buttons(renderer, "Back").length, 0);
      await click(renderer, "Check Devnet status");
      assert.ok(api.calls.some(call => call.url.endsWith("/devnet/execution")));
      assert.equal(api.mutations().length, 0);
      assert.match(text(renderer.root), /Verifying transaction status/);
    });
  }

  it("displays an existing authoritative settled Devnet receipt without creating or executing anything", async () => {
    const api = new PaymentApi(); api.paymentIntent = intent("processing", true); api.devnetStatus = "settled";
    mounted = await mountPayment({ api, url: "/personal/send?intent=" + INTENT_ID });
    assert.match(text(mounted.renderer.root), /Your payment is complete/);
    assert.ok(api.calls.some(call => call.url.endsWith("/receipt")));
    assert.equal(api.mutations().length, 0);
  });
});
