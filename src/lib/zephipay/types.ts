export type MoneyMode = "send" | "request" | "transfer";

export type PaymentRecipientType =
  | "person"
  | "business"
  | "creator"
  | "agent";

export interface SendPaymentInput {
  recipientType: PaymentRecipientType;
  recipient: string;
  amount: number;
  purpose: string;
}

export interface PaymentResult {
  ok: true;
  status: string;

  runtimeId: string;
  paymentId: string;
  transactionId: string;

  receiptId: string;
  signature: string;

  recipient: string;

  amount: string;
  amountDisplay: string | number;
  asset: string;

  purpose: string;

  treasury: string;
  mint: string;

  payCountBefore: number;
  payCountAfter: number;

  network: string;
}

export interface ZephiPayApiError {
  ok?: false;
  error: string;
}
