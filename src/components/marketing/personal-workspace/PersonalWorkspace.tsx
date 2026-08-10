"use client";

import { useState } from "react";

import { ActivityInterfacePreview } from "@/components/product/personal";
import { PaymentIntentWorkspace } from "@/components/product/personal/PaymentIntentWorkspace";
import { PaymentRequestWorkspace } from "@/components/product/personal/PaymentRequestWorkspace";
import { PaymentRequestActivity } from "@/components/product/personal/PaymentRequestActivity";
import { PaymentIdentityStatus } from "@/components/product/personal/PaymentIdentityStatus";
import { Button } from "@/components/ui/Button";
import type { MoneyMode } from "@/lib/zephipay/types";
import { cn } from "@/utils/cn";

import type { PersonalWorkspaceProps } from "./types";

const modes: Array<{ id: MoneyMode; label: string }> = [
  { id: "send", label: "Send" },
  { id: "request", label: "Request" },
  { id: "transfer", label: "Transfer" },
];

function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="rounded-[1.5rem] border border-border-subtle bg-background/45 p-6">
    <p className="font-medium text-foreground">{title}</p>
    <p className="mt-2 max-w-xl text-sm leading-6 text-foreground-secondary">{description}</p>
  </div>;
}

export function PersonalWorkspace({ className, authenticated = false, recoveryId }: PersonalWorkspaceProps) {
  const [activeMode, setActiveMode] = useState<MoneyMode>("send");

  return <div className={cn("overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass shadow-[var(--shadow-medium)] backdrop-blur-2xl", className)}>
    <div className="grid gap-px border-b border-border-subtle bg-border-subtle md:grid-cols-3">
      {[
        ["Available balance", "Connect account", "Your live balance will appear after account connection."],
        ["Pending requests", "No account data", "Real payment requests will appear here."],
        ["Verified receipts", "Authoritative records", "Every completed payment creates a durable receipt you can revisit."],
      ].map(([label,value,description]) => <div key={label} className="bg-background/75 p-7">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">{label}</p>
        <p className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-foreground">{value}</p>
        <p className="mt-2 text-sm text-foreground-secondary">{description}</p>
      </div>)}
    </div>

    <div className="p-6 sm:p-8">
      {authenticated ? <PaymentIdentityStatus /> : null}
      <div className="flex flex-col gap-5 border-b border-border-subtle pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">Personal</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">Move money</h2>
          <p className="mt-3 max-w-2xl leading-7 text-foreground-secondary">Send, request, or transfer through one clear experience. Every result shown here is tied to authoritative account and payment data.</p>
        </div>
        <div role="tablist" aria-label="Move money" className="inline-flex rounded-full border border-border-default bg-background/65 p-1">
          {modes.map((mode) => <button key={mode.id} type="button" role="tab" aria-selected={activeMode === mode.id} onClick={() => setActiveMode(mode.id)} className={cn("rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/45",activeMode === mode.id ? "bg-foreground text-background" : "text-foreground-secondary hover:text-foreground")}>{mode.label}</button>)}
        </div>
      </div>

      <div className="py-8">
        {activeMode === "send" ? authenticated
          ? <PaymentIntentWorkspace inPlace recoveryId={recoveryId} />
          : <section className="rounded-[1.5rem] border border-border-default bg-background/55 p-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">Authenticated beta</p>
              <h3 className="mt-3 text-xl font-semibold">Sign in before entering payment details</h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">Payment Identity resolution, review, execution, receipts, and activity use your authenticated ZephiPay account.</p>
              <Button className="mt-6" href="/auth/login?returnTo=%2Fpersonal%23personal-workspace">Sign in to send</Button>
            </section>
          : null}
        {activeMode === "request" ? authenticated
          ? <PaymentRequestWorkspace />
          : <section className="rounded-[1.5rem] border border-border-default bg-background/55 p-6"><p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary">Authenticated beta</p><h3 className="mt-3 text-xl font-semibold">Sign in to request money</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary">Requests are created from your authenticated ZephiPay account.</p><Button className="mt-6" href="/auth/login?returnTo=%2Fpersonal%23personal-workspace">Sign in to request</Button></section>
          : null}
        {activeMode === "transfer" ? <EmptyState title="Transfer is not available in this beta." description="Transfers between your ZephiPay-linked accounts will be available after owned accounts and balances are supported." /> : null}
      </div>

      <div id="personal-activity" className="scroll-mt-32 border-t border-border-subtle pt-8">
        {authenticated ? <><ActivityInterfacePreview /><PaymentRequestActivity /></> : <EmptyState title="Sign in to view activity." description="Authoritative payment history is available after authentication." />}
      </div>
    </div>
  </div>;
}
