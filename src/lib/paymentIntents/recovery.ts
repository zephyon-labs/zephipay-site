import type { PaymentErrorCode } from "./errors";

const RETRY_DELAYS_MS = [0, 1_000, 3_000, 7_000] as const;

export function recoveryDelay(attempt: number): number | undefined {
  return RETRY_DELAYS_MS[attempt];
}

export function isDefinitiveRecoveryFailure(code: PaymentErrorCode | undefined): boolean {
  return code === "AUTHENTICATION_REQUIRED" || code === "AUTHORIZATION_DENIED" || code === "NOT_FOUND";
}

export function paymentErrorCode(value: unknown): PaymentErrorCode | undefined {
  if (!value || typeof value !== "object") return undefined;
  const code = (value as { code?: unknown }).code;
  return typeof code === "string" && ["INVALID_REQUEST", "AUTHENTICATION_REQUIRED", "AUTHORIZATION_DENIED", "NOT_FOUND", "DEVNET_EXECUTION_NOT_FOUND", "CONFLICT", "RATE_LIMITED", "TEMPORARILY_UNAVAILABLE"].includes(code)
    ? code as PaymentErrorCode
    : undefined;
}
