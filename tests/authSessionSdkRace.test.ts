import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";
import type { SessionData } from "@auth0/nextjs-auth0/types";
import { NextRequest } from "next/server";

import {
  AUTH_SESSION_ABSOLUTE_DURATION_SECONDS,
  AUTH_SESSION_COOKIE_NAME,
  authorizationScope,
  removeRefreshCapability,
} from "../src/lib/auth/sessionSafety";

const secret = "0123456789abcdef".repeat(4);
const session: SessionData = {
  user: { sub: "auth0|user-a", email: "metadata@example.test" },
  tokenSet: {
    accessToken: "opaque-access-token",
    idToken: "opaque-id-token",
    refreshToken: "must-not-persist",
    expiresAt: Math.floor(Date.now() / 1000) + 3600,
    scope: "openid profile email read:account write:account read:payments write:payments",
  },
  internal: { sid: "auth0-session-a", createdAt: Math.floor(Date.now() / 1000) },
};

function client() {
  return new Auth0Client({
    domain: "tenant.example.auth0.com",
    clientId: "client-id",
    clientSecret: "client-secret",
    secret,
    appBaseUrl: "http://zephipay.test",
    authorizationParameters: { audience: "https://api.zephipay.test", scope: authorizationScope(undefined, "read:payments write:payments") },
    beforeSessionSaved: removeRefreshCapability,
    session: {
      rolling: false,
      absoluteDuration: AUTH_SESSION_ABSOLUTE_DURATION_SECONDS,
      cookie: { name: AUTH_SESSION_COOKIE_NAME, sameSite: "lax", secure: false, path: "/" },
    },
  });
}

function request(cookieName?: string, cookieValue?: string) {
  return new NextRequest("http://zephipay.test/api/account", cookieName && cookieValue ? { headers: { cookie: `${cookieName}=${cookieValue}` } } : undefined);
}

describe("Auth0 4.26.0 stateless logout-race boundary", () => {
  it("removes offline_access and defensively strips any issued refresh token", async () => {
    const scope = authorizationScope("openid profile email offline_access read:account", "read:payments write:payments");
    assert.equal(scope.split(" ").includes("offline_access"), false);
    const sparseScope = authorizationScope("offline_access custom:scope", "read:payments write:payments").split(" ");
    assert.deepEqual(["openid", "profile", "email", "read:account", "write:account"].every((required) => sparseScope.includes(required)), true);
    assert.equal(sparseScope.includes("custom:scope"), true);
    assert.equal(sparseScope.includes("offline_access"), false);
    const sanitized = await removeRefreshCapability(session);
    assert.equal(sanitized.tokenSet.refreshToken, undefined);
    assert.equal(sanitized.tokenSet.accessToken, session.tokenSet.accessToken);
    assert.equal(sanitized.user.sub, session.user.sub);
  });

  it("invalidates cookies created by the old rolling configuration", async () => {
    const oldCookie = await generateSessionCookie(session, { secret });
    assert.equal(await client().getSession(request("__session", oldCookie)), null);
  });

  it("accepts the new versioned stateless session but emits no passive Set-Cookie writer", async () => {
    const cookie = await generateSessionCookie(await removeRefreshCapability(session), { secret });
    const auth0 = client();
    assert.equal((await auth0.getSession(request(AUTH_SESSION_COOKIE_NAME, cookie)))?.user.sub, session.user.sub);
    const response = await auth0.middleware(request(AUTH_SESSION_COOKIE_NAME, cookie));
    assert.equal(response.headers.get("set-cookie"), null);
  });

  it("cannot resurrect a deleted session when a pre-logout ordinary response arrives last", async () => {
    const cookie = await generateSessionCookie(await removeRefreshCapability(session), { secret });
    const auth0 = client();
    const delayedAuthenticatedResponse = await auth0.middleware(request(AUTH_SESSION_COOKIE_NAME, cookie));

    // Logout deletes the browser cookie. The already-computed ordinary response then arrives,
    // but rolling=false means it has no Set-Cookie capable of restoring that session.
    assert.equal(delayedAuthenticatedResponse.headers.get("set-cookie"), null);
    assert.equal(await auth0.getSession(request()), null);
  });
});
