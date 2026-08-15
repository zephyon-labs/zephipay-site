"use client";

import { useState } from "react";
import { PaymentIntentWorkspace } from "./PaymentIntentWorkspace";
import type { SendRecipientMode } from "./PaymentComposeForm";

export function PersonalSendExperience({ recoveryId }: { recoveryId?: string }) {
  const [recipientMode, setRecipientMode] = useState<SendRecipientMode>("zephipay");
  const devnetMode = recipientMode === "solana-devnet";
  return <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-20 pt-36 sm:px-6 sm:pt-40 lg:grid-cols-[0.65fr_1.35fr]">
    <aside className="pt-4">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">Personal · Send</p>
      <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">A deliberate payment flow.</h2>
      <p className="mt-6 max-w-md text-lg leading-8 text-foreground-secondary">{devnetMode ? "Create the payment, review it, then explicitly confirm execution through the secure Devnet payment lifecycle." : "Create the intent, review it, then explicitly confirm execution through the simulated payment lifecycle."}</p>
      <div className="mt-8 rounded-[1.4rem] border border-border-default bg-surface-glass p-5 text-sm leading-6 text-foreground-secondary">
        <p className="font-medium text-foreground">{devnetMode ? "ZephiPay Devnet" : "ZephiPay Beta"}</p>
        <p className="mt-2">{devnetMode ? "Circle USDC · Solana Devnet" : "USDC · Mock Rail · simulated settlement"}</p>
      </div>
    </aside>
    <div className="min-w-0">
      <PaymentIntentWorkspace recoveryId={recoveryId} recipientMode={recipientMode} onRecipientModeChange={setRecipientMode} />
    </div>
  </div>;
}
