import "server-only";

import { controlledConfirmationEnabled } from "@/lib/controlledConfirmation/client";
import { withWebSessionReference } from "@/lib/controlledConfirmation/session";
import { Auth0Client } from "@auth0/nextjs-auth0/server";

import { AUTH_SESSION_ABSOLUTE_DURATION_SECONDS, AUTH_SESSION_COOKIE_NAME, authorizationScope, removeRefreshCapability } from "@/lib/auth/sessionSafety";
import { AUTH0_SDK_ROUTES } from "@/lib/auth/authRouteSurface";

const required = ["AUTH0_DOMAIN", "AUTH0_CLIENT_ID", "AUTH0_CLIENT_SECRET", "AUTH0_SECRET", "APP_BASE_URL", "AUTH0_AUDIENCE"] as const;

export const paymentScopes = "read:payments write:payments";

export function authConfigured(): boolean {
  return required.every((name) => Boolean(process.env[name]?.trim()));
}

let client: Auth0Client | undefined;

export function getAuth0(): Auth0Client {
  if (!authConfigured()) throw new Error("Authentication is not configured.");
  client ??= createSiteAuth0();
  return client;
}

export function createSiteAuth0(onCallback?: NonNullable<ConstructorParameters<typeof Auth0Client>[0]>["onCallback"], reauthentication=false): Auth0Client {
  return new Auth0Client({
    authorizationParameters: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: authorizationScope(process.env.AUTH0_SCOPE, paymentScopes + (controlledConfirmationEnabled() ? " confirm:economic" : "")),
      ...(reauthentication ? {max_age:0,prompt:"login"} : {}),
    },
    appBaseUrl: process.env.APP_BASE_URL,
    signInReturnToPath: "/personal",
    enableAccessTokenEndpoint: false,
    enableConnectAccountEndpoint: false,
    routes: AUTH0_SDK_ROUTES,
    onCallback,
    beforeSessionSaved: async session => removeRefreshCapability(controlledConfirmationEnabled() ? withWebSessionReference(session) : session),
    tokenRefreshBuffer: 60,
    session: {
      rolling: false,
      absoluteDuration: AUTH_SESSION_ABSOLUTE_DURATION_SECONDS,
      cookie: { name: AUTH_SESSION_COOKIE_NAME, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" },
    },
  });
}
