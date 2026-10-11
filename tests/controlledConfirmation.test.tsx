import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { act, create, type ReactTestRenderer } from "react-test-renderer";
import type { SessionData } from "@auth0/nextjs-auth0/types";
import { ControlledConfirmation } from "../src/components/product/personal/ControlledConfirmation";
import { authenticatedRequests } from "../src/lib/auth/authenticatedRequests";
import { toWebSession, withWebSessionReference } from "../src/lib/controlledConfirmation/session";
import { controlledCallback } from "../src/lib/controlledConfirmation/sdkFlow";
import { NextRequest } from "next/server";
import { createHash, generateKeyPairSync, randomUUID } from "node:crypto";
import { signWebRequest, signWebResponse, verifyWebRequest, verifyWebResponse, type WebState } from "../src/lib/controlledConfirmation/handoffContract";

(globalThis as typeof globalThis & {IS_REACT_ACT_ENVIRONMENT:boolean}).IS_REACT_ACT_ENVIRONMENT=true;
const originalFetch=globalThis.fetch;
let view: ReactTestRenderer | undefined;
afterEach(async()=>{if(view)await act(async()=>view!.unmount());view=undefined;globalThis.fetch=originalFetch;authenticatedRequests.invalidate();});
const paymentId="11111111-1111-4111-8111-111111111111";
const flush=async()=>{for(let i=0;i<15;i++)await Promise.resolve();};
const label=()=>JSON.stringify(view!.toJSON());
const button=(name:string)=>view!.root.findAllByType("button").find(b=>b.findAllByType("span").some(s=>s.props.children===name))!;
async function mount(eligible=true) {await act(async()=>{view=create(<ControlledConfirmation paymentId={paymentId} eligible={eligible}/>);await flush();});}
function response(state:WebState["state"]) {return Response.json({paymentId,state});}

