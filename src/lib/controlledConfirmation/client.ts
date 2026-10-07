import "server-only";
import { createPrivateKey, createPublicKey } from "node:crypto";
import { signWebRequest, verifyWebResponse, type HandoffBody, type HandoffContext, type WebAction } from "./handoffContract";

export function controlledConfirmationEnabled() { return process.env.ZEPHIPAY_CONTROLLED_CONFIRMATION === "non-value-test"; }
export async function callControlledBackend(action: WebAction, body: HandoffBody) {
  if(!controlledConfirmationEnabled() && action!=="revoke")throw new Error("Controlled confirmation unavailable.");
  // Dedicated keys, not Auth0 secrets or Backend operational workload credentials.
  const context: HandoffContext=JSON.parse(process.env.ZEPHIPAY_CONTROLLED_HANDOFF_CONTEXT || "null");
  if(!context || context.siteOrigin!==new URL(process.env.APP_BASE_URL!).origin)throw new Error("Controlled context unavailable.");
  const origin=new URL(context.backendOrigin);
  if(origin.origin!==context.backendOrigin || (origin.protocol!=="https:" && !(origin.protocol==="http:" && origin.hostname==="localhost")))throw new Error("Private HTTPS backend required.");
  const request=signWebRequest(context,action,body,createPrivateKey(process.env.ZEPHIPAY_CONTROLLED_SITE_PRIVATE_KEY!));
  const response=await fetch(`${origin.origin}/internal/controlled-confirmation/${action}`,{method:"POST",redirect:"error",cache:"no-store",
    headers:{"content-type":"application/json"},body:JSON.stringify(request),signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw new Error("Confirmation unavailable. Recover current state before trying again.");
  const raw=await response.text();if(Buffer.byteLength(raw)>32768)throw new Error("Invalid controlled response.");
  return verifyWebResponse(request,JSON.parse(raw),createPublicKey(process.env.ZEPHIPAY_CONTROLLED_BACKEND_PUBLIC_KEY!));
}
