import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { AccessTokenError, AccessTokenErrorCode } from "@auth0/nextjs-auth0/errors";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";
import type { SessionData } from "@auth0/nextjs-auth0/types";
import { NextRequest, NextResponse } from "next/server";
import {
  RequestCookies,
  ResponseCookies,
  getChunkedCookie,
  setChunkedCookie,
} from "../node_modules/@auth0/nextjs-auth0/dist/server/cookies.js";

import { AUTH_STATE_HEADER, authenticatedResponseHeaders, browserAuthenticationFailure, reauthenticationRequiredFailure } from "../src/lib/auth/authFailure";
import { isReauthenticationRequiredError } from "../src/lib/auth/auth0Errors";
import {
  MAX_SESSION_COOKIE_CHUNKS,
  hasCompleteSessionCookieFamily,
} from "../src/lib/auth/sessionCookieFamily";
import {
  applyCallbackCompletionCookies,
  applyExplicitLogoutCookies,
  applyLoginGestureCookies,
  callbackMayComplete,
  expireLegacySessionCookies,
} from "../src/lib/auth/sessionCookies";
import {
  AUTH_GESTURE_GENERATION_COOKIE,
  AUTH_LOGOUT_BARRIER_COOKIE,
  AUTH_POST_LOGOUT_GESTURE_COOKIE,
  AUTH_SESSION_BINDING_COOKIE,
  applicationSessionOrdering,
} from "../src/lib/auth/sessionOrdering";
import { AUTH_SESSION_COOKIE_NAME } from "../src/lib/auth/sessionSafety";

const oldState = "old-authentication-state-000001";
const newState = "new-authentication-state-000002";

describe("logout and callback transaction ordering", () => {
  it("keeps a pre-logout callback unusable when its session response arrives after logout", () => {
    const browser = new CookieJar();
    const loginRequest = browser.request("http://zephipay.test/auth/login");
    const loginResponse = redirectToAuthorize(oldState);
    assert.equal(applyLoginGestureCookies(loginRequest, loginResponse), oldState);
    browser.apply(loginResponse);

    const callbackDispatchedBeforeLogout = browser.request(`http://zephipay.test/auth/callback?state=${oldState}&code=old`);
    assert.equal(callbackMayComplete(callbackDispatchedBeforeLogout), true);

    const logout = NextResponse.redirect("http://zephipay.test/auth/logout", 303);
    applyExplicitLogoutCookies(logout, browser.request("http://zephipay.test/api/auth/logout").cookies);
    browser.apply(logout);
    assert.equal(applicationSessionOrdering(browser), "logout-barrier");

    const delayedCallback = successfulCallback(callbackDispatchedBeforeLogout, "old-session");
    browser.apply(delayedCallback);
    assert.equal(browser.value(AUTH_SESSION_COOKIE_NAME), "old-session");
    assert.equal(applicationSessionOrdering(browser), "logout-barrier");

    browser.delete(AUTH_LOGOUT_BARRIER_COOKIE);
    assert.equal(applicationSessionOrdering(browser), "missing-generation");
  });

  it("clears the barrier only for a new deliberate gesture and rejects an older callback arriving last", () => {
    const browser = new CookieJar({ [AUTH_LOGOUT_BARRIER_COOKIE]: "logout" });
    const login = redirectToAuthorize(newState);
    applyLoginGestureCookies(browser.request("http://zephipay.test/auth/login"), login);
    browser.apply(login);
    assert.equal(browser.value(AUTH_GESTURE_GENERATION_COOKIE), newState);
    assert.equal(browser.value(AUTH_POST_LOGOUT_GESTURE_COOKIE), newState);

    const callbackRequest = browser.request(`http://zephipay.test/auth/callback?state=${newState}&code=new`);
    assert.equal(callbackMayComplete(callbackRequest), true);
    const callback = successfulCallback(callbackRequest, "new-session");
    browser.apply(callback);
    assert.equal(browser.value(AUTH_LOGOUT_BARRIER_COOKIE), undefined);
    assert.equal(browser.value(AUTH_SESSION_BINDING_COOKIE), newState);
    assert.equal(applicationSessionOrdering(browser), "usable");

    const oldRequest = new CookieJar({ [AUTH_GESTURE_GENERATION_COOKIE]: oldState }).request(`http://zephipay.test/auth/callback?state=${oldState}&code=old`);
    const oldResponseArrivingLast = successfulCallback(oldRequest, "old-session");
    browser.apply(oldResponseArrivingLast);
    assert.equal(browser.value(AUTH_GESTURE_GENERATION_COOKIE), newState);
    assert.equal(browser.value(AUTH_SESSION_BINDING_COOKIE), oldState);
    assert.equal(applicationSessionOrdering(browser), "generation-mismatch");
  });

  it("will not dispatch a callback without the current deliberate generation", () => {
    const browser = new CookieJar({
      [AUTH_LOGOUT_BARRIER_COOKIE]: "logout",
      [AUTH_GESTURE_GENERATION_COOKIE]: newState,
      [AUTH_POST_LOGOUT_GESTURE_COOKIE]: newState,
    });
    assert.equal(callbackMayComplete(browser.request(`http://zephipay.test/auth/callback?state=${oldState}`)), false);
    assert.equal(callbackMayComplete(browser.request(`http://zephipay.test/auth/callback?state=${newState}`)), true);
  });
});

