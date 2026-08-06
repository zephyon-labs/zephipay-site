import "server-only";
import { randomUUID } from "node:crypto";
import { authConfigured, getAuth0 } from "@/lib/auth0";
import { parseIdentityReadResponse, parseIdentityWriteResponse, type IdentityFailure, type IdentitySuccess } from "./contract";

export type IdentityApiResult = Readonly<{ status: number; body: IdentitySuccess | IdentityFailure }>;
export async function callIdentityApi(method: "GET" | "PUT", body?: unknown): Promise<IdentityApiResult> {
  if (!authConfigured()) return failure(503, "SERVICE_UNAVAILABLE", "Payment Identity is not configured.");
  const auth0 = getAuth0();
  if (!await auth0.getSession()) return failure(401, "AUTH_REQUIRED", "Sign in is required.");
  const backendUrl = process.env.ZEPHIPAY_BACKEND_URL?.trim(); const audience = process.env.AUTH0_AUDIENCE?.trim();
  if (!backendUrl || !audience) return failure(503, "SERVICE_UNAVAILABLE", "Payment Identity is not configured.");
  try {
    const { token } = await auth0.getAccessToken({ audience, scope: "read:account" });
    const response = await fetch(new URL("/api/account/identity", backendUrl), { method, headers: { Accept: "application/json", Authorization: `Bearer ${token}`,
      "X-Request-Id": randomUUID(), ...(body === undefined ? {} : { "Content-Type": "application/json" }) }, body: body === undefined ? undefined : JSON.stringify(body), cache: "no-store", signal: AbortSignal.timeout(5_000) });
    if (!response.headers.get("content-type")?.toLowerCase().includes("application/json")) return unavailable();
    const raw: unknown = await response.json().catch(() => undefined);
    if (!response.ok) return normalizeError(response.status, raw);
    const parsed = method === "GET" ? parseIdentityReadResponse(raw) : parseIdentityWriteResponse(raw);
    return parsed ? { status: response.status, body: parsed } : unavailable();
  } catch { return unavailable(); }
}

function normalizeError(status: number, value: unknown): IdentityApiResult {
  const code = record(value) && typeof value.code === "string" ? value.code : "";
  if (status === 401) return failure(401, "AUTH_REQUIRED", "Your session must be renewed.");
  if (status === 403) return failure(403, "ACCESS_DENIED", "Account access is unavailable.");
  if (status === 400 && code === "VALIDATION_ERROR") return failure(400, "VALIDATION_ERROR", "Check the highlighted identity details.");
  if (status === 409 && code === "USERNAME_UNAVAILABLE") return failure(409, "USERNAME_UNAVAILABLE", "That username is unavailable.");
  if (status === 409 && code === "VERSION_CONFLICT") return failure(409, "VERSION_CONFLICT", "Your Payment Identity changed in another session.");
  return unavailable();
}
function unavailable() { return failure(503, "SERVICE_UNAVAILABLE", "Payment Identity is temporarily unavailable."); }
function failure(status: number, code: IdentityFailure["code"], error: string): IdentityApiResult { return { status, body: { ok: false, code, error } }; }
function record(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
