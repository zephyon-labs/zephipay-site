import { getApplicationSession } from "@/lib/auth/serverAuthority";
import { hasTrustedOrigin } from "@/lib/paymentIntents/origin";
import { callControlledBackend, controlledConfirmationEnabled } from "@/lib/controlledConfirmation/client";
import { controlledRouteAction } from "@/lib/controlledConfirmation/routeAction";

export async function POST(request: Request, context: RouteContext<"/api/payment-intents/[id]/controlled-confirmation">) {
  const {id}=await context.params;
  return controlledRouteAction(request,id,{enabled:controlledConfirmationEnabled(),trustedOrigin:hasTrustedOrigin,session:getApplicationSession,call:callControlledBackend});
}
