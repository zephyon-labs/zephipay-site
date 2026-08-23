import "server-only";

import { randomUUID } from "node:crypto";

import { authConfigured, paymentScopes } from "@/lib/auth0";
import { isReauthenticationRequiredError } from "@/lib/auth/auth0Errors";
import { ApplicationSessionUnavailableError, getApplicationAccessToken, getApplicationSession } from "@/lib/auth/serverAuthority";
import { parsePaymentIntentResponse, type PaymentIntentSuccess } from "./contract";
import { failure, normalizePaymentError, reauthenticationRequiredPaymentFailure } from "./errors";

export type PaymentIntentApiResult = Readonly<{
  status: number;
  body: PaymentIntentSuccess | ReturnType<typeof failure>["body"];
}>;

export async function requirePaymentSession(): Promise<PaymentIntentApiResult | undefined> {
  if (!authConfigured()) return failure(503, "Payment service is not configured.");
  return await getApplicationSession() ? undefined : reauthenticationRequiredPaymentFailure();
}

export async function callPaymentIntentApi(input: Readonly<{
  method: "GET" | "POST";
  path: string;
  requestId?: string | null;
  idempotencyKey?: string;
  body?: unknown;
}>): Promise<PaymentIntentApiResult> {
  if (!authConfigured()) return failure(503, "Payment service is not configured.");
  if (!await getApplicationSession()) return reauthenticationRequiredPaymentFailure();
  const backendUrl = process.env.ZEPHIPAY_BACKEND_URL?.trim();
  const audience = process.env.AUTH0_AUDIENCE?.trim();
  if (!backendUrl || !audience) return failure(503, "Payment service is not configured.");
  const requestId = boundedRequestId(input.requestId);

  try {
    const { token } = await getApplicationAccessToken({ audience, scope: paymentScopes });
    const headers: Record<string, string> = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-Request-Id": requestId,
    };
    if (input.body !== undefined) headers["Content-Type"] = "application/json";
    if (input.idempotencyKey) headers["Idempotency-Key"] = input.idempotencyKey;
    const response = await fetch(new URL(input.path, backendUrl), {
      method: input.method,
      headers,
      body: input.body === undefined ? undefined : JSON.stringify(input.body),
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return failure(502, "Payment service returned an invalid response.");
    }
    let upstream: unknown;
    try { upstream = await response.json(); } catch { return failure(502, "Payment service returned an invalid response."); }
    if (response.ok) {
      const parsed = parsePaymentIntentResponse(upstream);
      return parsed ? { status: response.status, body: parsed } : failure(502, "Payment service returned an invalid response.");
    }
    const normalized = response.status === 401 ? reauthenticationRequiredPaymentFailure() : normalizePaymentError(response.status);
    console.warn("Payment intent upstream request failed.", { category: normalized.body.code, requestId, status: response.status });
    return normalized;
  } catch (error) {
    if (isReauthenticationRequiredError(error) || error instanceof ApplicationSessionUnavailableError) return reauthenticationRequiredPaymentFailure();
    console.warn("Payment intent upstream request failed.", { category: "TEMPORARILY_UNAVAILABLE", requestId, status: 503 });
    return failure(503, "Payment service is temporarily unavailable.");
  }
}

function boundedRequestId(value?: string | null): string {
  return value && /^[\x21-\x7e]{1,128}$/.test(value) ? value : randomUUID();
}
