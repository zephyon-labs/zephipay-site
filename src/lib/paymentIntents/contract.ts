export const PAYMENT_INTENT_STATUSES = ["awaiting_confirmation", "processing"] as const;

export type PaymentIntentStatus = (typeof PAYMENT_INTENT_STATUSES)[number];

export type PaymentIntent = Readonly<{
  id: string;
  status: PaymentIntentStatus;
  version: string;
  requestHash: string;
  recipient: string;
  amountRaw: string;
  amount: string;
  asset: "USDC";
  network: "solana-devnet";
  purpose: string;
  createdAt: string;
  userConfirmedAt?: string;
}>;

export type PaymentIntentSuccess = Readonly<{
  ok: true;
  paymentIntent: PaymentIntent;
  applied?: boolean;
}>;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const HASH = /^[a-f0-9]{64}$/;
const INTEGER = /^(?:0|[1-9]\d*)$/;
const AMOUNT = /^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/;
const SOLANA_ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export function isPaymentIntentId(value: string): boolean {
  return UUID.test(value);
}

export function parsePaymentIntentResponse(value: unknown): PaymentIntentSuccess | undefined {
  if (!isRecord(value) || value.ok !== true || !isRecord(value.paymentIntent)) return undefined;
  const intent = value.paymentIntent;
  if (
    typeof intent.id !== "string" || !UUID.test(intent.id) ||
    !PAYMENT_INTENT_STATUSES.includes(intent.status as PaymentIntentStatus) ||
    typeof intent.version !== "string" || !INTEGER.test(intent.version) ||
    typeof intent.requestHash !== "string" || !HASH.test(intent.requestHash) ||
    typeof intent.recipient !== "string" || !SOLANA_ADDRESS.test(intent.recipient) ||
    typeof intent.amountRaw !== "string" || !INTEGER.test(intent.amountRaw) || intent.amountRaw === "0" ||
    typeof intent.amount !== "string" || !AMOUNT.test(intent.amount) ||
    intent.asset !== "USDC" || intent.network !== "solana-devnet" ||
    typeof intent.purpose !== "string" || intent.purpose.length === 0 || new TextEncoder().encode(intent.purpose).length > 120 ||
    typeof intent.createdAt !== "string" || !isIsoDate(intent.createdAt) ||
    (intent.userConfirmedAt !== undefined &&
      (typeof intent.userConfirmedAt !== "string" || !isIsoDate(intent.userConfirmedAt))) ||
    (value.applied !== undefined && typeof value.applied !== "boolean")
  ) return undefined;

  return {
    ok: true,
    paymentIntent: {
      id: intent.id.toLowerCase(),
      status: intent.status as PaymentIntentStatus,
      version: intent.version,
      requestHash: intent.requestHash,
      recipient: intent.recipient,
      amountRaw: intent.amountRaw,
      amount: intent.amount,
      asset: "USDC",
      network: "solana-devnet",
      purpose: intent.purpose,
      createdAt: intent.createdAt,
      ...(intent.userConfirmedAt ? { userConfirmedAt: intent.userConfirmedAt } : {}),
    },
    ...(typeof value.applied === "boolean" ? { applied: value.applied } : {}),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isIsoDate(value: string): boolean {
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString() === value;
}
