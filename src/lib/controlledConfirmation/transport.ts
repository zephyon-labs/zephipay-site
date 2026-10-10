import type { KeyObject } from "node:crypto";
import { signWebRequest, verifyRuntimeResponse, verifyWebResponse, type ControlledAction, type HandoffBody, type HandoffContext, type WebAction, type WebState } from "./handoffContract";
import type { ControlledRuntimeAction, ControlledRuntimeResult } from "./runtimeContract";

type Transport = { context: HandoffContext; siteKey: KeyObject; backendKey: KeyObject; fetch: typeof fetch };
export function sendControlledRequest(action: WebAction, body: HandoffBody, transport: Transport): Promise<WebState>;
export function sendControlledRequest(action: ControlledRuntimeAction, body: HandoffBody, transport: Transport): Promise<ControlledRuntimeResult>;
export async function sendControlledRequest(action: ControlledAction, body: HandoffBody, transport: Transport) {
  const request = signWebRequest(transport.context, action, body, transport.siteKey);
  const response = await transport.fetch(`${transport.context.backendOrigin}/internal/controlled-confirmation/${action}`, {
    method: "POST", redirect: "error", cache: "no-store", headers: { "content-type": "application/json" },
    body: JSON.stringify(request), signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error("Controlled status unavailable. Recover before trying again.");
  const raw = await response.text();
  if (Buffer.byteLength(raw) > 32768) throw new Error("Invalid controlled response.");
  return action === "runtime-evaluate" || action === "runtime-recover"
    ? verifyRuntimeResponse(request, JSON.parse(raw), transport.backendKey)
    : verifyWebResponse(request, JSON.parse(raw), transport.backendKey);
}
