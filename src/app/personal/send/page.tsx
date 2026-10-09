import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { PersonalSendExperience } from "@/components/product/personal/PersonalSendExperience";
import { ProtectedAccountBoundary } from "@/components/auth/AuthenticatedBoundary";
import { SignedOutProtectedPage } from "@/components/auth/SignedOutGate";
import { isPaymentIntentId } from "@/lib/paymentIntents/contract";
import { protectedRouteDecision } from "@/lib/auth/navigation";
import { getApplicationSession } from "@/lib/auth/serverAuthority";

import { controlledConfirmationEnabled } from "@/lib/controlledConfirmation/client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Send payment | ZephiPay", description: "Send and recover a durable ZephiPay Mock Rail beta payment." };

export default async function PersonalSendPage({ searchParams }: { searchParams: Promise<{ intent?: string | string[]; controlled?: string }> }) {
  const session = await getApplicationSession();
  const route = protectedRouteDecision(Boolean(session), "/personal/send");
  if (route.kind === "local-signed-out-gate") return <SignedOutProtectedPage returnTo="/personal/send" title="Sign in to send a payment" />;
  const params=await searchParams;
  const controlled=controlledConfirmationEnabled() && params.controlled === "1";
  const raw = params.intent;
  const recoveryId = typeof raw === "string" && isPaymentIntentId(raw) ? raw : undefined;
  return <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
    <SiteHeader /><AmbientBackground />
    <ProtectedAccountBoundary returnTo="/personal/send"><PersonalSendExperience recoveryId={recoveryId} controlled={controlled} /></ProtectedAccountBoundary>
  </main>;
}
