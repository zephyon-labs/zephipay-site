import { EmailVerificationLanding } from "@/components/auth/EmailVerificationLanding";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import {
  parseVerificationRequest,
  resolveVerificationStatus,
  type VerificationSearchParams,
} from "@/lib/auth/emailVerification";
import { getApplicationSession } from "@/lib/auth/serverAuthority";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = {
  title: "Email verification | ZephiPay",
  description: "Confirm the email-verification status of the current ZephiPay session.",
};

export default async function EmailVerifiedPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<VerificationSearchParams>;
}>) {
  const [parameters, session] = await Promise.all([searchParams, getApplicationSession()]);
  const request = parseVerificationRequest(parameters);
  const status = resolveVerificationStatus(Boolean(session), session?.user.email_verified === true, request.result);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-foreground">
      <SiteHeader />
      <AmbientBackground />
      <div className="mx-auto max-w-5xl px-4 pb-20 pt-36 sm:px-6 sm:pt-40">
        <EmailVerificationLanding model={status} continuation={request.continuation} />
      </div>
    </main>
  );
}
