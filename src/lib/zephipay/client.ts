import type {
  PaymentResult,
  SendPaymentInput,
  ZephiPayApiError,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_ZEPHIPAY_API_URL?.replace(
  /\/$/,
  "",
);

export class ZephiPayClientError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ZephiPayClientError";
    this.status = status;
  }
}

export function isZephiPayConfigured(): boolean {
  return Boolean(API_URL);
}

export async function sendPayment(
  input: SendPaymentInput,
): Promise<PaymentResult> {
  if (!API_URL) {
    throw new ZephiPayClientError(
      "The ZephiPay payment service is not connected to this site yet.",
    );
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}/api/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient: input.recipient.trim(),
        amount: input.amount,
        purpose: input.purpose.trim(),
      }),
    });
  } catch {
    throw new ZephiPayClientError(
      "ZephiPay could not reach the payment service. Please try again.",
    );
  }

  const payload = (await response.json().catch(() => null)) as
    | PaymentResult
    | ZephiPayApiError
    | null;

  if (!response.ok) {
    const errorPayload = payload as ZephiPayApiError | null;

    throw new ZephiPayClientError(
      errorPayload?.error ??
        "The payment could not be submitted.",
      response.status,
    );
  }

  if (
    !payload ||
    !("ok" in payload) ||
    payload.ok !== true ||
    !("receiptId" in payload) ||
    !("signature" in payload)
  ) {
    throw new ZephiPayClientError(
      "ZephiPay received an unexpected response from the payment service.",
    );
  }

  return payload;
}
