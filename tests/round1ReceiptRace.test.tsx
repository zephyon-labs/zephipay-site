import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { act, type ReactTestRenderer } from "react-test-renderer";
import { usePathname, useRouter } from "next/navigation";
import { ProtectedAccountBoundary } from "../src/components/auth/AuthenticatedBoundary";
import { PersonalSendExperience } from "../src/components/product/personal/PersonalSendExperience";
import { EMPTY_SEND_DRAFT, useSendDraft } from "../src/components/product/personal/SendDraftProvider";
import { buttons, click, deferred, field, flush, intent, INTENT_ID, json, mountPayment, PaymentApi, populate, receipt, review, text } from "./helpers/round1Harness";

let mounted: Awaited<ReturnType<typeof mountPayment>> | undefined;
afterEach(async () => { await mounted?.close(); mounted = undefined; });

function RaceRoutes() {
  const pathname = usePathname(), router = useRouter(), saved = useSendDraft();
  return <>
    <output id="draft-generation">{saved?.generation}</output>
    <button onClick={() => saved?.update({ username: "@new_cycle", amount: "31", purpose: "New cycle input" })}>Edit draft from another surface</button>
    {pathname === "/personal/send"
      ? <ProtectedAccountBoundary returnTo="/personal/send"><PersonalSendExperience /></ProtectedAccountBoundary>
      : <button onClick={() => router.push("/personal/send")}>Return to Send</button>}
  </>;
}
function draft(renderer: ReactTestRenderer) { return JSON.parse(text(renderer.root.findByProps({ id: "typed-draft" }))); }
function generation(renderer: ReactTestRenderer) { return Number(text(renderer.root.findByProps({ id: "draft-generation" }))); }

function deferReceipts() {
  const transport = globalThis.fetch;
  const reads: ReturnType<typeof deferred<Response>>[] = [];
  globalThis.fetch = async (input, init) => {
    const response = await transport(input, init);
    if (!String(input).endsWith("/receipt")) return response;
    const read = deferred<Response>();
    reads.push(read);
    // Deliberately allow late responses even after a caller aborts, to prove
    // lifecycle ownership rather than depending on transport cancellation.
    return read.promise;
  };
  return reads;
}

async function startSettledPaymentWithPendingReceipts() {
  const api = new PaymentApi(); api.status = "settled";
  mounted = await mountPayment({ api, content: <RaceRoutes /> });
  const { renderer } = mounted, reads = deferReceipts();
  await populate(renderer); await review(renderer);
  const beforeReceipt = generation(renderer);
  let sending!: Promise<void>;
  await act(async () => { sending = buttons(renderer, "Send payment")[0].props.onClick(); await flush(); });
  await act(async () => { await flush(); });
  assert.equal(reads.length, 2, "Both the immediate and recovery-effect receipt GETs must be pending");
  assert.equal(draft(renderer).purpose, "Dinner");
  return { ...mounted, reads, sending, beforeReceipt };
}

