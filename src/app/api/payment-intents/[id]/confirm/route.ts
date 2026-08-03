import { callPaymentIntentApi, requirePaymentSession } from "@/lib/paymentIntents/serverClient";
import { hasTrustedOrigin } from "@/lib/paymentIntents/origin";
import { parseConfirmInput, validPaymentIntentId } from "@/lib/paymentIntents/requests";
import { apiResponse, routeError } from "@/lib/paymentIntents/routeResponse";

export async function POST(request: Request, context: RouteContext<"/api/payment-intents/[id]/confirm">) {
  if (!hasTrustedOrigin(request)) return routeError(403, "Request origin is not allowed.");
  const sessionError = await requirePaymentSession();
  if (sessionError) return apiResponse(sessionError);
  const { id } = await context.params;
  if (!validPaymentIntentId(id)) return routeError(400, "A valid payment intent ID is required.");
  let raw: unknown;
  try { raw = await request.json(); } catch { return routeError(400, "A valid JSON request is required."); }
  const body = parseConfirmInput(raw);
  if (!body) return routeError(400, "A valid confirmation is required.");
  return apiResponse(await callPaymentIntentApi({
    method: "POST", path: `/api/payment-intents/${id}/confirm`, body,
    requestId: request.headers.get("x-request-id"),
  }));
}
