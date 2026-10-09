import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { act, type ReactTestRenderer } from "react-test-renderer";
import { usePathname, useRouter } from "next/navigation";
import { AuthenticatedBoundary, ProtectedAccountBoundary } from "../src/components/auth/AuthenticatedBoundary";
import { PersonalWorkspace } from "../src/components/marketing/personal-workspace/PersonalWorkspace";
import { ActivityInterfacePreview } from "../src/components/product/personal/ActivityInterfacePreview";
import { PersonalSendExperience } from "../src/components/product/personal/PersonalSendExperience";
import { EMPTY_SEND_DRAFT } from "../src/components/product/personal/SendDraftProvider";
import { buttons, click, field, flush, json, mountPayment, PaymentApi, populate, review, text } from "./helpers/round1Harness";

let mounted: Awaited<ReturnType<typeof mountPayment>> | undefined;
afterEach(async () => { await mounted?.close(); mounted = undefined; });

// Swap real route contents while retaining the shared layout/provider, just as
// client navigation does. The receipt's own buttons drive its exit routes.
function ReceiptExitRoutes() {
  const pathname = usePathname(), router = useRouter();
  if (pathname === "/personal/send") return <ProtectedAccountBoundary returnTo="/personal/send"><PersonalSendExperience /></ProtectedAccountBoundary>;
  return <>
    <button onClick={() => router.push("/personal/send")}>Return to Send</button>
    {pathname === "/personal" ? <PersonalWorkspace /> : pathname === "/personal/activity"
      ? <AuthenticatedBoundary><ActivityInterfacePreview /></AuthenticatedBoundary>
      : <p>Another page</p>}
  </>;
}

function draft(renderer: ReactTestRenderer) { return JSON.parse(text(renderer.root.findByProps({ id: "typed-draft" }))); }
function assertEmptyCompose(renderer: ReactTestRenderer) {
  assert.equal(buttons(renderer, "Review payment").length, 1);
  for (const placeholder of ["@username", "0.00", "What is this payment for?"]) assert.equal(field(renderer, placeholder).props.value, "");
  assert.equal(buttons(renderer, "ZephiPay username")[0].props["aria-pressed"], true);
  assert.deepEqual(draft(renderer), EMPTY_SEND_DRAFT);
}

