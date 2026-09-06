"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { useAccountHydration } from "@/components/auth/AccountHydrationProvider";
import type { SendRecipientMode } from "./PaymentComposeForm";

export type SendDraft = Readonly<{
  recipientMode: SendRecipientMode;
  username: string;
  walletAddress: string;
  amount: string;
  purpose: string;
}>;

export const EMPTY_SEND_DRAFT: SendDraft = {
  recipientMode: "zephipay", username: "", walletAddress: "", amount: "", purpose: "",
};

type OwnedDraft = Readonly<{ accountId: string; draft: SendDraft }>;
export type SendDraftPaymentCycle = Readonly<{ accountId: string; paymentIntentId: string; generation: number }>;
type DraftState = Readonly<{ generation: number; owned?: OwnedDraft; payment?: SendDraftPaymentCycle }>;
type DraftContext = Readonly<{
  draft: SendDraft;
  generation: number;
  payment?: SendDraftPaymentCycle;
  update: (change: Partial<SendDraft>) => void;
  clear: () => void;
  associatePayment: (paymentIntentId: string, generation: number) => void;
  completePayment: (cycle: SendDraftPaymentCycle) => void;
}>;

const SendDraftContext = createContext<DraftContext | undefined>(undefined);

/** Holds typed input only, outside the subtree that authority checks unmount.
 * Unavailable authority never exposes the retained draft. Only a fresh
 * authoritative read confirming the same account can make it available again.
 */
export function SendDraftProvider({ children }: { children: ReactNode }) {
  const { account, status } = useAccountHydration();
  const [stored, setStored] = useState<DraftState>({ generation: 0 });
  const { owned } = stored;
  const signedOut = status === "signing-out" || status === "signed-out" || status === "reauthentication-required";
  const ownerChanged = Boolean(account && owned && account.id !== owned.accountId);
  // Adjust before children render, so a replacement principal cannot observe
  // the previous draft for even one committed frame.
  if (owned && (signedOut || ownerChanged)) setStored(current => ({ generation: current.generation + 1 }));

  const usable = status === "authenticated" && owned?.accountId === account?.id;
  const draft = usable ? owned?.draft ?? EMPTY_SEND_DRAFT : EMPTY_SEND_DRAFT;
  const update = useCallback((change: Partial<SendDraft>) => {
    if (status !== "authenticated" || !account) return;
    setStored(current => {
      const sameAccount = current.owned?.accountId === account.id;
      const previous = sameAccount ? current.owned!.draft : EMPTY_SEND_DRAFT;
      if (sameAccount && Object.entries(change).every(([key, value]) => previous[key as keyof SendDraft] === value)) return current;
      // Editing starts a distinct revision and drops the previous payment link.
      return { generation: current.generation + 1, owned: { accountId: account.id, draft: { ...previous, ...change } } };
    });
  }, [account, status]);
  const clear = useCallback(() => setStored(current => ({ generation: current.generation + 1 })), []);
  const associatePayment = useCallback((paymentIntentId: string, generation: number) => {
    if (status !== "authenticated" || !account) return;
    setStored(current => current.owned?.accountId === account.id && current.generation === generation
      ? { ...current, payment: { accountId: account.id, paymentIntentId: paymentIntentId.toLowerCase(), generation } }
      : current);
  }, [account, status]);
  const completePayment = useCallback((cycle: SendDraftPaymentCycle) => {
    // This comparison and clear are atomic. Late/duplicate completions cannot
    // consume another revision, account, or payment, even in one React batch.
    setStored(current => current.owned?.accountId === cycle.accountId
      && current.generation === cycle.generation
      && current.payment?.generation === cycle.generation
      && current.payment.paymentIntentId === cycle.paymentIntentId
      ? { generation: current.generation + 1 } : current);
  }, []);

  return <SendDraftContext.Provider value={{ draft, generation: stored.generation, payment: usable ? stored.payment : undefined, update, clear, associatePayment, completePayment }}>{children}</SendDraftContext.Provider>;
}

export function useSendDraft() { return useContext(SendDraftContext); }
