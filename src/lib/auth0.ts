import "server-only";

import { Auth0Client } from "@auth0/nextjs-auth0/server";

const required = ["AUTH0_DOMAIN", "AUTH0_CLIENT_ID", "AUTH0_CLIENT_SECRET", "AUTH0_SECRET", "APP_BASE_URL", "AUTH0_AUDIENCE"] as const;

export const paymentScopes = "read:payments write:payments";

function authorizationScope(): string {
  return `${process.env.AUTH0_SCOPE?.trim() || "openid profile email read:account"} ${paymentScopes}`;
}

export function authConfigured(): boolean {
  return required.every((name) => Boolean(process.env[name]?.trim()));
}

let client: Auth0Client | undefined;

export function getAuth0(): Auth0Client {
  if (!authConfigured()) throw new Error("Authentication is not configured.");
  client ??= new Auth0Client({
    authorizationParameters: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: authorizationScope(),
    },
    appBaseUrl: process.env.APP_BASE_URL,
    signInReturnToPath: "/personal/identity",
    enableAccessTokenEndpoint: false,
    tokenRefreshBuffer: 60,
    session: {
      rolling: true,
      inactivityDuration: 8 * 60 * 60,
      absoluteDuration: 7 * 24 * 60 * 60,
      cookie: { sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" },
    },
  });
  return client;
}