describe("legacy session migration", () => {
  it("expires only the evidenced legacy base and SDK numeric chunks", () => {
    const browser = new CookieJar({
      __session: "legacy-base",
      "__session__0": "legacy-current-zero",
      "__session__1": "legacy-current-one",
      "__session.0": "unsupported-dot-zero",
      "__session.1": "unsupported-dot-one",
      [AUTH_SESSION_COOKIE_NAME]: "v2-session",
      unrelated: "keep",
    });
    const response = NextResponse.next();
    expireLegacySessionCookies(response, browser);
    const expired = new Set(response.cookies.getAll().filter(({ value }) => value === "").map(({ name }) => name));
    assert.deepEqual(expired, new Set(["__session", "__session__0", "__session__1"]));
    assert.equal(expired.has("__session.0"), false);
    assert.equal(expired.has("__session.1"), false);
    assert.equal(expired.has(AUTH_SESSION_COOKIE_NAME), false);
    assert.equal(expired.has("unrelated"), false);
  });

  it("never treats old or unbound v2 cookies as current authority", () => {
    assert.notEqual(applicationSessionOrdering(new CookieJar({ __session: "legacy" })), "usable");
    assert.notEqual(applicationSessionOrdering(new CookieJar({ __session: "legacy", [AUTH_SESSION_COOKIE_NAME]: "v2" })), "usable");
    assert.equal(applicationSessionOrdering(new CookieJar({
      [AUTH_SESSION_COOKIE_NAME]: "v2",
      [AUTH_GESTURE_GENERATION_COOKIE]: newState,
      [AUTH_SESSION_BINDING_COOKIE]: newState,
    })), "usable");
  });

  it("enforces the exact closed current-family grammar", () => {
    const complete = (values: Readonly<Record<string, string>>) =>
      hasCompleteSessionCookieFamily(new CookieJar(values), AUTH_SESSION_COOKIE_NAME);
    assert.equal(complete({ [AUTH_SESSION_COOKIE_NAME]: "v2" }), true, "base-only family");
    assert.equal(complete({ [`${AUTH_SESSION_COOKIE_NAME}__0`]: "first" }), true, "canonical __0 start");
    assert.equal(complete({
      [`${AUTH_SESSION_COOKIE_NAME}__0`]: "first",
      [`${AUTH_SESSION_COOKIE_NAME}__1`]: "second",
    }), true, "canonical contiguous family");
    assert.equal(complete({
      [`${AUTH_SESSION_COOKIE_NAME}__0`]: "first",
      [`${AUTH_SESSION_COOKIE_NAME}__00`]: "ambiguous-zero",
    }), false, "canonical plus duplicate semantic zero");
    assert.equal(complete({ [`${AUTH_SESSION_COOKIE_NAME}__00`]: "ambiguous-zero" }), false, "noncanonical zero alone");
    assert.equal(complete({
      [`${AUTH_SESSION_COOKIE_NAME}__0`]: "first",
      [`${AUTH_SESSION_COOKIE_NAME}__01`]: "ambiguous-one",
    }), false, "noncanonical one");
    assert.equal(complete({
      [`${AUTH_SESSION_COOKIE_NAME}__0`]: "first",
      [`${AUTH_SESSION_COOKIE_NAME}__2`]: "third",
    }), false, "gap");
    assert.equal(complete({
      [`${AUTH_SESSION_COOKIE_NAME}__0`]: "first",
      [`${AUTH_SESSION_COOKIE_NAME}__${MAX_SESSION_COOKIE_CHUNKS}`]: "outside-bound",
    }), false, "out-of-bound index");
    assert.equal(complete({
      [`${AUTH_SESSION_COOKIE_NAME}__0`]: "first",
      [`${AUTH_SESSION_COOKIE_NAME}.0`]: "unrelated-dot-name",
      [`${AUTH_SESSION_COOKIE_NAME}__backup`]: "unrelated-suffix",
    }), true, "unrelated similarly named cookies are ignored");
  });

  it("fails the application authority gate closed on SDK-recognized noncanonical chunks", () => {
    const ordering = (extra: Readonly<Record<string, string>>) => applicationSessionOrdering(new CookieJar({
      [AUTH_GESTURE_GENERATION_COOKIE]: newState,
      [AUTH_SESSION_BINDING_COOKIE]: newState,
      ...extra,
    }));
    assert.equal(ordering({
      [`${AUTH_SESSION_COOKIE_NAME}__0`]: "first",
      [`${AUTH_SESSION_COOKIE_NAME}__00`]: "ambiguous-zero",
    }), "invalid-session-family");
    assert.equal(ordering({ [`${AUTH_SESSION_COOKIE_NAME}__00`]: "ambiguous-zero" }), "invalid-session-family");
    assert.equal(ordering({
      [`${AUTH_SESSION_COOKIE_NAME}__0`]: "first",
      [`${AUTH_SESSION_COOKIE_NAME}.0`]: "unsupported-dot-name",
    }), "usable");
  });

  it("uses an actual Auth0 v4.26 session and runtime probe for __0 chunk creation, reading, callback binding, and logout cleanup", async () => {
    const requestCookies = new RequestCookies(new Headers());
    const responseCookies = new ResponseCookies(new Headers());
    const sessionValue = await generateSessionCookie({
      user: { sub: "auth0|chunked-user", largeTestClaim: "s".repeat(8_000) },
      tokenSet: { accessToken: "opaque-access-token", expiresAt: Math.floor(Date.now() / 1000) + 3600 },
      internal: { sid: "auth0-session-chunked", createdAt: Math.floor(Date.now() / 1000) },
    } satisfies SessionData, { secret: "0123456789abcdef".repeat(4) });
    assert.ok(sessionValue.length > 7_000);
    setChunkedCookie(AUTH_SESSION_COOKIE_NAME, sessionValue, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
    }, requestCookies, responseCookies);

    const chunkNames = requestCookies.getAll().map(({ name }) => name);
    assert.ok(chunkNames.length >= 3 && chunkNames.length <= MAX_SESSION_COOKIE_CHUNKS);
    assert.deepEqual(chunkNames, chunkNames.map((_, index) => `${AUTH_SESSION_COOKIE_NAME}__${index}`));
    assert.equal(getChunkedCookie(AUTH_SESSION_COOKIE_NAME, requestCookies), sessionValue);
    assert.equal(hasCompleteSessionCookieFamily(requestCookies, AUTH_SESSION_COOKIE_NAME), true);

    const browser = new CookieJar({
      [AUTH_GESTURE_GENERATION_COOKIE]: newState,
      ...Object.fromEntries(requestCookies.getAll().map(({ name, value }) => [name, value])),
    });
    const callbackRequest = browser.request(`http://zephipay.test/auth/callback?state=${newState}&code=current`);
    const callbackResponse = NextResponse.redirect("http://zephipay.test/personal", 307);
    for (const cookie of responseCookies.getAll()) callbackResponse.cookies.set(cookie);
    assert.equal(applyCallbackCompletionCookies(callbackRequest, callbackResponse), true);
    browser.apply(callbackResponse);
    assert.equal(applicationSessionOrdering(browser), "usable");

    const logout = NextResponse.next();
    applyExplicitLogoutCookies(logout, browser);
    const deleted = new Set(logout.cookies.getAll().filter(({ value }) => value === "").map(({ name }) => name));
    for (const name of [AUTH_SESSION_COOKIE_NAME, ...chunkNames]) {
      assert.equal(deleted.has(name), true);
    }
  });

  it("logout removes the exact protected numeric families and preserves unrelated and unsupported dot names", () => {
    const browser = new CookieJar({
      __session: "legacy",
      "__session__0": "legacy-current-chunk",
      "__session.0": "legacy-dot-chunk",
      [AUTH_SESSION_COOKIE_NAME]: "v2",
      [`${AUTH_SESSION_COOKIE_NAME}__0`]: "v2-chunk",
      [`${AUTH_SESSION_COOKIE_NAME}.0`]: "not-a-current-v2-chunk",
      [`${AUTH_SESSION_COOKIE_NAME}__00`]: "malformed-leading-zero",
      [`${AUTH_SESSION_COOKIE_NAME}__${MAX_SESSION_COOKIE_CHUNKS}`]: "outside-bound",
      __session_backup: "keep-similar",
      __session__x: "keep-malformed",
      unrelated: "keep",
    });
    const response = NextResponse.next();
    applyExplicitLogoutCookies(response, browser);
    const changed = new Map(response.cookies.getAll().map(({ name, value }) => [name, value]));
    for (const name of [
      "__session",
      "__session__0",
      AUTH_SESSION_COOKIE_NAME,
      `${AUTH_SESSION_COOKIE_NAME}__0`,
      `${AUTH_SESSION_COOKIE_NAME}__00`,
      `${AUTH_SESSION_COOKIE_NAME}__${MAX_SESSION_COOKIE_CHUNKS}`,
    ]) assert.equal(changed.get(name), "");
    for (const name of ["__session.0", `${AUTH_SESSION_COOKIE_NAME}.0`, "__session_backup", "__session__x", "unrelated"]) assert.equal(changed.has(name), false);
    assert.equal(changed.get(AUTH_LOGOUT_BARRIER_COOKIE), "logout");
  });
});

