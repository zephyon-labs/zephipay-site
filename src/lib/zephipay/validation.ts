import type { SendPaymentInput } from "./types";

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof SendPaymentInput, string>>;
}

export function validateSendPayment(
  input: SendPaymentInput,
): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  if (!input.recipient.trim()) {
    errors.recipient = "Enter a recipient wallet address.";
  }

  if (!Number.isFinite(input.amount) || input.amount <= 0) {
    errors.amount = "Enter an amount greater than zero.";
  }

  if (!input.purpose.trim()) {
    errors.purpose = "Add a payment purpose.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
