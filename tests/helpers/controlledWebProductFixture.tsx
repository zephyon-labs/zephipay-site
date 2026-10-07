import assert from "node:assert/strict";
import { act,create,type ReactTestRenderer } from "react-test-renderer";
import { ControlledConfirmation } from "../../src/components/product/personal/ControlledConfirmation";
import { authenticatedRequests } from "../../src/lib/auth/authenticatedRequests";

/** Candidate UI driven by the real BFF action + Backend in the cross-repository regression.
 * Only the browser fetch transport is injected. It loses one already-committed confirm response. */
export async function exerciseControlledProduct(paymentId:string, browserFetch: typeof fetch) {
  const previous=globalThis.fetch;let view:ReactTestRenderer|undefined;const actions:string[]=[];
  (globalThis as typeof globalThis & {IS_REACT_ACT_ENVIRONMENT:boolean}).IS_REACT_ACT_ENVIRONMENT=true;
  globalThis.fetch=async(input,init)=>{
    assert.equal(String(input),`/api/payment-intents/${paymentId}/controlled-confirmation`);
    const action=JSON.parse(String(init?.body)).action;actions.push(action);
    const response=await browserFetch(input,init);
    if(action==="confirm"){assert.equal(response.status,200);throw new Error("Synthetic lost committed response");}
    return response;
  };
  const until=async(predicate:()=>boolean)=>{
    for(let n=0;n<1000;n++){await act(async()=>{await new Promise(resolve=>setTimeout(resolve,10));});if(predicate())return;}
    assert.fail("Bounded product observation expired");
  };
  const button=(name:string)=>view!.root.findAllByType("button").find(b=>b.findAllByType("span").some(s=>s.props.children===name));
  const text=()=>JSON.stringify(view!.toJSON());
  try {
    await act(async()=>{view=create(<ControlledConfirmation paymentId={paymentId} eligible/>);});
    await until(()=>Boolean(button("Confirm payment")) && !button("Confirm payment")!.props.disabled);
    await act(async()=>{button("Confirm payment")!.props.onClick();button("Confirm payment")!.props.onClick();});
    await until(()=>text().includes("unresolved"));assert(!text().includes("Payment confirmed"));
    await act(async()=>{button("Recover confirmation status")!.props.onClick();});
    await until(()=>text().includes("Payment confirmed"));
    assert.equal(actions.filter(v=>v==="confirm").length,1);
    assert.match(text(),/Execution has not occurred and no funds have moved/);
    assert.doesNotMatch(text(),/Paid|Settled|Payment completed|Send payment/);
    return {state:"Payment confirmed",actions};
  } finally {
    if(view)await act(async()=>view!.unmount());globalThis.fetch=previous;authenticatedRequests.invalidate();
  }
}
