import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { authConfigured } from "@/lib/auth0";
import { authenticatedResponseHeaders, reauthenticationRequiredFailure } from "@/lib/auth/authFailure";
import { isReauthenticationRequiredError } from "@/lib/auth/auth0Errors";
import { ApplicationSessionUnavailableError, getApplicationAccessToken, getApplicationSession } from "@/lib/auth/serverAuthority";
import { ACCOUNT_READ_SCOPE } from "@/lib/auth/sessionSafety";
import { isAccountResponse } from "@/lib/accountResponse";

const headers = { "Cache-Control": "no-store, private", Pragma: "no-cache" };

export async function GET() {
  if (!authConfigured()) return safeError(503, "Authentication is not configured.");
  const session = await getApplicationSession();
  if (!session) return safeReauthenticationError();
  const backendUrl = process.env.ZEPHIPAY_BACKEND_URL?.trim();
  const audience = process.env.AUTH0_AUDIENCE?.trim();
  if (!backendUrl || !audience) return safeError(503, "Account service is not configured.", true);

  try {
    const { token } = await getApplicationAccessToken({ audience, scope: ACCOUNT_READ_SCOPE });
    const response = await fetch(new URL("/api/account/me", backendUrl), {
      headers: { Authorization: `Bearer ${token}`, "X-Request-Id": randomUUID() },
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    if (response.status === 401) return safeReauthenticationError();
    if (response.status === 403) return safeError(403, "Account access is unavailable.", true);
    if (!response.ok) return safeError(502, "Account service is temporarily unavailable.", true);
    const body: unknown = await response.json();
    if (!isAccountResponse(body)) return safeError(502, "Account service returned an invalid response.", true);
    return NextResponse.json(body, { headers });
  } catch (error) {
    if (isReauthenticationRequiredError(error) || error instanceof ApplicationSessionUnavailableError) return safeReauthenticationError();
    return safeError(502, "Account service is temporarily unavailable.", true);
  }
}

function safeError(status: number, error: string, authenticated = false) {
  return NextResponse.json({ ok: false, authenticated, error }, { status, headers });
}

function safeReauthenticationError() {
  const failure = reauthenticationRequiredFailure();
  return NextResponse.json(failure.body, { status: failure.status, headers: authenticatedResponseHeaders(failure.body, headers) });
}
