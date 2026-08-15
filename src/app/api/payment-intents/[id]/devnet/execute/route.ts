import { callExecutionApi } from "@/lib/paymentIntents/backendProxy";
import { hasTrustedOrigin } from "@/lib/paymentIntents/origin";
import { validPaymentIntentId } from "@/lib/paymentIntents/requests";
import { apiResponse, routeError } from "@/lib/paymentIntents/routeResponse";

export async function POST(request: Request, context: RouteContext<"/api/payment-intents/[id]/devnet/execute">) {
  if (!hasTrustedOrigin(request)) return routeError(403, "Request origin is not allowed.");
  const { id } = await context.params;
  if (!validPaymentIntentId(id)) return routeError(400, "A valid payment intent ID is required.");
  let raw: unknown;
  try { raw = await request.json(); } catch { return routeError(400, "A valid JSON request is required."); }
  const body = parseDevnetExecuteInput(raw);
  if (!body) return routeError(400, "A valid Devnet execution request is required.");
  return apiResponse(await callExecutionApi({ method: "POST", path: `/api/payment-intents/${id}/devnet/execute`, body, requestId: request.headers.get("x-request-id") }));
}

function parseDevnetExecuteInput(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return;
  const body = value as Record<string, unknown>, keys = Object.keys(body);
  if (keys.length !== 3 || keys.some(key => !["requestHash", "expectedVersion", "mode"].includes(key)) ||
      typeof body.requestHash !== "string" || !/^[a-f0-9]{64}$/.test(body.requestHash) ||
      typeof body.expectedVersion !== "string" || !/^(?:0|[1-9]\d*)$/.test(body.expectedVersion) || body.mode !== "solana-devnet") return;
  return { requestHash: body.requestHash, expectedVersion: body.expectedVersion, mode: "solana-devnet" as const };
}
