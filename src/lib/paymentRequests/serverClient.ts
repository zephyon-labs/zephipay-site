import "server-only";

import { randomUUID } from "node:crypto";

import { authConfigured, paymentScopes } from "@/lib/auth0";
import { reauthenticationRequiredFailure } from "@/lib/auth/authFailure";
import { isReauthenticationRequiredError } from "@/lib/auth/auth0Errors";
import { ApplicationSessionUnavailableError, getApplicationAccessToken, getApplicationSession } from "@/lib/auth/serverAuthority";

import { parsePaymentRequest, parsePaymentRequestCreateResponse, parsePaymentRequestListResponse } from "./contract";

export type RequestApiResult = { status: number; body: unknown };

export async function callPaymentRequestApi(input: {
  method: "GET" | "POST";
  path: string;
  body?: unknown;
  idempotencyKey?: string;
  requestId?: string | null;
  response: "create" | "list" | "read" | "command";
}): Promise<RequestApiResult> {
  if (!authConfigured()) return fail(503, "Payment request service is not configured.");
  if (!await getApplicationSession()) return reauthenticationRequiredFailure();
  const backend = process.env.ZEPHIPAY_BACKEND_URL?.trim();
  const audience = process.env.AUTH0_AUDIENCE?.trim();
  if (!backend || !audience) return fail(503, "Payment request service is not configured.");

  try {
    const { token } = await getApplicationAccessToken({ audience, scope: paymentScopes });
    const response = await fetch(new URL(input.path, backend), {
      method: input.method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "X-Request-Id": input.requestId && /^[\x21-\x7e]{1,128}$/.test(input.requestId) ? input.requestId : randomUUID(),
        ...(input.body === undefined ? {} : { "Content-Type": "application/json" }),
        ...(input.idempotencyKey ? { "Idempotency-Key": input.idempotencyKey } : {}),
      },
      body: input.body === undefined ? undefined : JSON.stringify(input.body),
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    const raw: unknown = await response.json().catch(() => undefined);
    if (!response.ok) return response.status === 401 ? reauthenticationRequiredFailure() : fail([400, 403, 404, 409].includes(response.status) ? response.status : 503, "Payment request could not be completed.");
    let parsed: unknown;
    if (input.response === "create") parsed = parsePaymentRequestCreateResponse(raw);
    else if (input.response === "list") parsed = parsePaymentRequestListResponse(raw);
    else parsed = record(raw) && raw.ok === true && parsePaymentRequest(raw.paymentRequest) ? raw : undefined;
    return parsed ? { status: response.status, body: parsed } : fail(502, "Payment request service returned an invalid response.");
  } catch (error) {
    if (isReauthenticationRequiredError(error) || error instanceof ApplicationSessionUnavailableError) return reauthenticationRequiredFailure();
    return fail(503, "Payment request service is temporarily unavailable.");
  }
}

function fail(status: number, error: string) {
  return { status, body: { ok: false, error } };
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
