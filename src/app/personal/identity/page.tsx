import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { IdentityInterface } from "@/components/product/personal";
import { ProtectedAccountBoundary } from "@/components/auth/AuthenticatedBoundary";
import { SignedOutProtectedPage } from "@/components/auth/SignedOutGate";
import { protectedRouteDecision } from "@/lib/auth/navigation";
import { getApplicationSession } from "@/lib/auth/serverAuthority";

export const dynamic = "force-dynamic";
export const metadata = { title: "Payment Identity | ZephiPay", description: "Manage your privacy-first ZephiPay Payment Identity." };

export default async function PersonalIdentityPage() {
  const session = await getApplicationSession();
  const route = protectedRouteDecision(Boolean(session), "/personal/identity");
  if (!session || route.kind === "local-signed-out-gate") return <SignedOutProtectedPage returnTo="/personal/identity" title="Sign in to manage Payment Identity" />;
  const emailVerified = session.user.email_verified === true;
  return <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
    <SiteHeader /><AmbientBackground />
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-36 sm:px-6 sm:pt-40">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">Personal · Identity</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Your Payment Identity</h1>
        <p className="mt-5 text-lg leading-8 text-foreground-secondary">Control how people recognize and find you for payments. Verification and payment availability remain authoritative ZephiPay states.</p>
      </div>
      <div className="mt-10"><ProtectedAccountBoundary returnTo="/personal/identity"><IdentityInterface emailVerified={emailVerified} /></ProtectedAccountBoundary></div>
    </div>
  </main>;
}
