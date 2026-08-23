import "server-only";

import { randomUUID } from "node:crypto";

import { authConfigured, paymentScopes } from "@/lib/auth0";
import { isReauthenticationRequiredError } from "@/lib/auth/auth0Errors";
import { ApplicationSessionUnavailableError, getApplicationAccessToken, getApplicationSession } from "@/lib/auth/serverAuthority";

import { failure, normalizePaymentError, reauthenticationRequiredPaymentFailure } from "./errors";
import type { PaymentIntentApiResult } from "./serverClient";

export async function callExecutionApi(input: {
  method: "GET" | "POST";
  path: string;
  body?: unknown;
  requestId?: string | null;
}): Promise<PaymentIntentApiResult> {
  if (!authConfigured()) return failure(503, "Payment service is not configured.");
  if (!await getApplicationSession()) return reauthenticationRequiredPaymentFailure();
  const backendUrl = process.env.ZEPHIPAY_BACKEND_URL?.trim();
  const audience = process.env.AUTH0_AUDIENCE?.trim();
  if (!backendUrl || !audience) return failure(503, "Payment service is not configured.");
  const requestId = input.requestId && /^[\x21-\x7e]{1,128}$/.test(input.requestId) ? input.requestId : randomUUID();

  try {
    const { token } = await getApplicationAccessToken({ audience, scope: paymentScopes });
    const response = await fetch(new URL(input.path, backendUrl), {
      method: input.method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "X-Request-Id": requestId,
        ...(input.body === undefined ? {} : { "Content-Type": "application/json" }),
      },
      body: input.body === undefined ? undefined : JSON.stringify(input.body),
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.headers.get("content-type")?.includes("application/json")) return failure(502, "Payment service returned an invalid response.");
    const body: unknown = await response.json();
    if (response.ok) return { status: response.status, body: body as never };
    if (response.status === 404 && input.method === "GET" && /\/api\/payment-intents\/[^/]+\/devnet\/execution$/.test(input.path) && devnetExecutionMissing(body)) {
      return { status: 404, body: { ok: false, code: "DEVNET_EXECUTION_NOT_FOUND", error: "No Devnet execution has started yet." } };
    }
    const normalized = response.status === 401 ? reauthenticationRequiredPaymentFailure() : normalizePaymentError(response.status);
    console.warn("Payment execution upstream request failed.", { category: normalized.body.code, requestId, status: response.status });
    return normalized;
  } catch (error) {
    if (isReauthenticationRequiredError(error) || error instanceof ApplicationSessionUnavailableError) return reauthenticationRequiredPaymentFailure();
    console.warn("Payment execution upstream request failed.", { category: "TEMPORARILY_UNAVAILABLE", requestId, status: 503 });
    return failure(503, "Payment service is temporarily unavailable.");
  }
}

function devnetExecutionMissing(value: unknown) {
  return typeof value === "object" && value !== null && (value as { code?: unknown }).code === "DEVNET_NOT_FOUND" &&
    (value as { error?: unknown }).error === "Devnet execution was not found.";
}
