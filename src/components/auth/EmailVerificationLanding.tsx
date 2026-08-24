import { Button } from "@/components/ui/Button";
import {
  verificationLoginHref,
  type VerificationContinuation,
  type VerificationStatusModel,
} from "@/lib/auth/emailVerification";

type LandingCopy = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
}>;

export function EmailVerificationLanding({
  model,
  continuation,
}: Readonly<{
  model: VerificationStatusModel;
  continuation: VerificationContinuation;
}>) {
  const copy = landingCopy(model);
  const verified = model.status === "verified";
  const sessionPresent = model.status !== "sign-in-required";

  return (
    <section aria-labelledby="email-verification-heading" className="relative overflow-hidden rounded-[2rem] border border-border-default bg-surface-glass p-7 shadow-[var(--shadow-medium)] backdrop-blur-2xl sm:p-10">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-secondary/70 to-transparent" />
      <div className="relative max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-secondary">{copy.eyebrow}</p>
        <h1 id="email-verification-heading" className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{copy.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground-secondary">{copy.description}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {verified ? (
            <Button href={continuation} size="lg">Continue to ZephiPay</Button>
          ) : (
            <Button href={verificationLoginHref(continuation)} fullDocument size="lg">
              {sessionPresent ? "Check verification status" : "Sign in to confirm status"}
            </Button>
          )}
          <Button href="/personal" variant="outline" size="lg">Return to Personal</Button>
        </div>

        <div className="mt-9 grid gap-3 border-t border-border-subtle pt-6 text-sm leading-6 text-foreground-secondary sm:grid-cols-2">
          <p>Email verification does not select an account or change Payment Identity ownership.</p>
          <p>{sessionPresent ? "To use a different account, log out first and then sign in deliberately." : "Only the current validated ZephiPay session can confirm verification status."}</p>
        </div>
      </div>
    </section>
  );
}

function landingCopy(model: VerificationStatusModel): LandingCopy {
  if (model.status === "verified") {
    return {
      eyebrow: "Current session confirmed",
      title: "Email verified",
      description: "Your current signed-in ZephiPay session confirms that its email address is verified. Your canonical account and Payment Identity remain unchanged.",
    };
  }

  if (model.result === "processed") {
    return {
      eyebrow: model.status === "refresh-required" ? "Status refresh required" : "Sign-in required",
      title: "Verification request processed",
      description: model.status === "refresh-required"
        ? "The verification link was processed, but your current application session does not yet confirm the change. Check status through the canonical sign-in flow to obtain a fresh session."
        : "The verification link was processed, but link possession does not authenticate a ZephiPay account. Sign in to confirm the status of the current account.",
    };
  }

  if (model.result === "not-confirmed") {
    return {
      eyebrow: model.status === "refresh-required" ? "Current session unchanged" : "Recovery available",
      title: "Verification could not be confirmed",
      description: model.status === "refresh-required"
        ? "The verification result was unsuccessful or no longer usable. Your current session remains authoritative; check status deliberately if you have completed verification another way."
        : "The verification result was unsuccessful or no longer usable. Sign in deliberately to check the current account status or request a new verification email from account settings.",
    };
  }

  return {
    eyebrow: model.status === "refresh-required" ? "Current session unchanged" : "Neutral verification landing",
    title: "Confirm your verification status",
    description: model.status === "refresh-required"
      ? "This landing did not receive a recognized verification result. Your current session remains unchanged; check status deliberately to obtain a fresh session."
      : "This landing did not receive a recognized verification result. Sign in deliberately to check the current ZephiPay account status.",
  };
}
