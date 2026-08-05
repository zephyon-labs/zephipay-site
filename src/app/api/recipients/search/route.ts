import { callRecipientApi, requireRecipientSession } from "@/lib/recipients/serverClient";
import { hasTrustedOrigin } from "@/lib/paymentIntents/origin";
import { parseRecipientSearchInput } from "@/lib/recipients/requests";
import { recipientApiResponse, recipientRouteError } from "@/lib/recipients/routeResponse";

export async function POST(request: Request) {
  if (!hasTrustedOrigin(request)) return recipientRouteError(403, "Request origin is not allowed.");
  const sessionError = await requireRecipientSession();
  if (sessionError) return recipientApiResponse(sessionError);
  const raw: unknown = await request.json().catch(() => undefined);
  const body = parseRecipientSearchInput(raw);
  if (!body) return recipientRouteError(400, "Enter a valid exact ZephiPay username.");
  return recipientApiResponse(await callRecipientApi({
    method: "POST", path: "/api/recipients/search", response: "search", body,
    requestId: request.headers.get("x-request-id"),
  }));
}
