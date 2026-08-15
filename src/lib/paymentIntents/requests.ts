import { isPaymentIntentId } from "./contract";
import { address } from "@solana/kit";

const AMOUNT = /^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/;
const HASH = /^[a-f0-9]{64}$/;
const VERSION = /^(?:0|[1-9]\d*)$/;
const IDEMPOTENCY = /^[\x21-\x7e]{16,128}$/;
const SOLANA_ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export type CreatePaymentIntentInput = Readonly<{ recipient: string; amount: string; purpose: string | null }> | Readonly<{
  recipientType: "payment_identity"; recipientAccountId: string; amount: string; purpose: string | null;
  trustAcknowledgment?: Readonly<{ acknowledged: true }>;
}>;
export type ConfirmPaymentIntentInput = Readonly<{ requestHash: string; expectedVersion: string }>;

export function parseCreateInput(value: unknown): CreatePaymentIntentInput | undefined {
  if (typeof value === "object" && value !== null && !Array.isArray(value) && (value as Record<string,unknown>).recipientType === "payment_identity") {
    if (!hasAllowed(value, ["recipientType","recipientAccountId","amount","purpose","trustAcknowledgment"], ["recipientType","recipientAccountId","amount"])) return undefined;
    if (typeof value.recipientAccountId !== "string" || !isPaymentIntentId(value.recipientAccountId)) return undefined;
    const trust = value.trustAcknowledgment;
    if (trust !== undefined && (!hasOnly(trust,["acknowledged"]) || trust.acknowledged !== true)) return undefined;
    const common = parseCommon(value.amount,value.purpose); if (!common) return undefined;
    return { recipientType: "payment_identity", recipientAccountId: value.recipientAccountId.toLowerCase(), ...common,
      ...(trust ? { trustAcknowledgment: { acknowledged: true as const } } : {}) };
  }
  if (!hasAllowed(value, ["recipient", "amount", "purpose"], ["recipient", "amount"])) return undefined;
  if (typeof value.recipient !== "string" || !SOLANA_ADDRESS.test(value.recipient.trim())) return undefined;
  if (typeof value.amount !== "string" || !AMOUNT.test(value.amount) || value.amount === "0") return undefined;
  if (value.purpose !== undefined && value.purpose !== null && typeof value.purpose !== "string") return undefined;
  const purpose = typeof value.purpose === "string" && value.purpose.trim() ? value.purpose.trim() : null;
  if (purpose && new TextEncoder().encode(purpose).length > 120) return undefined;
  return { recipient: value.recipient.trim(), amount: value.amount, purpose };
}

function parseCommon(amount: unknown, purposeValue: unknown): Readonly<{ amount: string; purpose: string | null }> | undefined {
  if (typeof amount !== "string" || !AMOUNT.test(amount) || amount === "0" || (purposeValue !== undefined && purposeValue !== null && typeof purposeValue !== "string")) return undefined;
  const purpose = typeof purposeValue === "string" && purposeValue.trim() ? purposeValue.trim() : null;
  return purpose && new TextEncoder().encode(purpose).length > 120 ? undefined : { amount, purpose };
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
  const canonical = value.trim();
  if (canonical !== value || !SOLANA_ADDRESS.test(canonical)) return false;
  try { return String(address(canonical)) === canonical; } catch { return false; }
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
function hasAllowed(value: unknown, fields: readonly string[], required: readonly string[]): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) &&
    Object.keys(value).every((key) => fields.includes(key)) && required.every((key) => key in value);
}
