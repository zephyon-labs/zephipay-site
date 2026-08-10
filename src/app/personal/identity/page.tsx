import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { IdentityInterface } from "@/components/product/personal";
import { authConfigured, getAuth0 } from "@/lib/auth0";

export const metadata = { title: "Payment Identity | ZephiPay", description: "Manage your privacy-first ZephiPay Payment Identity." };

export default async function PersonalIdentityPage() {
  const session = authConfigured() ? await getAuth0().getSession() : null;
  if (!session) redirect("/auth/login?returnTo=%2Fpersonal%2Fidentity");
  const emailVerified = session.user.email_verified === true;
  return <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
    <SiteHeader /><AmbientBackground />
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-36 sm:px-6 sm:pt-40">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-secondary">Personal · Identity</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Your Payment Identity</h1>
        <p className="mt-5 text-lg leading-8 text-foreground-secondary">Control how people recognize and find you for payments. Verification and payment availability remain authoritative ZephiPay states.</p>
      </div>
      <div className="mt-10"><IdentityInterface emailVerified={emailVerified} /></div>
    </div>
  </main>;
}
