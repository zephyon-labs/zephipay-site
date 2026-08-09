import type { PublicRecipient, RecipientVerificationState } from "./contract";

export type TrustMode = "ready" | "confirmation_required" | "blocked";

export function trustModeFor(verificationState: RecipientVerificationState): TrustMode {
  if (verificationState === "verified") return "ready";
  if (verificationState === "restricted") return "blocked";
  return "confirmation_required";
}

export function trustModeForRecipient(recipient: PublicRecipient): TrustMode {
  if (recipient.identitySource === "synthetic_beta") return "ready";
  return trustModeFor(recipient.verificationState);
}

export function canReachDirectoryHandoff(recipient: PublicRecipient, acknowledged: boolean): boolean {
  if (recipient.payabilityState !== "available") return false;
  const mode = trustModeForRecipient(recipient);
  return mode === "ready" || mode === "confirmation_required" && acknowledged;
}

export type RecipientModeState = Readonly<{
  advancedWalletOpen: boolean;
  walletAddress: string;
  selectedRecipient?: PublicRecipient;
  trustAcknowledged: boolean;
}>;

export function openAdvancedWallet(state: RecipientModeState): RecipientModeState {
  return { advancedWalletOpen: true, walletAddress: state.walletAddress, trustAcknowledged: false };
}

export function selectDirectoryRecipient(state: RecipientModeState, selectedRecipient: PublicRecipient): RecipientModeState {
  return { advancedWalletOpen: false, walletAddress: "", selectedRecipient, trustAcknowledged: false };
}
