import "server-only";

import { randomUUID } from "node:crypto";

import { authConfigured } from "@/lib/auth0";
import { isReauthenticationRequiredError } from "@/lib/auth/auth0Errors";
import { ApplicationSessionUnavailableError, getApplicationAccessToken, getApplicationSession } from "@/lib/auth/serverAuthority";
import { ACCOUNT_READ_SCOPE } from "@/lib/auth/sessionSafety";
import { parseRecipientRecentResponse, parseRecipientResolveResponse, parseRecipientSearchResponse, type RecipientRecentSuccess, type RecipientResolveSuccess, type RecipientSearchSuccess } from "./contract";
import { normalizeRecipientError, recipientFailure, recipientReauthenticationRequired, type SafeRecipientError } from "./errors";

export type RecipientApiResult = Readonly<{
  status: number;
  body: RecipientSearchSuccess | RecipientResolveSuccess | RecipientRecentSuccess | SafeRecipientError;
}>;

export async function requireRecipientSession(): Promise<RecipientApiResult | undefined> {
  if (!authConfigured()) return recipientFailure(503, "Recipient search is not configured.");
  return await getApplicationSession() ? undefined : recipientReauthenticationRequired();
}

export async function callRecipientApi(input: Readonly<{
  method: "GET" | "POST";
  path: string;
  response: "search" | "resolve" | "recent";
  requestId?: string | null;
  body?: unknown;
}>): Promise<RecipientApiResult> {
  if (!authConfigured()) return recipientFailure(503, "Recipient search is not configured.");
  if (!await getApplicationSession()) return recipientReauthenticationRequired();
  const backendUrl = process.env.ZEPHIPAY_BACKEND_URL?.trim();
  const audience = process.env.AUTH0_AUDIENCE?.trim();
  if (!backendUrl || !audience) return recipientFailure(503, "Recipient search is not configured.");
  try {
    const scope = input.response === "recent" ? "read:payments" : ACCOUNT_READ_SCOPE;
    const { token } = await getApplicationAccessToken({ audience, scope });
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
    if (!response.ok) return response.status === 401 ? recipientReauthenticationRequired() : normalizeRecipientError(response.status);
    const parsed = input.response === "search" ? parseRecipientSearchResponse(raw) : input.response === "resolve" ? parseRecipientResolveResponse(raw) : parseRecipientRecentResponse(raw);
    return parsed ? { status: response.status, body: parsed } : recipientFailure(503, "Recipient search is temporarily unavailable.");
  } catch (error) {
    if (isReauthenticationRequiredError(error) || error instanceof ApplicationSessionUnavailableError) return recipientReauthenticationRequired();
    return recipientFailure(503, "Recipient search is temporarily unavailable.");
  }
}

function boundedRequestId(value?: string | null): string {
  return value && /^[\x21-\x7e]{1,128}$/.test(value) ? value : randomUUID();
}
