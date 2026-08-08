import { callExecutionApi } from "@/lib/paymentIntents/backendProxy";
import { hasTrustedOrigin } from "@/lib/paymentIntents/origin";
import { parseConfirmInput,validPaymentIntentId } from "@/lib/paymentIntents/requests";
import { apiResponse,routeError } from "@/lib/paymentIntents/routeResponse";
export async function POST(request:Request,context:RouteContext<"/api/payment-intents/[id]/execute">){if(!hasTrustedOrigin(request))return routeError(403,"Request origin is not allowed.");const {id}=await context.params;if(!validPaymentIntentId(id))return routeError(400,"A valid payment intent ID is required.");let raw:unknown;try{raw=await request.json()}catch{return routeError(400,"A valid JSON request is required.")}const body=parseConfirmInput(raw);if(!body)return routeError(400,"A valid execution request is required.");return apiResponse(await callExecutionApi({method:"POST",path:`/api/payment-intents/${id}/execute`,body,requestId:request.headers.get("x-request-id")}));}
