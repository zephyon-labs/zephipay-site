import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { authConfigured, getAuth0 } from "@/lib/auth0";
import { isAccountResponse } from "@/lib/accountResponse";

const headers = { "Cache-Control": "no-store, private", Pragma: "no-cache" };

export async function GET() {
  if (!authConfigured()) return safeError(503, "Authentication is not configured.");
  const auth0 = getAuth0();
  const session = await auth0.getSession();
  if (!session) return safeError(401, "Sign in is required.");
  const backendUrl = process.env.ZEPHIPAY_BACKEND_URL?.trim();
  if (!backendUrl) return safeError(503, "Account service is not configured.");

  try {
    const { token } = await auth0.getAccessToken();
    const response = await fetch(new URL("/api/account/me", backendUrl), {
      headers: { Authorization: `Bearer ${token}`, "X-Request-Id": randomUUID() },
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    if (response.status === 401) return safeError(401, "Your session must be renewed.");
    if (response.status === 403) return safeError(403, "Account access is unavailable.");
    if (!response.ok) return safeError(502, "Account service is temporarily unavailable.");
    const body: unknown = await response.json();
    if (!isAccountResponse(body)) return safeError(502, "Account service returned an invalid response.");
    return NextResponse.json(body, { headers });
  } catch {
    return safeError(502, "Account service is temporarily unavailable.");
  }
}

function safeError(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status, headers });
}
