import { NextResponse } from "next/server";

export const AUTH0_SDK_ROUTES = {
  login: "/auth/login",
  logout: "/auth/logout",
  callback: "/auth/callback",
  profile: "/auth/profile",
  accessToken: "/auth/access-token",
  backChannelLogout: "/auth/backchannel-logout",
  connectAccount: "/auth/connect",
  mfaAuthenticators: "/auth/mfa/authenticators",
  mfaChallenge: "/auth/mfa/challenge",
  mfaVerify: "/auth/mfa/verify",
  mfaAssociate: "/auth/mfa/associate",
  passwordlessStart: "/auth/passwordless/start",
  passwordlessVerify: "/auth/passwordless/verify",
  passwordlessDbOtpChallenge: "/auth/passwordless/otp/challenge",
  passwordlessDbGetToken: "/auth/passwordless/otp/token",
  passkeyRegister: "/auth/passkey/register",
  passkeyChallenge: "/auth/passkey/challenge",
  passkeyGetToken: "/auth/passkey/get-token",
  passkeyEnrollmentChallenge: "/auth/passkey/enrollment-challenge",
  passkeyEnrollmentVerify: "/auth/passkey/enrollment-verify",
} as const;

export const AUTH0_ALLOWED_ROUTE_SURFACE = [
  { method: "GET", pathname: AUTH0_SDK_ROUTES.login },
  { method: "GET", pathname: AUTH0_SDK_ROUTES.callback },
  { method: "GET", pathname: AUTH0_SDK_ROUTES.logout },
] as const;

export const AUTH0_DISABLED_ROUTE_SURFACE = Object.values(AUTH0_SDK_ROUTES).filter(
  (pathname) => !AUTH0_ALLOWED_ROUTE_SURFACE.some((route) => route.pathname === pathname),
);

export function authRouteAllowed(method: string, pathname: string): boolean {
  return AUTH0_ALLOWED_ROUTE_SURFACE.some((route) => route.method === method.toUpperCase() && route.pathname === pathname);
}

export function authRouteBoundary(method: string, pathname: string): NextResponse | undefined {
  if (authRouteAllowed(method, pathname)) return undefined;
  return NextResponse.json(
    { error: "Not found." },
    { status: 404, headers: { "Cache-Control": "private, no-store", Pragma: "no-cache" } },
  );
}
