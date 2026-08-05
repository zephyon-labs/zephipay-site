import "server-only";

import { randomUUID } from "node:crypto";

import { authConfigured, getAuth0 } from "@/lib/auth0";
import { parseRecipientResolveResponse, parseRecipientSearchResponse, type RecipientResolveSuccess, type RecipientSearchSuccess } from "./contract";
import { normalizeRecipientError, recipientFailure, type SafeRecipientError } from "./errors";

export type RecipientApiResult = Readonly<{
  status: number;
  body: RecipientSearchSuccess | RecipientResolveSuccess | SafeRecipientError;
}>;

export async function requireRecipientSession(): Promise<RecipientApiResult | undefined> {
  if (!authConfigured()) return recipientFailure(503, "Recipient search is not configured.");
  return await getAuth0().getSession() ? undefined : recipientFailure(401, "Sign in is required.");
}

export async function callRecipientApi(input: Readonly<{
  method: "GET" | "POST";
  path: string;
  response: "search" | "resolve";
  requestId?: string | null;
  body?: unknown;
}>): Promise<RecipientApiResult> {
  if (!authConfigured()) return recipientFailure(503, "Recipient search is not configured.");
  const auth0 = getAuth0();
  if (!await auth0.getSession()) return recipientFailure(401, "Sign in is required.");
  const backendUrl = process.env.ZEPHIPAY_BACKEND_URL?.trim();
  const audience = process.env.AUTH0_AUDIENCE?.trim();
  if (!backendUrl || !audience) return recipientFailure(503, "Recipient search is not configured.");
  try {
    const { token } = await auth0.getAccessToken({ audience, scope: "read:account" });
    const response = await fetch(new URL(input.path, backendUrl), {
      method: input.method,
      headers: {
        Accept: "application/json", Authorization: `Bearer ${token}`,
        "X-Request-Id": boundedRequestId(input.requestId),
        ...(input.body === undefined ? {} : { "Content-Type": "application/json" }),
      },
      body: input.body === undefined ? undefined : JSON.stringify(input.body),
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return recipientFailure(503, "Recipient search is temporarily unavailable.");
    }
    const raw: unknown = await response.json().catch(() => undefined);
    if (!response.ok) return normalizeRecipientError(response.status);
    const parsed = input.response === "search" ? parseRecipientSearchResponse(raw) : parseRecipientResolveResponse(raw);
    return parsed ? { status: response.status, body: parsed } : recipientFailure(503, "Recipient search is temporarily unavailable.");
  } catch {
    return recipientFailure(503, "Recipient search is temporarily unavailable.");
  }
}

function boundedRequestId(value?: string | null): string {
  return value && /^[\x21-\x7e]{1,128}$/.test(value) ? value : randomUUID();
}