describe("AUD-R1-01 mounted Send draft completion", () => {
  for (const exit of ["Personal Home", "View activity", "Send another payment", "other navigation"] as const) {
    it("clears at the validated receipt before " + exit + " and stays empty on return to Send", async () => {
      const api = new PaymentApi(); api.status = "settled";
      mounted = await mountPayment({ api, content: <ReceiptExitRoutes /> });
      const { renderer, browser } = mounted;
      await populate(renderer);
      const unfinished = draft(renderer);
      assert.equal(unfinished.username, "@recipient");
      assert.equal(unfinished.amount, "2");
      assert.equal(unfinished.purpose, "Dinner");
      await review(renderer);
      assert.deepEqual(draft(renderer), unfinished, "Creating the intent must retain the draft");
      await click(renderer, "Send payment");
      assert.match(text(renderer.root), /Your payment is complete/);
      assert.ok(api.calls.some(call => call.url.endsWith("/receipt") && call.method === "GET"));
      assert.deepEqual(draft(renderer), EMPTY_SEND_DRAFT, "Clear immediately on receipt establishment, before any exit");
      const mutations = api.mutations().length;

      if (exit === "other navigation") await act(async () => { browser.navigate("/elsewhere"); await flush(); });
      else await click(renderer, exit);
      if (exit !== "Send another payment") {
        assert.equal(browser.url.pathname, exit === "Personal Home" ? "/personal" : exit === "View activity" ? "/personal/activity" : "/elsewhere");
        assert.equal(renderer.root.findAllByType(PersonalSendExperience).length, 0, "The Send route must really unmount");
        await click(renderer, "Return to Send");
      }
      assert.equal(browser.url.pathname, "/personal/send");
      assert.equal(browser.url.searchParams.has("intent"), false);
      assertEmptyCompose(renderer);
      assert.equal(api.mutations().length, mutations);
      assert.equal(api.calls.filter(call => call.url.endsWith("/execute")).length, 1);
    });
  }

  for (const failure of ["unavailable", "invalid receipt"] as const) {
    it("retains the draft through " + failure + " and clears only when GET retry validates the durable receipt", async () => {
      const api = new PaymentApi(); api.status = "settled"; api.receiptUnavailable = failure === "unavailable";
      mounted = await mountPayment({ api, content: <ReceiptExitRoutes /> });
      const { renderer } = mounted;
      let invalidReceipt = failure === "invalid receipt";
      const transport = globalThis.fetch;
      globalThis.fetch = async (input, init) => {
        const response = await transport(input, init);
        return invalidReceipt && String(input).endsWith("/receipt") ? json({ ok: true, receipt: { status: "settled" } }) : response;
      };
      await populate(renderer);
      const unfinished = draft(renderer);
      await review(renderer); await click(renderer, "Send payment");
      assert.deepEqual(draft(renderer), unfinished);
      assert.doesNotMatch(text(renderer.root), /Your payment is complete/);
      for (const label of ["Back", "Send payment", "Review payment", "Send another payment"]) assert.equal(buttons(renderer, label).length, 0);
      assert.equal(api.calls.filter(call => call.url.endsWith("/execution")).length, 0, "Receipt failure must not reopen settled execution recovery");
      const beforeRetry = api.calls.length;
      api.receiptUnavailable = false; invalidReceipt = false;
      await act(async () => { await new Promise(resolve => setTimeout(resolve, 2_100)); await flush(); });
      assert.match(text(renderer.root), /Your payment is complete/);
      assert.deepEqual(draft(renderer), EMPTY_SEND_DRAFT);
      assert.ok(api.calls.slice(beforeRetry).some(call => call.url.endsWith("/receipt")));
      assert.ok(api.calls.slice(beforeRetry).every(call => call.method === "GET"));
      assert.equal(api.calls.filter(call => call.url.endsWith("/execution")).length, 0);
      assert.equal(api.calls.filter(call => call.url.endsWith("/execute")).length, 1);
    });
  }

  for (const state of ["processing", "pending", "ambiguous"] as const) {
    it("retains an unresolved " + state + " draft through navigation, same-account revalidation, and URL recovery", async () => {
      const api = new PaymentApi();
      if (state === "ambiguous") { api.executionFailure = "lost"; api.executionReadsUnavailable = true; }
      else api.status = state;
      mounted = await mountPayment({ api, content: <ReceiptExitRoutes /> });
      const { renderer, browser } = mounted;
      await populate(renderer);
      const unfinished = draft(renderer);
      await review(renderer); await click(renderer, "Send payment");
      assert.deepEqual(draft(renderer), unfinished);
      const recoveryUrl = browser.url.pathname + browser.url.search, afterContact = api.calls.length;
      await act(async () => { browser.navigate("/elsewhere"); await flush(); });
      assert.deepEqual(draft(renderer), unfinished);
      browser.advance();
      await act(async () => { browser.signal("focus"); await flush(); });
      assert.deepEqual(draft(renderer), unfinished);
      await act(async () => { browser.navigate(recoveryUrl); await flush(); });
      await act(async () => { await flush(); });
      assert.deepEqual(draft(renderer), unfinished);
      for (const label of ["Back", "Send payment", "Review payment", "Send another payment"]) assert.equal(buttons(renderer, label).length, 0);
      assert.ok(api.calls.slice(afterContact).every(call => call.method === "GET"));
      assert.equal(api.calls.some(call => call.url.endsWith("/receipt")), false);
      assert.equal(api.calls.filter(call => call.url.endsWith("/execute")).length, 1);
    });
  }
});
