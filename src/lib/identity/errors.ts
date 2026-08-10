import type { IdentityFailure } from "./contract";

export function classifyIdentityFailure(status: number, upstreamCode = ""): Readonly<{ status: number; body: IdentityFailure }> {
  if (status === 401) return failure(401, "AUTHENTICATION_REQUIRED", "Your session must be renewed.");
  if (status === 403) return failure(403, "AUTHORIZATION_DENIED", "Account access is unavailable.");
  if (status === 404) return failure(404, "NOT_FOUND", "Payment Identity was not found.");
  if (status === 429) return failure(429, "RATE_LIMITED", "Too many requests. Wait a moment and try again.");
  if (status === 400 && upstreamCode === "VALIDATION_ERROR") return failure(400, "VALIDATION_ERROR", "Check the highlighted identity details.");
  if (status === 409 && upstreamCode === "USERNAME_UNAVAILABLE") return failure(409, "USERNAME_UNAVAILABLE", "That username is unavailable.");
  if (status === 409 && upstreamCode === "VERSION_CONFLICT") return failure(409, "VERSION_CONFLICT", "Your Payment Identity changed in another session.");
  return failure(503, "TEMPORARILY_UNAVAILABLE", "Payment Identity is temporarily unavailable.");
}

function failure(status: number, code: IdentityFailure["code"], error: string) {
  return { status, body: { ok: false as const, code, error } };
}
