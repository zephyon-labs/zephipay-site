import { createHash } from "node:crypto";
import type { Auth0Client } from "@auth0/nextjs-auth0/server";
import type { SessionData } from "@auth0/nextjs-auth0/types";
import { NextRequest, NextResponse } from "next/server";
import { toWebSession, webSessionReference } from "./session";
import { webUuid, type HandoffBody, type WebAction, type WebState } from "./handoffContract";

export type WebCall = (action: WebAction, body: HandoffBody) => Promise<WebState>;
const prefix="/confirmation/auth0/result?binding=";
/** Called by the protected POST route. SDK owns the cookie, state, nonce and S256 verifier. */
export async function startControlledSdk(request: NextRequest, paymentId: string, session: SessionData, sdk: Auth0Client, call: WebCall) {
  const current=await call("prepare",{paymentId,session:toWebSession(session)});
  if(current.state!=="READY" || !webUuid(current.bindingId))throw new Error("Recover the existing confirmation ceremony.");
  const url=new URL("/auth/login",request.url);url.searchParams.set("returnTo",prefix+current.bindingId);
  const response=await sdk.middleware(new NextRequest(url,{headers:{cookie:request.headers.get("cookie") || ""}}));
  if(![302,303,307].includes(response.status) || !response.headers.has("set-cookie"))throw new Error("SDK transaction required.");
  const authorizationUrl=response.headers.get("location");if(!authorizationUrl)throw new Error("SDK authorization required.");
  await call("start",{paymentId,bindingId:current.bindingId,authorizationUrl,session:toWebSession(session)});
  // Only release the SDK transaction after its durable Backend binding committed.
  return new NextResponse(null,{status:303,headers:response.headers});
}
/** Installed directly as the real SDK onCallback hook by the Site request composition.
 * The hook is never an HTTP endpoint. SDK errors cannot construct a handoff. */
export function controlledCallback(request: NextRequest, previous: SessionData | null, call: WebCall) {
  return async (error: unknown, context: {returnTo?: string}, session: SessionData | null) => {
    if(error || !session)throw new Error("Authentication callback rejected.");
    if(!context.returnTo?.startsWith(prefix))return NextResponse.redirect(new URL(context.returnTo || "/personal",request.url));
    const bindingId=context.returnTo.slice(prefix.length), ref=previous && webSessionReference(previous);
    if(!webUuid(bindingId) || !previous || !ref || previous.user.sub!==session.user.sub || request.nextUrl.searchParams.getAll("state").length!==1)
      throw new Error("Confirmation session changed.");
    // Reauthentication changes the SDK token set, not this immutable application-session binding.
    session.zephipayWebSession=ref;
    const result=await call("callback",{bindingId,stateDigest:createHash("sha256").update(request.nextUrl.searchParams.get("state")!).digest("hex"),session:toWebSession(session)});
    if(!webUuid(result.paymentId))throw new Error("Missing canonical payment reference.");
    // Callback is not consent; the page presents an explicit confirm action.
    return NextResponse.redirect(new URL(`/personal/send?controlled=1&intent=${result.paymentId}`,request.url),303);
  };
}
