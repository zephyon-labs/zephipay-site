import type { SessionData } from "@auth0/nextjs-auth0/types";

export const AUTH_SESSION_COOKIE_NAME = "__zephipay_session_v2";
export const AUTH_SESSION_ABSOLUTE_DURATION_SECONDS = 7 * 24 * 60 * 60;

export const ACCOUNT_READ_SCOPE = "read:account";
export const ACCOUNT_WRITE_SCOPE = "write:account";

const REQUIRED_SCOPES = ["openid", "profile", "email", ACCOUNT_READ_SCOPE, ACCOUNT_WRITE_SCOPE] as const;

export function authorizationScope(configuredScope: string | undefined, paymentScopes: string): string {
  const configured = configuredScope?.trim().split(/\s+/).filter(Boolean) ?? [];
  const requested = [...REQUIRED_SCOPES, ...configured];
  return [...new Set([...requested.filter((scope) => scope !== "offline_access"), ...paymentScopes.split(/\s+/).filter(Boolean)])].join(" ");
}

export async function removeRefreshCapability(session: SessionData): Promise<SessionData> {
  const tokenSet = { ...session.tokenSet };
  delete tokenSet.refreshToken;
  return { ...session, tokenSet };
}
