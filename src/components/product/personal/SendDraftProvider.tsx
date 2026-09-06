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
type DraftContext = Readonly<{
  draft: SendDraft;
  update: (change: Partial<SendDraft>) => void;
  clear: () => void;
}>;

const SendDraftContext = createContext<DraftContext | undefined>(undefined);

/** Holds typed input only, outside the subtree that authority checks unmount.
 * Unavailable authority never exposes the retained draft. Only a fresh
 * authoritative read confirming the same account can make it available again.
 */
export function SendDraftProvider({ children }: { children: ReactNode }) {
  const { account, status } = useAccountHydration();
  const [owned, setOwned] = useState<OwnedDraft>();
  const signedOut = status === "signing-out" || status === "signed-out" || status === "reauthentication-required";
  const ownerChanged = Boolean(account && owned && account.id !== owned.accountId);
  // Adjust before children render, so a replacement principal cannot observe
  // the previous draft for even one committed frame.
  if (owned && (signedOut || ownerChanged)) setOwned(undefined);

  const draft = status === "authenticated" && owned?.accountId === account?.id
    ? owned?.draft ?? EMPTY_SEND_DRAFT : EMPTY_SEND_DRAFT;
  const update = useCallback((change: Partial<SendDraft>) => {
    if (status !== "authenticated" || !account) return;
    setOwned(current => ({
      accountId: account.id,
      draft: { ...(current?.accountId === account.id ? current.draft : EMPTY_SEND_DRAFT), ...change },
    }));
  }, [account, status]);
  const clear = useCallback(() => setOwned(undefined), []);

  return <SendDraftContext.Provider value={{ draft, update, clear }}>{children}</SendDraftContext.Provider>;
}

export function useSendDraft() { return useContext(SendDraftContext); }
