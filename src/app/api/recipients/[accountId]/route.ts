import { callRecipientApi, requireRecipientSession } from "@/lib/recipients/serverClient";
import { validRecipientAccountId } from "@/lib/recipients/requests";
import { recipientApiResponse, recipientRouteError } from "@/lib/recipients/routeResponse";

export async function GET(request: Request, context: RouteContext<"/api/recipients/[accountId]">) {
  const sessionError = await requireRecipientSession();
  if (sessionError) return recipientApiResponse(sessionError);
  const { accountId } = await context.params;
  if (!validRecipientAccountId(accountId)) return recipientRouteError(404, "Recipient was not found.");
  return recipientApiResponse(await callRecipientApi({
    method: "GET", path: `/api/recipients/${accountId.toLowerCase()}`, response: "resolve",
    requestId: request.headers.get("x-request-id"),
  }));
}
