import { randomUUID } from "node:crypto";

import { callPaymentIntentApi, requirePaymentSession } from "@/lib/paymentIntents/serverClient";
import { hasTrustedOrigin } from "@/lib/paymentIntents/origin";
import { parseCreateInput, validIdempotencyKey } from "@/lib/paymentIntents/requests";
import { apiResponse, routeError } from "@/lib/paymentIntents/routeResponse";

export async function POST(request: Request) {
  if (!hasTrustedOrigin(request)) return routeError(403, "Request origin is not allowed.");
  const sessionError = await requirePaymentSession();
  if (sessionError) return apiResponse(sessionError);
  let raw: unknown;
  try { raw = await request.json(); } catch { return routeError(400, "A valid JSON request is required."); }
  const body = parseCreateInput(raw);
  if (!body) return routeError(400, "Review the payment details and try again.");
  const suppliedKey = request.headers.get("idempotency-key");
  const idempotencyKey = suppliedKey === null ? randomUUID() : suppliedKey;
  if (!validIdempotencyKey(idempotencyKey)) return routeError(400, "A valid idempotency key is required.");
  return apiResponse(await callPaymentIntentApi({
    method: "POST", path: "/api/payment-intents", body, idempotencyKey,
    requestId: request.headers.get("x-request-id"),
  }));
}