describe("bounded reauthentication classification", () => {
  it("classifies expired or unrefreshable SDK credentials without exposing internal errors", () => {
    const missingRefresh = new AccessTokenError(AccessTokenErrorCode.MISSING_REFRESH_TOKEN, "raw internal refresh detail");
    assert.equal(isReauthenticationRequiredError(missingRefresh), true);
    assert.equal(isReauthenticationRequiredError(new TypeError("network failure")), false);
    const failure = reauthenticationRequiredFailure();
    assert.equal(JSON.stringify(failure.body).includes("raw internal"), false);
    const headers = authenticatedResponseHeaders(failure.body, { "Cache-Control": "private, no-store" });
    const response = new Response(JSON.stringify(failure.body), { status: failure.status, headers });
    assert.equal(response.headers.get(AUTH_STATE_HEADER), "reauthentication-required");
    assert.equal(browserAuthenticationFailure(response), "reauthentication-required");
    assert.equal(browserAuthenticationFailure(new Response(null, { status: 503 })), undefined);
  });
});

function redirectToAuthorize(state: string): NextResponse {
  return NextResponse.redirect(`https://tenant.example/authorize?state=${encodeURIComponent(state)}`, 307);
}

function successfulCallback(request: NextRequest, sessionValue: string): NextResponse {
  const response = NextResponse.redirect("http://zephipay.test/personal", 307);
  response.cookies.set(AUTH_SESSION_COOKIE_NAME, sessionValue);
  assert.equal(applyCallbackCompletionCookies(request, response), true);
  return response;
}

class CookieJar {
  private readonly values = new Map<string, string>();

  constructor(initial: Readonly<Record<string, string>> = {}) {
    for (const [name, value] of Object.entries(initial)) this.values.set(name, value);
  }

  get(name: string) { const value = this.values.get(name); return value === undefined ? undefined : { name, value }; }
  getAll() { return [...this.values].map(([name, value]) => ({ name, value })); }
  value(name: string) { return this.values.get(name); }
  delete(name: string) { this.values.delete(name); }

  request(url: string): NextRequest {
    const cookie = [...this.values].map(([name, value]) => `${name}=${value}`).join("; ");
    return new NextRequest(url, cookie ? { headers: { cookie } } : undefined);
  }

  apply(response: NextResponse): void {
    for (const { name, value } of response.cookies.getAll()) {
      if (value === "") this.values.delete(name);
      else this.values.set(name, value);
    }
  }
}
