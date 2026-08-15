import { callExecutionApi } from "@/lib/paymentIntents/backendProxy";
import { validPaymentIntentId } from "@/lib/paymentIntents/requests";
import { apiResponse, routeError } from "@/lib/paymentIntents/routeResponse";

export async function GET(request: Request, context: RouteContext<"/api/payment-intents/[id]/devnet/execution">) {
  const { id } = await context.params;
  if (!validPaymentIntentId(id)) return routeError(400, "A valid payment intent ID is required.");
  return apiResponse(await callExecutionApi({ method: "GET", path: `/api/payment-intents/${id}/devnet/execution`, requestId: request.headers.get("x-request-id") }));
}
