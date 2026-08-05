import { callRecipientApi, requireRecipientSession } from "@/lib/recipients/serverClient";
import { recipientApiResponse } from "@/lib/recipients/routeResponse";

export async function GET(request: Request) {
  const sessionError = await requireRecipientSession();
  if (sessionError) return recipientApiResponse(sessionError);
  return recipientApiResponse(await callRecipientApi({
    method: "GET", path: "/api/recipients/recent", response: "recent",
    requestId: request.headers.get("x-request-id"),
  }));
}
