import { redirect } from "next/navigation";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { PersonalSendExperience } from "@/components/product/personal/PersonalSendExperience";
import { authConfigured, getAuth0 } from "@/lib/auth0";
import { isPaymentIntentId } from "@/lib/paymentIntents/contract";

export const metadata = { title: "Send payment | ZephiPay", description: "Send and recover a durable ZephiPay Mock Rail beta payment." };

export default async function PersonalSendPage({ searchParams }: { searchParams: Promise<{ intent?: string | string[] }> }) {
  if (!authConfigured() || !await getAuth0().getSession()) redirect("/auth/login?returnTo=%2Fpersonal%2Fsend");
  const raw = (await searchParams).intent;
  const recoveryId = typeof raw === "string" && isPaymentIntentId(raw) ? raw : undefined;
  return <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
    <SiteHeader /><AmbientBackground />
    <PersonalSendExperience recoveryId={recoveryId} />
  </main>;
}
