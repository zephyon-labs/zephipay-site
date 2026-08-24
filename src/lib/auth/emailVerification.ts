export const VERIFICATION_CONTINUATIONS = ["/personal", "/personal/identity", "/personal/send"] as const;

export type VerificationContinuation = (typeof VERIFICATION_CONTINUATIONS)[number];
export type VerificationResultHint = "processed" | "not-confirmed" | "unknown";
export type VerificationLandingStatus = "verified" | "refresh-required" | "sign-in-required";
export type VerificationSearchParams = Readonly<Record<string, string | string[] | undefined>>;

export type VerificationRequestModel = Readonly<{
  result: VerificationResultHint;
  continuation: VerificationContinuation;
}>;

export type VerificationStatusModel = Readonly<{
  status: VerificationLandingStatus;
  result: VerificationResultHint;
}>;

const DEFAULT_CONTINUATION: VerificationContinuation = "/personal";

export function parseVerificationRequest(searchParams: VerificationSearchParams): VerificationRequestModel {
  return Object.freeze({
    result: parseVerificationResult(searchParams.success),
    continuation: parseVerificationContinuation(searchParams.continue),
  });
}

export function parseVerificationContinuation(value: string | string[] | undefined): VerificationContinuation {
  return typeof value === "string" && VERIFICATION_CONTINUATIONS.includes(value as VerificationContinuation)
    ? value as VerificationContinuation
    : DEFAULT_CONTINUATION;
}

export function resolveVerificationStatus(
  sessionPresent: boolean,
  sessionEmailVerified: boolean,
  result: VerificationResultHint,
): VerificationStatusModel {
  if (sessionPresent && sessionEmailVerified) return Object.freeze({ status: "verified", result });
  return Object.freeze({ status: sessionPresent ? "refresh-required" : "sign-in-required", result });
}

export function verificationLandingHref(continuation: string | string[] | undefined): string {
  const safeContinuation = parseVerificationContinuation(continuation);
  return `/email-verified?${new URLSearchParams({ continue: safeContinuation }).toString()}`;
}

export function verificationLoginHref(continuation: string | string[] | undefined): string {
  return `/auth/login?${new URLSearchParams({ returnTo: verificationLandingHref(continuation) }).toString()}`;
}

function parseVerificationResult(value: string | string[] | undefined): VerificationResultHint {
  if (value === "true") return "processed";
  if (value === "false") return "not-confirmed";
  return "unknown";
}
