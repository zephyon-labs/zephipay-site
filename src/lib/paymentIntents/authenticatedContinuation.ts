import type { AuthenticatedBodyResult } from "@/lib/auth/authenticatedRequests";
import { parsePaymentIntentResponse, type PaymentIntent } from "@/lib/paymentIntents/contract";

type ConfirmationRail = "standard" | "solana-devnet";

export type ConfirmedPaymentFollowUp = Readonly<{
  confirmed: PaymentIntent;
  response: Promise<AuthenticatedBodyResult<unknown>>;
}>;

export function beginConfirmedPaymentFollowUp(
  confirmation: AuthenticatedBodyResult<unknown>,
  rail: ConfirmationRail,
  onConfirmed: (confirmed: PaymentIntent) => void,
): ConfirmedPaymentFollowUp {
  let followUp: ConfirmedPaymentFollowUp | undefined;
  confirmation.apply(({ response, body }) => {
    const parsed = parsePaymentIntentResponse(body);
    const confirmed = parsed?.paymentIntent;
    if (!response.ok || !confirmed || confirmed.status === "awaiting_confirmation" || (rail === "solana-devnet" && confirmed.recipientType !== "direct_wallet")) {
      throw new Error(readError(body, rail === "solana-devnet" ? "Unable to confirm the Devnet payment." : "Unable to confirm the payment."));
    }
    onConfirmed(confirmed);
    const encodedId = encodeURIComponent(confirmed.id);
    // A confirmation replay may already be completed, failed, or unresolved.
    // Only a newly applied PROCESSING confirmation carries execution authority.
    const execute = confirmed.status === "processing" && parsed.applied === true;
    const path = rail === "solana-devnet" ? `/api/payment-intents/${encodedId}/devnet` : `/api/payment-intents/${encodedId}`;
    followUp = {
      confirmed,
      response: confirmation.followUpJson(
        `${path}/${execute ? "execute" : "execution"}`,
        execute ? {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestHash: confirmed.requestHash,
            expectedVersion: confirmed.version,
            ...(rail === "solana-devnet" ? { mode: "solana-devnet" } : {}),
          }),
        } : { method: "GET", credentials: "same-origin", cache: "no-store" },
      ),
    };
  });
  if (!followUp) throw new Error("The confirmed payment continuation was unavailable.");
  return followUp;
}

function readError(value: unknown, fallback: string): string {
  return typeof value === "object" && value !== null && "error" in value && typeof value.error === "string" ? value.error : fallback;
}