test("controlled UI: callback readiness requires explicit consent, double click and lost response recover one authoritative result",async()=>{
  const calls:string[]=[];let state:WebState["state"]="CONFIRMABLE",finish:((response:Response)=>void)|undefined;
  globalThis.fetch=async(_url,init)=>{const action=JSON.parse(String(init?.body)).action;calls.push(action);if(action==="confirm"){state="CONFIRMED";return new Promise(resolve=>{finish=resolve;});}return response(state);};
  await mount();assert.match(label(),/Ready to confirm/);assert.equal(calls.includes("confirm"),false);
  const confirm=button("Confirm payment");
  await act(async()=>{confirm.props.onClick();confirm.props.onClick();await flush();});
  assert.equal(calls.filter(v=>v==="confirm").length,1);assert.match(label(),/Confirming/);
  await act(async()=>{finish!(Response.json({error:"lost response"},{status:503}));await flush();});
  assert.match(label(),/unresolved/);assert.doesNotMatch(label(),/Payment confirmed/);
  await act(async()=>{button("Recover confirmation status").props.onClick();await flush();});
  assert.match(label(),/Payment confirmed/);assert.match(label(),/Execution has not occurred/);assert.doesNotMatch(label(),/Paid|Settled|Payment completed|Send payment/);
  await act(async()=>view!.unmount());view=undefined;await mount();assert.match(label(),/Payment confirmed/);
  assert.equal(calls.filter(v=>v==="confirm").length,1,"refresh only recovers existing confirmation");
});
test("controlled UI: ineligible payment cannot prepare or confirm or claim no execution",async()=>{
  globalThis.fetch=async()=>{assert.fail("ineligible flow must not call any payment route");};
  await mount(false);assert.match(label(),/This payment is no longer eligible/);assert.equal(view!.root.findAllByType("button").length,0);
  assert.doesNotMatch(label(),/Execution has not occurred|no funds have moved/);
});
test("controlled UI: authoritative ineligibility does not claim no execution",async()=>{
  globalThis.fetch=async()=>response("INELIGIBLE");await mount();
  assert.match(label(),/This payment is no longer eligible/);
  assert.doesNotMatch(label(),/Execution has not occurred|no funds have moved/);
  assert.equal(button("Confirm payment"),undefined);assert.equal(button("Continue with authentication"),undefined);
});
test("controlled UI: session generation change fences a delayed confirmed response",async()=>{
  let finish:((response:Response)=>void)|undefined;
  globalThis.fetch=async()=>new Promise(resolve=>{finish=resolve;});await mount();
  authenticatedRequests.invalidate();await act(async()=>{finish!(response("CONFIRMED"));await flush();});
  assert.doesNotMatch(label(),/Payment confirmed/);
});
for(const state of ["EXPIRED","SESSION_CHANGED","AUTHENTICATION_REQUIRED","REVOKED"] as const)test(`controlled UI: ${state} is truthful and has no confirm action`,async()=>{
  globalThis.fetch=async()=>response(state);await mount();assert.equal(button("Confirm payment"),undefined);assert.equal(button("Continue with authentication"),undefined);
  assert.match(label(),state==="EXPIRED"?/Confirmation expired/:state==="AUTHENTICATION_REQUIRED"?/Authentication incomplete/:/Session changed/);
  assert.match(label(),/This confirmation cannot continue here\. Start a new eligible payment\./);
  assert.doesNotMatch(label(),/retry confirmation/i);
});
function session():SessionData {return withWebSessionReference({user:{sub:"auth0|alice"},tokenSet:{accessToken:"test-access",idToken:"test-id",expiresAt:Math.floor(Date.now()/1000)+300},internal:{sid:"provider-id-not-our-session",createdAt:Math.floor(Date.now()/1000)}});}
test("Site callback port refuses SDK errors, missing/changed sessions and unknown binding references",async()=>{
  const previous=session(),request=new NextRequest("http://localhost:3000/auth/callback?state=SDK-state"),context={returnTo:`/confirmation/auth0/result?binding=${randomUUID()}`};
  let calls=0;const call=async()=>{calls++;return {paymentId,state:"CONFIRMABLE" as const};};
  await assert.rejects(()=>controlledCallback(request,previous,call)(new Error("SDK nonce mismatch"),context,session()));
  await assert.rejects(()=>controlledCallback(request,null,call)(null,context,session()));
  await assert.rejects(()=>controlledCallback(request,previous,call)(null,context,{...session(),user:{sub:"different"}}));
  assert.equal(calls,0);
  const renewed=session();const result=await controlledCallback(request,previous,async(action,body)=>{
    calls++;assert.equal(action,"callback");assert.equal(body.stateDigest,createHash("sha256").update("SDK-state").digest("hex"));
    assert.equal(body.session.reference,toWebSession(previous).reference);return {paymentId,state:"CONFIRMABLE"};
  })(null,context,renewed);
  assert.equal(calls,1);assert.match(result.headers.get("location")!,/personal\/send\?controlled=1&intent=/);
  assert.equal(toWebSession(renewed).reference,toWebSession(previous).reference);
  assert.notEqual(toWebSession(session()).reference,toWebSession(previous).reference);
});
test("private handoff context and exact response binding reject transplant and expired messages",()=>{
  const a=generateKeyPairSync("ed25519"),b=generateKeyPairSync("ed25519");
  const context={environment:"TEST",configuration:"a".repeat(64),siteOrigin:"http://localhost:3000",backendOrigin:"http://localhost:3001",clientId:"client",issuer:"https://tenant.test/"};
  const request=signWebRequest(context,"prepare",{paymentId,session:toWebSession(session())},a.privateKey);
  verifyWebRequest(request,context,"prepare",a.publicKey,Date.now()/1000);
  assert.throws(()=>verifyWebRequest(request,{...context,clientId:"other"},"prepare",a.publicKey,Date.now()/1000));
  assert.throws(()=>verifyWebRequest(request,context,"prepare",a.publicKey,Date.now()/1000+120));
  const result=signWebResponse(request,{state:"READY",paymentId},b.privateKey);assert.equal(verifyWebResponse(request,result,b.publicKey).state,"READY");
  const other=signWebRequest(context,"confirm",{paymentId,session:toWebSession(session())},a.privateKey);
  assert.throws(()=>verifyWebResponse(other,result,b.publicKey));
});

