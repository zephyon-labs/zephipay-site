import "server-only";
import { createPrivateKey, createPublicKey } from "node:crypto";
import { type HandoffBody, type HandoffContext, type WebAction } from "./handoffContract";
import type { ControlledRuntimeAction } from "./runtimeContract";
import { sendControlledRequest } from "./transport";

export function controlledConfirmationEnabled() { return process.env.ZEPHIPAY_CONTROLLED_CONFIRMATION === "non-value-test"; }
export async function callControlledBackend(action: WebAction, body: HandoffBody) {
  return sendControlledRequest(action,body,transport(action));
}
export async function callControlledRuntimeBackend(action: ControlledRuntimeAction, body: HandoffBody) {
  return sendControlledRequest(action,body,transport(action));
}
function transport(action: WebAction | ControlledRuntimeAction) {
  if(!controlledConfirmationEnabled() && action!=="revoke")throw new Error("Controlled confirmation unavailable.");
  // Dedicated keys, not Auth0 secrets or Backend operational workload credentials.
  const context: HandoffContext=JSON.parse(process.env.ZEPHIPAY_CONTROLLED_HANDOFF_CONTEXT || "null");
  if(!context || context.siteOrigin!==new URL(process.env.APP_BASE_URL!).origin)throw new Error("Controlled context unavailable.");
  const origin=new URL(context.backendOrigin);
  if(origin.origin!==context.backendOrigin || (origin.protocol!=="https:" && !(origin.protocol==="http:" && origin.hostname==="localhost")))throw new Error("Private HTTPS backend required.");
  return {context,siteKey:createPrivateKey(process.env.ZEPHIPAY_CONTROLLED_SITE_PRIVATE_KEY!),
    backendKey:createPublicKey(process.env.ZEPHIPAY_CONTROLLED_BACKEND_PUBLIC_KEY!),fetch};
}
