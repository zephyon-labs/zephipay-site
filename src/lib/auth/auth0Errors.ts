import { AccessTokenError, AccessTokenErrorCode } from "@auth0/nextjs-auth0/errors";

const reauthenticationCodes = new Set<string>([
  AccessTokenErrorCode.MISSING_SESSION,
  AccessTokenErrorCode.MISSING_REFRESH_TOKEN,
  AccessTokenErrorCode.FAILED_TO_REFRESH_TOKEN,
  AccessTokenErrorCode.SESSION_EXPIRED,
]);

export function isReauthenticationRequiredError(error: unknown): boolean {
  return error instanceof AccessTokenError && reauthenticationCodes.has(error.code);
}
