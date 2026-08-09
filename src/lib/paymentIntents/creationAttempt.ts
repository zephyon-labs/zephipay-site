export type PaymentCreationFingerprintInput = Readonly<{
  recipientAccountId: string;
  amount: string;
  purpose: string | null;
  trustAcknowledged: boolean;
}>;

export type PaymentCreationAttempt = Readonly<{
  fingerprint: string;
  idempotencyKey: string;
}>;

export function paymentCreationFingerprint(input: PaymentCreationFingerprintInput): string {
  return JSON.stringify([input.recipientAccountId, input.amount, input.purpose, input.trustAcknowledged]);
}

export function creationAttemptFor(
  current: PaymentCreationAttempt | undefined,
  fingerprint: string,
  createKey: () => string,
): PaymentCreationAttempt {
  return current?.fingerprint === fingerprint ? current : { fingerprint, idempotencyKey: createKey() };
}
