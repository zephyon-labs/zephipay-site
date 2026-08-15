"use client";

import { useState } from "react";
import { DevnetTestBar } from "./DevnetTestBar";
import { PaymentIntentWorkspace } from "./PaymentIntentWorkspace";
import type { SendRecipientMode } from "./PaymentComposeForm";

export function PersonalSendExperience({ recoveryId }: { recoveryId?: string }) {
  const [recipientMode, setRecipientMode] = useState<SendRecipientMode>("zephipay");
  return <>
    <PaymentIntentWorkspace recoveryId={recoveryId} recipientMode={recipientMode} onRecipientModeChange={setRecipientMode} />
    <DevnetTestBar paymentMode={recipientMode} />
  </>;
}
