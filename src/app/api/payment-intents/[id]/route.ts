import { callPaymentIntentApi, requirePaymentSession } from "@/lib/paymentIntents/serverClient";
import { validPaymentIntentId } from "@/lib/paymentIntents/requests";
import { apiResponse, routeError } from "@/lib/paymentIntents/routeResponse";

export async function GET(request: Request, context: RouteContext<"/api/payment-intents/[id]">) {
  const { id } = await context.params;
  const sessionError = await requirePaymentSession();
  if (sessionError) return apiResponse(sessionError);
  if (!validPaymentIntentId(id)) return routeError(400, "A valid payment intent ID is required.");
  return apiResponse(await callPaymentIntentApi({
    method: "GET", path: `/api/payment-intents/${id}`,
    requestId: request.headers.get("x-request-id"),
  }));
}
