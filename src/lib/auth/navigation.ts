export type ProtectedReturnTo = "/personal/identity" | "/personal/send";

export function authLoginHref(returnTo: ProtectedReturnTo, signUp = false): string {
  const parameters = new URLSearchParams({ returnTo });
  if (signUp) parameters.set("screen_hint", "signup");
  return `/auth/login?${parameters.toString()}`;
}

export function protectedRouteDecision(sessionPresent: boolean, returnTo: ProtectedReturnTo): Readonly<
  { kind: "content" } | { kind: "local-signed-out-gate"; signInHref: string }
> {
  return sessionPresent ? { kind: "content" } : { kind: "local-signed-out-gate", signInHref: authLoginHref(returnTo) };
}

export function sdkLogoutUrl(appBaseUrl: string, requestOrigin: string | null): URL | undefined {
  const baseUrl = new URL(appBaseUrl);
  if (requestOrigin !== baseUrl.origin) return undefined;
  return new URL("/auth/logout", baseUrl);
}
