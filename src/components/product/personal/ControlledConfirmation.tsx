"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { authenticatedJson, authenticatedRequestWasInvalidated } from "@/lib/auth/authenticatedRequests";
import { Button } from "@/components/ui/Button";
import type { WebState } from "@/lib/controlledConfirmation/handoffContract";

export const confirmationLabels: Record<WebState["state"],string> = {
  READY:"Ready to confirm",AUTHENTICATION_REQUIRED:"Additional authentication required",CONFIRMABLE:"Ready to confirm",
  CONFIRMED:"Payment confirmed",EXPIRED:"Confirmation expired",SESSION_CHANGED:"Session changed — retry confirmation",
  INELIGIBLE:"Recipient not yet eligible for controlled confirmation",REVOKED:"Session changed — retry confirmation",
};
export function ControlledConfirmation({paymentId,eligible}:{paymentId:string;eligible:boolean}) {
  const [state,setState]=useState<WebState["state"]>(eligible?"READY":"INELIGIBLE");
  const [busy,setBusy]=useState(false),[error,setError]=useState<string>();
  const pending=useRef(false), mounted=useRef(false);
  const act=useCallback(async(action:"prepare"|"recover"|"confirm")=>{
    if(pending.current || !eligible)return;pending.current=true;setBusy(true);setError(undefined);
    try {
      const result=await authenticatedJson(`/api/payment-intents/${paymentId}/controlled-confirmation`,{method:"POST",credentials:"same-origin",cache:"no-store",headers:{"Content-Type":"application/json"},body:JSON.stringify({action})});
      result.apply(({response,body})=>{
        const value=body as WebState;
        if(!response.ok || value.paymentId!==paymentId || !Object.hasOwn(confirmationLabels,value.state))throw new Error("Confirmation could not be resolved.");
        if(mounted.current)setState(value.state);
      });
    } catch(reason) {if(mounted.current && !authenticatedRequestWasInvalidated(reason))setError("Confirmation is unresolved. Recover its status before taking another action.");}
    finally {pending.current=false;if(mounted.current)setBusy(false);}
  },[paymentId,eligible]);
  useEffect(()=>{
    mounted.current=true;void act("prepare");
    const restore=(event:PageTransitionEvent)=>{if(event.persisted){pending.current=false;void act("recover");}};
    if(typeof window!=="undefined")window.addEventListener("pageshow",restore);
    return()=>{mounted.current=false;if(typeof window!=="undefined")window.removeEventListener("pageshow",restore);};
  },[act]);
  return <section className="rounded-2xl border border-border-default p-6" aria-label="Controlled confirmation">
    <h3 className="text-2xl font-semibold" role="status">{busy?"Confirming":confirmationLabels[state]}</h3>
    <p className="mt-4">This controlled confirmation records your consent. Execution has not occurred and no funds have moved.</p>
    {error?<p role="alert" className="mt-4">{error}</p>:null}
    {eligible?<div className="mt-5 flex flex-wrap gap-3">
      {state==="READY"&&!error?<form action={`/api/payment-intents/${paymentId}/controlled-confirmation/start`} method="post" onSubmit={event=>{if(pending.current)event.preventDefault();else{pending.current=true;setBusy(true);}}}>
        <Button type="submit" disabled={busy}>Continue with authentication</Button>
      </form>:null}
      {state==="CONFIRMABLE"&&!error?<Button onClick={()=>void act("confirm")} disabled={busy}>Confirm payment</Button>:null}
      <Button variant="outline" onClick={()=>void act("recover")} disabled={busy}>Recover confirmation status</Button>
    </div>:null}
  </section>;
}