test("controlled Send mounts the non-value UI through refresh and back/forward without execution routes",async()=>{
  const {PaymentApi,mountPayment,intent,INTENT_ID,json,flush:wait}=await import("./helpers/round1Harness");
  const {PersonalSendExperience}=await import("../src/components/product/personal/PersonalSendExperience");
  const api=new PaymentApi();api.paymentIntent=intent("awaiting_confirmation",true);
  const original=api.fetch;const actions:string[]=[];
  Object.defineProperty(api,"fetch",{value:async(input:RequestInfo|URL,init?:RequestInit)=>{
    if(String(input).endsWith("/controlled-confirmation")){actions.push(JSON.parse(String(init?.body)).action);return json({paymentId:INTENT_ID,state:"CONFIRMED"});}
    return original(input,init);
  }});
  const h=await mountPayment({api,url:`/personal/send?controlled=1&intent=${INTENT_ID}`,content:<PersonalSendExperience controlled/>});
  try {
    assert.match(JSON.stringify(h.renderer.toJSON()),/Payment confirmed/);
    await act(async()=>{h.browser.navigate("/personal/send?controlled=1");await wait();});
    await act(async()=>{h.browser.navigate(`/personal/send?controlled=1&intent=${INTENT_ID}`);await wait();});
    assert.match(JSON.stringify(h.renderer.toJSON()),/Payment confirmed/);
    assert(actions.every(a=>a==="prepare" || a==="runtime-recover"));
    assert(actions.includes("runtime-recover"),"navigation reads policy status without evaluating");
    assert(!api.calls.some(c=>/\/confirm$|\/executions?|\/receipt$/.test(c.url)),"no ordinary confirmation, execution, or receipt read");
  } finally {await h.close();}
});

test("mounted BFF action boundary rejects cross-origin, method, extra fields and oversized input before private authority",async()=>{
  const {controlledRouteAction}=await import("../src/lib/controlledConfirmation/routeAction");let calls=0;
  const ports={enabled:true,trustedOrigin:(request:Request)=>request.headers.get("origin")==="http://localhost:3000",session:async()=>session(),call:async()=>{calls++;return {paymentId,state:"READY" as const};}};
  const request=(body:string,origin="http://localhost:3000")=>new Request("http://localhost:3000/api/payment-intents/test/controlled-confirmation",{method:"POST",headers:{origin},body});
  assert.equal((await controlledRouteAction(request('{"action":"confirm"}',"https://foreign.test"),paymentId,ports)).status,403);
  assert.equal((await controlledRouteAction(new Request("http://localhost:3000"),paymentId,ports)).status,405);
  assert.equal((await controlledRouteAction(request('{"action":"confirm","accountSessionId":"forged"}'),paymentId,ports)).status,409);
  assert.equal((await controlledRouteAction(request("x".repeat(101)),paymentId,ports)).status,409);
  assert.equal((await controlledRouteAction(request('{"action":"confirm"}'),paymentId,{...ports,enabled:false})).status,404);
  assert.equal(calls,0);
  assert.equal((await controlledRouteAction(request('{"action":"recover"}'),paymentId,ports)).status,200);assert.equal(calls,1);
});

test("logout revokes prior controlled authority independently of the ceremony gate and requires durable acknowledgement",async()=>{
  const {revokeControlledSession}=await import("../src/lib/controlledConfirmation/revocation");
  const current=session();let calls=0;
  await revokeControlledSession(current,async(action,body)=>{
    calls++;assert.equal(action,"revoke");assert.equal(body.session.reference,toWebSession(current).reference);
    assert.equal(body.session.accessToken,"");assert.equal(body.session.idToken,"");return {state:"REVOKED"};
  });
  assert.equal(calls,1);
  await assert.rejects(()=>revokeControlledSession(current,async()=>{throw new Error("transport unavailable");}),/unavailable/);
  await assert.rejects(()=>revokeControlledSession(current,async()=>({state:"READY"})),/not acknowledged/);
  const ordinary={...current};delete ordinary.zephipayWebSession;
  await revokeControlledSession(ordinary,async()=>{assert.fail("ordinary sessions need no controlled authority");});
  // The public route's wiring must not put the existing-authority revocation behind the creation gate.
  const {readFile}=await import("node:fs/promises");
  const route=await readFile(new URL("../src/app/api/auth/logout/route.ts",import.meta.url),"utf8");
  assert(!route.includes("controlledConfirmationEnabled"));
  const client=await readFile(new URL("../src/lib/controlledConfirmation/client.ts",import.meta.url),"utf8");
  assert.match(client,/!controlledConfirmationEnabled\(\) && action!=="revoke"/);
});
