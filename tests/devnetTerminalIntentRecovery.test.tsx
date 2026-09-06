import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { AuthenticatedRequestCoordinator } from "../src/lib/auth/authenticatedRequests";
import { beginConfirmedPaymentFollowUp } from "../src/lib/paymentIntents/authenticatedContinuation";
import { parsePaymentIntentResponse, type PaymentIntent } from "../src/lib/paymentIntents/contract";
import { AT, INTENT_ID, PaymentApi, buttons, click, devnetExecution, execution, intent, json, mountPayment, text } from "./helpers/round1Harness";

// Match toPublicPaymentIntent: lifecycle status/version and optional evidence are
// backend facts. Completion is displayed with a receipt only after its own GET.
function backendIntent(status:PaymentIntent["status"],devnet:boolean){
  return {...intent(status,devnet),version:"2",userConfirmedAt:AT,
    ...(status==="completed"?{completedAt:AT,solanaSignature:"5".repeat(88),confirmedSlot:"199",confirmationStatus:"finalized"}:{}),
    ...(status==="failed"?{failedAt:AT,failureCode:"CHAIN_FAILED"}:{})};
}
let mounted:Awaited<ReturnType<typeof mountPayment>>|undefined;
afterEach(async()=>{await mounted?.close();mounted=undefined;});

describe("backend payment intent lifecycle contract",()=>{
  it("accepts the five actual backend statuses and ignores unexposed terminal evidence",()=>{
    for(const status of ["awaiting_confirmation","processing","unknown","completed","failed"] as const){
      const parsed=parsePaymentIntentResponse({ok:true,paymentIntent:backendIntent(status,true)});
      assert.equal(parsed?.paymentIntent.status,status);
      assert.equal("solanaSignature" in (parsed?.paymentIntent??{}),false);
    }
  });
  it("rejects unsupported, malformed, and execution-only lifecycle names",()=>{
    for(const status of ["settled","cancelled","COMPLETED","unknown_reconciliation_required","ready",null,{}]){
      assert.equal(parsePaymentIntentResponse({ok:true,paymentIntent:{...backendIntent("completed",true),status}}),undefined);
    }
  });
});

for(const devnet of [false,true])describe(`${devnet?"Devnet":"standard"} terminal intent recovery`,()=>{
  it("completed URL recovery reads execution and durable receipt with zero payment POSTs",async()=>{
    const api=new PaymentApi();api.paymentIntent=backendIntent("completed",devnet);api.status="settled";api.devnetStatus="settled";
    mounted=await mountPayment({api,url:"/personal/send?intent="+INTENT_ID});
    assert.match(text(mounted.renderer.root),/Your payment is complete and its durable receipt is available/);
    const reads=api.calls.filter(call=>call.url.startsWith("/api/payment-intents/"));
    assert.deepEqual(reads.map(call=>call.url),[`/api/payment-intents/${INTENT_ID}`,`/api/payment-intents/${INTENT_ID}/${devnet?"devnet/execution":"execution"}`,`/api/payment-intents/${INTENT_ID}/receipt`]);
    assert(reads.every(call=>call.method==="GET"));assert.equal(api.mutations().length,0);
    assert.equal(buttons(mounted.renderer,"Send payment").length,0);assert.equal(buttons(mounted.renderer,"Send on Solana Devnet").length,0);
  });
  for(const status of ["processing","unknown"] as const)it(`${status} recovery remains GET-only, including manual status checks`,async()=>{
    const api=new PaymentApi();api.paymentIntent=backendIntent(status,devnet);api.status="pending";
    mounted=await mountPayment({api,url:"/personal/send?intent="+INTENT_ID});
    assert.equal(buttons(mounted.renderer,"Send payment").length,0);assert.equal(buttons(mounted.renderer,"Back").length,0);
    await click(mounted.renderer,devnet?"Check Devnet status":"Refresh status");
    assert.equal(api.mutations().length,0);
    assert.match(text(mounted.renderer.root),devnet?/Verifying transaction status/:/Confirming payment/);
  });
  it("failed intent presents terminal failure without a confirm or execute action",async()=>{
    const api=new PaymentApi();api.paymentIntent=backendIntent("failed",devnet);api.status="failed";api.devnetStatus="failed";
    mounted=await mountPayment({api,url:"/personal/send?intent="+INTENT_ID});
    assert.match(text(mounted.renderer.root),/Payment could not be completed/);
    assert.equal(buttons(mounted.renderer,"Send payment").length,0);assert.equal(buttons(mounted.renderer,"Send on Solana Devnet").length,0);
    assert.equal(api.calls.some(call=>call.url.endsWith("/receipt")),false);assert.equal(api.mutations().length,0);
  });
  it("completed intent never fabricates a receipt and permits a later GET-only receipt recovery",async()=>{
    const api=new PaymentApi();api.paymentIntent=backendIntent("completed",devnet);api.status="settled";api.devnetStatus="settled";api.receiptUnavailable=true;
    mounted=await mountPayment({api,url:"/personal/send?intent="+INTENT_ID});
    assert.doesNotMatch(text(mounted.renderer.root),/Your payment is complete and its durable receipt is available/);
    assert.equal(buttons(mounted.renderer,"Send payment").length,0);
    api.receiptUnavailable=false;
    await click(mounted.renderer,devnet?"Check Devnet status":"Check payment status");
    assert.match(text(mounted.renderer.root),/Your payment is complete and its durable receipt is available/);
    assert.equal(api.mutations().length,0);
  });
});

it("failed intent stays truthful when its execution projection is unavailable",async()=>{
  const api=new PaymentApi();api.paymentIntent=backendIntent("failed",false);api.executionReadsUnavailable=true;
  mounted=await mountPayment({api,url:"/personal/send?intent="+INTENT_ID});
  assert.match(text(mounted.renderer.root),/Payment could not be completed/);
  assert.equal(buttons(mounted.renderer,"Send payment").length,0);assert.equal(api.mutations().length,0);
});

for(const rail of ["standard","solana-devnet"] as const)for(const status of ["processing","completed","unknown","failed"] as const){
  it(`${rail} confirmation replay of ${status} follows execution GET without an execution POST`,async()=>{
    const calls:Array<{url:string;method:string}>=[];
    const coordinator=new AuthenticatedRequestCoordinator((async(input,init)=>{
      const url=String(input);calls.push({url,method:init?.method??"GET"});
      return json(url.endsWith("/confirm")?{ok:true,applied:false,paymentIntent:backendIntent(status,rail==="solana-devnet")}:rail==="solana-devnet"?devnetExecution("settled"):execution("settled"));
    }) as typeof fetch);
    const confirmation=await coordinator.json(`/api/payment-intents/${INTENT_ID}/confirm`,{method:"POST"});
    const followUp=beginConfirmedPaymentFollowUp(confirmation,rail,()=>undefined);await followUp.response;
    assert.deepEqual(calls.slice(1),[{url:`/api/payment-intents/${INTENT_ID}/${rail==="solana-devnet"?"devnet/execution":"execution"}`,method:"GET"}]);
  });
}
