import "server-only";
import { randomUUID } from "node:crypto";
import { authConfigured } from "@/lib/auth0";
import { REAUTHENTICATION_REQUIRED_MESSAGE } from "@/lib/auth/authFailure";
import { isReauthenticationRequiredError } from "@/lib/auth/auth0Errors";
import { ApplicationSessionUnavailableError, getApplicationAccessToken, getApplicationSession } from "@/lib/auth/serverAuthority";
import { ACCOUNT_READ_SCOPE } from "@/lib/auth/sessionSafety";
import { parseZpResponse, type ZpFailure, type ZpSuccess } from "./contract";

export type ZpApiResult = Readonly<{ status: number; body: ZpSuccess | ZpFailure }>;
export async function callZpApi(): Promise<ZpApiResult> {
  if (!authConfigured()) return failure(503, "NOT_CONFIGURED", "ZP progress is not configured.");
  if (!await getApplicationSession()) return reauthenticationRequired();
  const backendUrl = process.env.ZEPHIPAY_BACKEND_URL?.trim(), audience = process.env.AUTH0_AUDIENCE?.trim();
  if (!backendUrl || !audience) return failure(503, "NOT_CONFIGURED", "ZP progress is not configured.");
  const requestId = randomUUID();
  try {
    const { token } = await getApplicationAccessToken({ audience, scope: ACCOUNT_READ_SCOPE });
    const response = await fetch(new URL("/api/account/zp", backendUrl), { headers: { Accept: "application/json", Authorization: `Bearer ${token}`, "X-Request-Id": requestId }, cache: "no-store", signal: AbortSignal.timeout(5_000) });
    const raw: unknown = response.headers.get("content-type")?.toLowerCase().includes("application/json") ? await response.json().catch(() => undefined) : undefined;
    if (!response.ok) return response.status === 401 ? reauthenticationRequired() : unavailable(requestId, response.status);
    const parsed = parseZpResponse(raw);
    return parsed ? { status: response.status, body: parsed } : unavailable(requestId, response.status);
  } catch (error) { return isReauthenticationRequiredError(error) || error instanceof ApplicationSessionUnavailableError ? reauthenticationRequired() : unavailable(requestId); }
}
function reauthenticationRequired(): ZpApiResult { return failure(401, "REAUTHENTICATION_REQUIRED", REAUTHENTICATION_REQUIRED_MESSAGE); }
function unavailable(requestId: string, upstreamStatus?: number): ZpApiResult {
  console.warn("ZP authoritative read failed.", { requestId, category: "TEMPORARILY_UNAVAILABLE", ...(upstreamStatus ? { upstreamStatus } : {}) });
  return failure(503, "TEMPORARILY_UNAVAILABLE", "ZP progress is temporarily unavailable.");
}
function failure(status: number, code: ZpFailure["code"], error: string): ZpApiResult { return { status, body: { ok: false, code, error } }; }
