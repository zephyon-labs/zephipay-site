export type SafeRecipientError = Readonly<{ ok: false; error: string }>;

export function recipientFailure(status: number, error: string): { status: number; body: SafeRecipientError } {
  return { status, body: { ok: false, error } };
}

export function normalizeRecipientError(status: number): { status: number; body: SafeRecipientError } {
  if (status === 400) return recipientFailure(400, "Enter a valid exact ZephiPay username.");
  if (status === 401) return recipientFailure(401, "Your session must be renewed.");
  if (status === 403) return recipientFailure(403, "Recipient access is unavailable.");
  if (status === 404) return recipientFailure(404, "Recipient was not found.");
  if (status === 429) return recipientFailure(429, "Too many recipient searches. Wait a moment and try again.");
  return recipientFailure(503, "Recipient search is temporarily unavailable.");
}
