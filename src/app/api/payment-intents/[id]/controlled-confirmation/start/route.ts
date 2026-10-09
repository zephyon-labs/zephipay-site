import { NextRequest, NextResponse } from "next/server";
import { createSiteAuth0 } from "@/lib/auth0";
import { getApplicationSession } from "@/lib/auth/serverAuthority";
import { applyLoginGestureCookies } from "@/lib/auth/sessionCookies";
import { hasTrustedOrigin } from "@/lib/paymentIntents/origin";
import { callControlledBackend, controlledConfirmationEnabled } from "@/lib/controlledConfirmation/client";
import { startControlledSdk } from "@/lib/controlledConfirmation/sdkFlow";
import { webUuid } from "@/lib/controlledConfirmation/handoffContract";
export async function POST(request: NextRequest, context: RouteContext<"/api/payment-intents/[id]/controlled-confirmation/start">) {
  const headers={"Cache-Control":"private, no-store"};
  if(!controlledConfirmationEnabled())return NextResponse.json({error:"Unavailable."},{status:404,headers});
  if(!request.headers.get("origin") || !hasTrustedOrigin(request))return NextResponse.json({error:"Invalid origin."},{status:403,headers});
  const session=await getApplicationSession(),{id}=await context.params;
  if(!session)return NextResponse.json({error:"Sign in required."},{status:401,headers});
  if(!webUuid(id))return NextResponse.json({error:"Invalid payment."},{status:400,headers});
  try {
    const response=await startControlledSdk(request,id,session,createSiteAuth0(undefined,true),callControlledBackend);
    applyLoginGestureCookies(request,response);response.headers.set("Cache-Control","private, no-store");return response;
  } catch {return NextResponse.redirect(new URL(`/personal/send?controlled=1&intent=${id}&confirmation=recover`,request.url),303);}
}
