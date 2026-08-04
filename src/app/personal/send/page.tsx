import { redirect } from "next/navigation";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { PaymentIntentWorkspace } from "@/components/product/personal/PaymentIntentWorkspace";
import { authConfigured, getAuth0 } from "@/lib/auth0";
import { isPaymentIntentId } from "@/lib/paymentIntents/contract";

export const metadata = { title: "Send payment | ZephiPay", description: "Create and confirm a durable ZephiPay beta payment intent." };

export default async function PersonalSendPage({ searchParams }: { searchParams: Promise<{ intent?: string | string[] }> }) {
  if (!authConfigured() || !await getAuth0().getSession()) redirect("/auth/login?returnTo=%2Fpersonal%2Fsend");
  const raw = (await searchParams).intent;
  const recoveryId = typeof raw === "string" && isPaymentIntentId(raw) ? raw : undefined;
  return <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
    <SiteHeader /><AmbientBackground />
    <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-20 pt-36 sm:px-6 sm:pt-40 lg:grid-cols-[0.65fr_1.35fr]">
      <aside className="pt-4">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">Personal · Send</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">A deliberate payment flow.</h2>
        <p className="mt-6 max-w-md text-lg leading-8 text-foreground-secondary">Create the intent, review the persisted record, then explicitly approve it. Execution remains disabled.</p>
        <div className="mt-8 rounded-[1.4rem] border border-border-default bg-surface-glass p-5 text-sm leading-6 text-foreground-secondary">
          <p className="font-medium text-foreground">ZephiPay Beta</p>
          <p className="mt-2">USDC · Solana devnet · intent recording only</p>
        </div>
      </aside>
      <PaymentIntentWorkspace recoveryId={recoveryId} />
    </div>
  </main>;
}
