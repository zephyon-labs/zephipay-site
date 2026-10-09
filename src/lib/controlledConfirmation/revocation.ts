import type { SessionData } from "@auth0/nextjs-auth0/types";
import type { WebCall } from "./sdkFlow";
import { toWebSession, webSessionReference } from "./session";

/** Existing authority must be revoked even when new controlled ceremonies are disabled.
 * Call before releasing logout cookies. An unavailable/unacknowledged revocation fails closed. */
export async function revokeControlledSession(session: SessionData|null, call: WebCall): Promise<void> {
  if(!session || !webSessionReference(session))return;
  const result=await call("revoke",{session:toWebSession(session,true)});
  if(result.state!=="REVOKED")throw new Error("Canonical logout was not acknowledged.");
}
