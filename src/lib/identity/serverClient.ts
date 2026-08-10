import "server-only";
import { randomUUID } from "node:crypto";
import { authConfigured, getAuth0 } from "@/lib/auth0";
import { parseIdentityReadResponse, parseIdentityWriteResponse, type IdentityFailure, type IdentitySuccess } from "./contract";
import { classifyIdentityFailure } from "./errors";

export type IdentityApiResult = Readonly<{ status: number; body: IdentitySuccess | IdentityFailure }>;
export async function callIdentityApi(method: "GET" | "PUT", body?: unknown): Promise<IdentityApiResult> {
  if (!authConfigured()) return failure(503, "NOT_CONFIGURED", "Payment Identity is not configured.");
  const auth0 = getAuth0();
  if (!await auth0.getSession()) return failure(401, "AUTHENTICATION_REQUIRED", "Sign in is required.");
  const backendUrl = process.env.ZEPHIPAY_BACKEND_URL?.trim(); const audience = process.env.AUTH0_AUDIENCE?.trim();
  if (!backendUrl || !audience) return failure(503, "NOT_CONFIGURED", "Payment Identity is not configured.");
  const requestId = randomUUID();
  try {
    const { token } = await auth0.getAccessToken({ audience, scope: "read:account" });
    const response = await fetch(new URL("/api/account/identity", backendUrl), { method, headers: { Accept: "application/json", Authorization: `Bearer ${token}`,
      "X-Request-Id": requestId, ...(body === undefined ? {} : { "Content-Type": "application/json" }) }, body: body === undefined ? undefined : JSON.stringify(body), cache: "no-store", signal: AbortSignal.timeout(5_000) });
    if (!response.headers.get("content-type")?.toLowerCase().includes("application/json")) return unavailable(requestId, response.status);
    const raw: unknown = await response.json().catch(() => undefined);
    if (!response.ok) return normalizeError(response.status, raw, requestId);
    const parsed = method === "GET" ? parseIdentityReadResponse(raw) : parseIdentityWriteResponse(raw);
    return parsed ? { status: response.status, body: parsed } : unavailable(requestId, response.status);
  } catch { return unavailable(requestId); }
}

function normalizeError(status: number, value: unknown, requestId: string): IdentityApiResult {
  const code = record(value) && typeof value.code === "string" ? value.code : "";
  const classified = classifyIdentityFailure(status, code);
  if (classified.body.code === "TEMPORARILY_UNAVAILABLE") return unavailable(requestId, status);
  console.warn("Payment Identity upstream request rejected.", { requestId, category: classified.body.code, upstreamStatus: status });
  return classified;
}
function unavailable(requestId: string, upstreamStatus?: number) {
  console.warn("Payment Identity authoritative read failed.", { requestId, category: "TEMPORARILY_UNAVAILABLE", ...(upstreamStatus ? { upstreamStatus } : {}) });
  return failure(503, "TEMPORARILY_UNAVAILABLE", "Payment Identity is temporarily unavailable.");
}
function failure(status: number, code: IdentityFailure["code"], error: string): IdentityApiResult { return { status, body: { ok: false, code, error } }; }
function record(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
