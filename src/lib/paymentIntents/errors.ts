export type PaymentErrorCode =
  | "INVALID_REQUEST"
  | "AUTHENTICATION_REQUIRED"
  | "AUTHORIZATION_DENIED"
  | "NOT_FOUND"
  | "DEVNET_EXECUTION_NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "TEMPORARILY_UNAVAILABLE";

export type SafePaymentError = Readonly<{ ok: false; code: PaymentErrorCode; error: string }>;

export function normalizePaymentError(status: number): { status: number; body: SafePaymentError } {
  if (status === 400) return failure(400, "Review the payment details and try again.");
  if (status === 401) return failure(401, "Your session must be renewed.");
  if (status === 403) return failure(403, "This payment action is not authorized for this account.");
  if (status === 404) return failure(404, "Payment intent was not found.");
  if (status === 409) return failure(409, "The payment intent changed. Refresh its status and try again.");
  if (status === 429) return failure(429, "Too many status checks. Please wait before checking again.");
  return failure(503, "Payment service is temporarily unavailable.");
}

export function failure(status: number, error: string): { status: number; body: SafePaymentError } {
  return { status, body: { ok: false, code: codeForStatus(status), error } };
}

function codeForStatus(status: number): PaymentErrorCode {
  if (status === 400) return "INVALID_REQUEST";
  if (status === 401) return "AUTHENTICATION_REQUIRED";
  if (status === 403) return "AUTHORIZATION_DENIED";
  if (status === 404) return "NOT_FOUND";
  if (status === 409) return "CONFLICT";
  if (status === 429) return "RATE_LIMITED";
  return "TEMPORARILY_UNAVAILABLE";
}
