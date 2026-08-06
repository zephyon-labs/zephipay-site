import { NextResponse } from "next/server";
import { callIdentityApi } from "@/lib/identity/serverClient";
import { parseIdentityWriteInput, toBackendIdentityWrite } from "@/lib/identity/requests";
import { hasTrustedOrigin } from "@/lib/paymentIntents/origin";

const headers = { "Cache-Control": "private, no-store", Pragma: "no-cache" };
export async function GET() { return respond(await callIdentityApi("GET")); }
export async function PUT(request: Request) {
  if (!hasTrustedOrigin(request)) return respond({ status: 403, body: { ok: false as const, code: "ACCESS_DENIED" as const, error: "Request origin is not allowed." } });
  const input = parseIdentityWriteInput(await request.json().catch(() => undefined));
  if (!input) return respond({ status: 400, body: { ok: false as const, code: "VALIDATION_ERROR" as const, error: "Check the highlighted identity details." } });
  return respond(await callIdentityApi("PUT", toBackendIdentityWrite(input)));
}
function respond(result: Awaited<ReturnType<typeof callIdentityApi>>) { return NextResponse.json(result.body, { status: result.status, headers }); }
