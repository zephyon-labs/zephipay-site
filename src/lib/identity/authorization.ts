import { ACCOUNT_READ_SCOPE, ACCOUNT_WRITE_SCOPE } from "@/lib/auth/sessionSafety";

export type IdentityMethod = "GET" | "PUT";

export function identityScopeFor(method: IdentityMethod): string {
  return method === "GET" ? ACCOUNT_READ_SCOPE : ACCOUNT_WRITE_SCOPE;
}

export function identityRequiresReauthentication(method: IdentityMethod, upstreamStatus: number, authenticateHeader: string | null): boolean {
  return upstreamStatus === 401 || (
    method === "PUT" &&
    upstreamStatus === 403 &&
    authenticateHeader?.includes('error="insufficient_scope"') === true
  );
}
