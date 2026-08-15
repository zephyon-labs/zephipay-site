import { isPaymentIntentId } from "./contract";

export const DEVNET_EXECUTION_STATUSES = ["preparing", "prepared", "submitting", "accepted", "reconciling", "settled", "failed", "unknown_reconciliation_required"] as const;
export type DevnetExecutionStatus = typeof DEVNET_EXECUTION_STATUSES[number];
export type DevnetExecution = Readonly<{
  paymentIntentId: string;
  executionId: string;
  network: "solana-devnet";
  rail: "solana";
  asset: "USDC";
  amount: string;
  amountRaw: string;
  recipientWallet: string;
  status: DevnetExecutionStatus;
  transactionSignature?: string;
  providerStatus?: "accepted" | "rejected" | "unknown" | "settled";
  settledAt?: string;
  failureCategory?: "provider_rejected" | "chain_failed" | "internal_validation";
  reconciliationPending: boolean;
  receiptId?: string;
}>;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const INTEGER = /^(?:0|[1-9]\d*)$/;
const AMOUNT = /^(?:0|[1-9]\d*)(?:\.\d{1,6})?$/;
const ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const SIGNATURE = /^[1-9A-HJ-NP-Za-km-z]{64,96}$/;

export function parseDevnetExecutionResponse(value: unknown): DevnetExecution | undefined {
  if (!record(value) || value.ok !== true || !record(value.execution)) return;
  const execution = value.execution;
  const allowed=["paymentIntentId","executionId","network","rail","asset","amount","amountRaw","recipientWallet","status","transactionSignature","providerStatus","settledAt","failureCategory","reconciliationPending","receiptId"];
  if (Object.keys(execution).some(key=>!allowed.includes(key)) || typeof execution.paymentIntentId !== "string" || !isPaymentIntentId(execution.paymentIntentId) ||
      typeof execution.executionId !== "string" || !UUID.test(execution.executionId) ||
      execution.network !== "solana-devnet" || execution.rail !== "solana" || execution.asset !== "USDC" ||
      typeof execution.amount !== "string" || !AMOUNT.test(execution.amount) ||
      typeof execution.amountRaw !== "string" || !INTEGER.test(execution.amountRaw) || execution.amountRaw === "0" ||
      typeof execution.recipientWallet !== "string" || !ADDRESS.test(execution.recipientWallet) ||
      !DEVNET_EXECUTION_STATUSES.includes(execution.status as DevnetExecutionStatus) ||
      typeof execution.reconciliationPending !== "boolean" ||
      (execution.transactionSignature !== undefined && (typeof execution.transactionSignature !== "string" || !SIGNATURE.test(execution.transactionSignature))) ||
      (execution.providerStatus !== undefined && !["accepted", "rejected", "unknown", "settled"].includes(String(execution.providerStatus))) ||
      (execution.settledAt !== undefined && !date(execution.settledAt)) ||
      (execution.failureCategory !== undefined && !["provider_rejected", "chain_failed", "internal_validation"].includes(String(execution.failureCategory))) ||
      (execution.receiptId !== undefined && typeof execution.receiptId !== "string")) return;
  return execution as unknown as DevnetExecution;
}

export function devnetExecutionTerminal(status: DevnetExecutionStatus) {
  return status === "settled" || status === "failed";
}

function record(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
function date(value: unknown): value is string { return typeof value === "string" && Number.isFinite(Date.parse(value)); }