describe("AUD-R1-01-RACE mounted receipt ownership", () => {
  for (const exit of ["Send another payment", "Personal Home"] as const) {
    it("keeps new Payment B input after " + exit + " when older duplicate receipt A1 arrives after A2", async () => {
      const { api, renderer, reads, sending } = await startSettledPaymentWithPendingReceipts();
      await act(async () => { reads[1].resolve(json(receipt())); await flush(); });
      assert.match(text(renderer.root), /Your payment is complete/);
      assert.deepEqual(draft(renderer), EMPTY_SEND_DRAFT);
      await click(renderer, exit);
      if (exit === "Personal Home") {
        assert.equal(renderer.root.findAllByType(PersonalSendExperience).length, 0);
        await click(renderer, "Return to Send");
      }
      await populate(renderer, "@payment_b", "17.25", "Private B purpose");
      const paymentB = draft(renderer), bGeneration = generation(renderer), mutations = api.mutations().length;
      await act(async () => { reads[0].resolve(json(receipt())); await sending; await flush(); });
      assert.deepEqual(draft(renderer), paymentB);
      assert.equal(generation(renderer), bGeneration);
      assert.equal(field(renderer, "@username").props.value, "@payment_b");
      assert.equal(field(renderer, "0.00").props.value, "17.25");
      assert.equal(field(renderer, "What is this payment for?").props.value, "Private B purpose");
      assert.equal(api.mutations().length, mutations);
      assert.equal(api.calls.filter(call => call.url.endsWith("/execute")).length, 1);
    });
  }

  it("displays a historical settled receipt without claiming or clearing an unrelated current draft", async () => {
    const api = new PaymentApi(); api.paymentIntent = intent("processing"); api.status = "settled";
    mounted = await mountPayment({ api, content: <RaceRoutes /> });
    const { renderer, browser } = mounted, reads = deferReceipts();
    await populate(renderer, "@unfinished_b", "23", "Unrelated draft B");
    const paymentB = draft(renderer), bGeneration = generation(renderer);
    await act(async () => { browser.navigate("/personal/send?intent=" + INTENT_ID); await flush(); });
    await act(async () => { await flush(); });
    assert.equal(reads.length, 1);
    await act(async () => { reads[0].resolve(json(receipt())); await flush(); });
    assert.match(text(renderer.root), /Your payment is complete/);
    assert.deepEqual(draft(renderer), paymentB);
    assert.equal(generation(renderer), bGeneration);
    await act(async () => { browser.navigate("/personal/send"); await flush(); });
    assert.equal(field(renderer, "@username").props.value, "@unfinished_b");
    assert.equal(api.mutations().length, 0);
  });

  it("clears normal completed draft A exactly once even if a second valid receipt arrives while the same flow is mounted", async () => {
    const { renderer, reads, sending, beforeReceipt } = await startSettledPaymentWithPendingReceipts();
    await act(async () => { reads[1].resolve(json(receipt())); await flush(); });
    assert.deepEqual(draft(renderer), EMPTY_SEND_DRAFT);
    assert.equal(generation(renderer), beforeReceipt + 1);
    await act(async () => { reads[0].resolve(json(receipt())); await sending; await flush(); });
    assert.deepEqual(draft(renderer), EMPTY_SEND_DRAFT);
    assert.equal(generation(renderer), beforeReceipt + 1, "Duplicate completion must not advance or clear the cycle again");
    assert.match(text(renderer.root), /Your payment is complete/);
  });

  it("fences an edited generation even while the old payment workspace is still mounted", async () => {
    const { renderer, reads, sending, beforeReceipt } = await startSettledPaymentWithPendingReceipts();
    await click(renderer, "Edit draft from another surface");
    const edited = draft(renderer), editedGeneration = generation(renderer);
    assert.ok(editedGeneration > beforeReceipt);
    assert.equal(renderer.root.findAllByType(PersonalSendExperience).length, 1);
    await act(async () => { reads[1].resolve(json(receipt())); await flush(); });
    assert.match(text(renderer.root), /Your payment is complete/);
    assert.deepEqual(draft(renderer), edited);
    await act(async () => { reads[0].resolve(json(receipt())); await sending; await flush(); });
    assert.deepEqual(draft(renderer), edited);
    assert.equal(generation(renderer), editedGeneration);
  });

  it("does not associate a delayed creation result with newer typed input", async () => {
    const api = new PaymentApi(); api.status = "settled";
    mounted = await mountPayment({ api, content: <RaceRoutes /> });
    const { renderer } = mounted, creation = deferred<Response>(), transport = globalThis.fetch;
    globalThis.fetch = async (input, init) => {
      const response = await transport(input, init);
      return String(input) === "/api/payment-intents" && init?.method === "POST" ? creation.promise : response;
    };
    await populate(renderer); await review(renderer);
    assert.equal(api.mutations().length, 1);
    await click(renderer, "Edit draft from another surface");
    const edited = draft(renderer), editedGeneration = generation(renderer);
    await act(async () => { creation.resolve(json({ ok: true, paymentIntent: api.paymentIntent })); await flush(); });
    await act(async () => { await flush(); });
    await click(renderer, "Send payment");
    assert.match(text(renderer.root), /Your payment is complete/);
    assert.deepEqual(draft(renderer), edited);
    assert.equal(generation(renderer), editedGeneration);
    assert.equal(api.calls.filter(call => call.url.endsWith("/execute")).length, 1);
  });

  it("cannot clear even its unchanged draft after its payment workspace has unmounted", async () => {
    const { renderer, browser, reads, sending, beforeReceipt } = await startSettledPaymentWithPendingReceipts();
    const unfinished = draft(renderer);
    await act(async () => { browser.navigate("/personal"); await flush(); });
    assert.equal(renderer.root.findAllByType(PersonalSendExperience).length, 0);
    await act(async () => { reads[0].resolve(json(receipt())); reads[1].resolve(json(receipt())); await sending; await flush(); });
    assert.deepEqual(draft(renderer), unfinished);
    assert.equal(generation(renderer), beforeReceipt);
    assert.doesNotMatch(text(renderer.root), /Your payment is complete/);
  });

  it("retains draft A after unavailable receipt reads and clears it only when a later GET retry validates the receipt", async () => {
    const { api, renderer, reads, sending, beforeReceipt } = await startSettledPaymentWithPendingReceipts();
    const unfinished = draft(renderer);
    await act(async () => { reads[0].resolve(json({ ok: false }, 503)); reads[1].resolve(json({ ok: false }, 503)); await sending; await flush(); });
    assert.deepEqual(draft(renderer), unfinished);
    assert.equal(generation(renderer), beforeReceipt);
    for (const label of ["Send payment", "Back", "Send another payment"]) assert.equal(buttons(renderer, label).length, 0);
    const beforeRetry = api.calls.length;
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 2_100)); });
    assert.equal(reads.length, 3);
    await act(async () => { reads[2].resolve(json(receipt())); await flush(); });
    assert.deepEqual(draft(renderer), EMPTY_SEND_DRAFT);
    assert.equal(generation(renderer), beforeReceipt + 1);
    assert.ok(api.calls.slice(beforeRetry).every(call => call.method === "GET"));
    assert.equal(api.calls.filter(call => call.url.endsWith("/execute")).length, 1);
    assert.equal(api.calls.filter(call => call.url.endsWith("/execution")).length, 0);
  });

  it("keeps draft ownership through same-account revalidation and clears it on subsequent authoritative GET completion", async () => {
    mounted = await mountPayment({ content: <RaceRoutes /> });
    const { api, renderer, browser } = mounted;
    await populate(renderer); await review(renderer); await click(renderer, "Send payment");
    const unfinished = draft(renderer), beforeReceipt = generation(renderer);
    browser.advance();
    await act(async () => { browser.signal("focus"); await flush(); });
    await act(async () => { await flush(); });
    assert.deepEqual(draft(renderer), unfinished);
    assert.equal(generation(renderer), beforeReceipt);
    api.status = "settled";
    await click(renderer, "Refresh status");
    assert.deepEqual(draft(renderer), EMPTY_SEND_DRAFT);
    assert.equal(generation(renderer), beforeReceipt + 1);
    assert.equal(api.calls.filter(call => call.url.endsWith("/execute")).length, 1);
  });
});
