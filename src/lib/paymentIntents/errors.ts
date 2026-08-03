export type SafePaymentError = Readonly<{ ok: false; error: string }>;

export function normalizePaymentError(status: number): { status: number; body: SafePaymentError } {
  if (status === 400) return failure(400, "Review the payment details and try again.");
  if (status === 401) return failure(401, "Your session must be renewed.");
  if (status === 403) return failure(403, "Payment access is not enabled for this account yet.");
  if (status === 404) return failure(404, "Payment intent was not found.");
  if (status === 409) return failure(409, "The payment intent changed. Refresh its status and try again.");
  if (status === 503) return failure(503, "Payment service is temporarily unavailable.");
  return failure(502, "Payment service is temporarily unavailable.");
}

export function failure(status: number, error: string): { status: number; body: SafePaymentError } {
  return { status, body: { ok: false, error } };
}
