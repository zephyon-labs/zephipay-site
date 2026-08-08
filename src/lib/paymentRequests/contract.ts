import type { PublicRecipient } from "@/lib/recipients/contract";

export const PAYMENT_REQUEST_STATUSES = ["pending", "accepted", "declined", "cancelled", "expired", "paid"] as const;
export type PaymentRequestStatus = (typeof PAYMENT_REQUEST_STATUSES)[number];
export type PaymentRequestParty = Pick<PublicRecipient, "accountId" | "username" | "displayName" | "accountType" | "verificationState"> & { capturedAt: string; schemaVersion: 1 };
export type PaymentRequest = Readonly<{
  requestId: string; role: "requester" | "payer"; direction: "requested" | "request_received";
  status: PaymentRequestStatus; version: string; requestHash: string; requester: PaymentRequestParty; payer: PaymentRequestParty;
  amountRaw: string; amount: string; asset: "USDC"; purpose: string | null; createdAt: string; updatedAt: string;
  acceptedAt?: string; declinedAt?: string; cancelledAt?: string; expiredAt?: string; paidAt?: string;
  linkedPaymentIntentId?: string; linkedExecutionId?: string; linkedReceiptId?: string;
}>;
export type PaymentRequestCreateResponse = Readonly<{ ok: true; paymentRequest: PaymentRequest; created: boolean }>;
export type PaymentRequestListResponse = Readonly<{ ok: true; items: PaymentRequest[] }>;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const HASH = /^[a-f0-9]{64}$/;
const INTEGER = /^(?:0|[1-9]\d*)$/;
const AMOUNT = /^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/;

export function parsePaymentRequestCreateResponse(value: unknown): PaymentRequestCreateResponse | undefined {
  if (!record(value) || value.ok !== true || typeof value.created !== "boolean") return undefined;
  const paymentRequest = parsePaymentRequest(value.paymentRequest);
  return paymentRequest ? { ok: true, paymentRequest, created: value.created } : undefined;
}
export function parsePaymentRequestListResponse(value: unknown): PaymentRequestListResponse | undefined {
  if (!record(value) || value.ok !== true || !Array.isArray(value.items) || value.items.length > 50) return undefined;
  const items = value.items.map(parsePaymentRequest);
  return items.some((item) => !item) ? undefined : { ok: true, items: items as PaymentRequest[] };
}
export function parsePaymentRequest(value: unknown): PaymentRequest | undefined {
  if (!record(value) || Object.keys(value).some((key)=>!["requestId","role","direction","status","version","requestHash","requester","payer","amountRaw","amount","asset","purpose","createdAt","updatedAt","acceptedAt","declinedAt","cancelledAt","expiredAt","paidAt","linkedPaymentIntentId","linkedExecutionId","linkedReceiptId"].includes(key)) || !UUID.test(String(value.requestId)) || !["requester", "payer"].includes(String(value.role)) ||
      !["requested", "request_received"].includes(String(value.direction)) || !PAYMENT_REQUEST_STATUSES.includes(value.status as PaymentRequestStatus) ||
      typeof value.version !== "string" || !INTEGER.test(value.version) || typeof value.requestHash !== "string" || !HASH.test(value.requestHash) ||
      typeof value.amountRaw !== "string" || !INTEGER.test(value.amountRaw) || typeof value.amount !== "string" || !AMOUNT.test(value.amount) ||
      value.asset !== "USDC" || (value.purpose !== null && typeof value.purpose !== "string") || !date(value.createdAt) || !date(value.updatedAt)) return undefined;
  const requester = party(value.requester), payer = party(value.payer); if (!requester || !payer) return undefined;
  for (const key of ["acceptedAt","declinedAt","cancelledAt","expiredAt","paidAt"] as const) if (value[key] !== undefined && !date(value[key])) return undefined;
  for (const key of ["linkedPaymentIntentId","linkedExecutionId","linkedReceiptId"] as const) if (value[key] !== undefined && (typeof value[key] !== "string" || !UUID.test(value[key]))) return undefined;
  return value as unknown as PaymentRequest;
}
function party(value: unknown): PaymentRequestParty | undefined { if (!record(value) || !UUID.test(String(value.accountId)) || typeof value.username !== "string" || typeof value.displayName !== "string" || !["personal","creator","business","ai_agent"].includes(String(value.accountType)) || !["unverified","pending","verified"].includes(String(value.verificationState)) || !date(value.capturedAt) || value.schemaVersion !== 1) return undefined; return value as PaymentRequestParty; }
function record(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
function date(value: unknown): value is string { return typeof value === "string" && !Number.isNaN(Date.parse(value)); }
