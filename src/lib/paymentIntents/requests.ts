import { isPaymentIntentId } from "./contract";

const AMOUNT = /^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/;
const HASH = /^[a-f0-9]{64}$/;
const VERSION = /^(?:0|[1-9]\d*)$/;
const IDEMPOTENCY = /^[\x21-\x7e]{16,128}$/;
const SOLANA_ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export type CreatePaymentIntentInput = Readonly<{ recipient: string; amount: string; purpose: string }> | Readonly<{
  recipientType: "payment_identity"; recipientAccountId: string; amount: string; purpose: string;
  trustAcknowledgment?: Readonly<{ acknowledged: true }>;
}>;
export type ConfirmPaymentIntentInput = Readonly<{ requestHash: string; expectedVersion: string }>;

export function parseCreateInput(value: unknown): CreatePaymentIntentInput | undefined {
  if (typeof value === "object" && value !== null && !Array.isArray(value) && (value as Record<string,unknown>).recipientType === "payment_identity") {
    if (!hasOnly(value, ["recipientType","recipientAccountId","amount","purpose","trustAcknowledgment"])) return undefined;
    if (typeof value.recipientAccountId !== "string" || !isPaymentIntentId(value.recipientAccountId)) return undefined;
    const trust = value.trustAcknowledgment;
    if (trust !== undefined && (!hasOnly(trust,["acknowledged"]) || trust.acknowledged !== true)) return undefined;
    const common = parseCommon(value.amount,value.purpose); if (!common) return undefined;
    return { recipientType: "payment_identity", recipientAccountId: value.recipientAccountId.toLowerCase(), ...common,
      ...(trust ? { trustAcknowledgment: { acknowledged: true as const } } : {}) };
  }
  if (!hasOnly(value, ["recipient", "amount", "purpose"])) return undefined;
  if (typeof value.recipient !== "string" || !SOLANA_ADDRESS.test(value.recipient.trim())) return undefined;
  if (typeof value.amount !== "string" || !AMOUNT.test(value.amount) || value.amount === "0") return undefined;
  if (typeof value.purpose !== "string") return undefined;
  const purpose = value.purpose.trim();
  if (!purpose || new TextEncoder().encode(purpose).length > 120) return undefined;
  return { recipient: value.recipient.trim(), amount: value.amount, purpose };
}

function parseCommon(amount: unknown, purposeValue: unknown): Readonly<{ amount: string; purpose: string }> | undefined {
  if (typeof amount !== "string" || !AMOUNT.test(amount) || amount === "0" || typeof purposeValue !== "string") return undefined;
  const purpose = purposeValue.trim();
  return !purpose || new TextEncoder().encode(purpose).length > 120 ? undefined : { amount, purpose };
}

export function parseConfirmInput(value: unknown): ConfirmPaymentIntentInput | undefined {
  if (!hasOnly(value, ["requestHash", "expectedVersion"])) return undefined;
  if (typeof value.requestHash !== "string" || !HASH.test(value.requestHash)) return undefined;
  if (typeof value.expectedVersion !== "string" || !VERSION.test(value.expectedVersion)) return undefined;
  return { requestHash: value.requestHash, expectedVersion: value.expectedVersion };
}

export function validIdempotencyKey(value: string | null): value is string {
  return typeof value === "string" && IDEMPOTENCY.test(value);
}

export function validPaymentIntentId(value: string): boolean { return isPaymentIntentId(value); }

export function isCanonicalSolanaAddressInput(value: string): boolean {
  return SOLANA_ADDRESS.test(value.trim());
}

export function paymentIntentRequestFromRecipient(input: Readonly<{
  recipientInput: string;
  walletFallback: string;
  amount: string;
  purpose: string;
}>): CreatePaymentIntentInput | undefined {
  const recipient = isCanonicalSolanaAddressInput(input.recipientInput)
    ? input.recipientInput.trim()
    : input.walletFallback.trim();
  return parseCreateInput({ recipient, amount: input.amount, purpose: input.purpose });
}

function hasOnly(value: unknown, fields: readonly string[]): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) &&
    Object.keys(value).every((key) => fields.includes(key)) && Object.keys(value).length === fields.length;
}
