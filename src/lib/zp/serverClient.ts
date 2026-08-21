import "server-only";
import { randomUUID } from "node:crypto";
import { authConfigured, getAuth0 } from "@/lib/auth0";
import { parseZpResponse, type ZpFailure, type ZpSuccess } from "./contract";

export type ZpApiResult = Readonly<{ status: number; body: ZpSuccess | ZpFailure }>;
export async function callZpApi(): Promise<ZpApiResult> {
  if (!authConfigured()) return failure(503, "NOT_CONFIGURED", "ZP progress is not configured.");
  const auth0 = getAuth0();
  if (!await auth0.getSession()) return failure(401, "AUTHENTICATION_REQUIRED", "Sign in is required.");
  const backendUrl = process.env.ZEPHIPAY_BACKEND_URL?.trim(), audience = process.env.AUTH0_AUDIENCE?.trim();
  if (!backendUrl || !audience) return failure(503, "NOT_CONFIGURED", "ZP progress is not configured.");
  const requestId = randomUUID();
  try {
    const { token } = await auth0.getAccessToken({ audience, scope: "read:account" });
    const response = await fetch(new URL("/api/account/zp", backendUrl), { headers: { Accept: "application/json", Authorization: `Bearer ${token}`, "X-Request-Id": requestId }, cache: "no-store", signal: AbortSignal.timeout(5_000) });
    const raw: unknown = response.headers.get("content-type")?.toLowerCase().includes("application/json") ? await response.json().catch(() => undefined) : undefined;
    if (!response.ok) return unavailable(requestId, response.status);
    const parsed = parseZpResponse(raw);
    return parsed ? { status: response.status, body: parsed } : unavailable(requestId, response.status);
  } catch { return unavailable(requestId); }
}
function unavailable(requestId: string, upstreamStatus?: number): ZpApiResult {
  console.warn("ZP authoritative read failed.", { requestId, category: "TEMPORARILY_UNAVAILABLE", ...(upstreamStatus ? { upstreamStatus } : {}) });
  return failure(503, "TEMPORARILY_UNAVAILABLE", "ZP progress is temporarily unavailable.");
}
function failure(status: number, code: ZpFailure["code"], error: string): ZpApiResult { return { status, body: { ok: false, code, error } }; }
