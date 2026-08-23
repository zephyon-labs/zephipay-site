import { NextRequest, NextResponse } from "next/server";

import { AUTH_SESSION_COOKIE_NAME } from "@/lib/auth/sessionSafety";
import { hasCompleteSessionCookieFamily, sessionCookieFamilyNames } from "@/lib/auth/sessionCookieFamily";
import {
  AUTH_GESTURE_GENERATION_COOKIE,
  AUTH_LOGOUT_BARRIER_COOKIE,
  AUTH_LOGOUT_BARRIER_SECONDS,
  AUTH_ORDERING_COOKIE_SECONDS,
  AUTH_POST_LOGOUT_GESTURE_COOKIE,
  AUTH_SESSION_BINDING_COOKIE,
  callbackMatchesCurrentGesture,
  type CookieReader,
  validAuthenticationState,
} from "@/lib/auth/sessionOrdering";

const LEGACY_SESSION_COOKIE_NAME = "__session";
const sessionCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
});

export function applyExplicitLogoutCookies(response: NextResponse, requestCookies: CookieReader): void {
  response.cookies.set({ name: AUTH_LOGOUT_BARRIER_COOKIE, value: "logout", maxAge: AUTH_LOGOUT_BARRIER_SECONDS, ...sessionCookieOptions() });
  expireCookie(response, AUTH_GESTURE_GENERATION_COOKIE);
  expireCookie(response, AUTH_SESSION_BINDING_COOKIE);
  expireCookie(response, AUTH_POST_LOGOUT_GESTURE_COOKIE);
  expireCurrentSessionCookies(response, requestCookies);
  expireLegacySessionCookies(response, requestCookies);
}

export function applyLoginGestureCookies(request: NextRequest, response: NextResponse): string | undefined {
  const location = response.headers.get("location");
  if (!location) return undefined;
  const state = new URL(location, request.url).searchParams.get("state");
  if (!validAuthenticationState(state)) return undefined;
  response.cookies.set({ name: AUTH_GESTURE_GENERATION_COOKIE, value: state, maxAge: AUTH_ORDERING_COOKIE_SECONDS, ...sessionCookieOptions() });
  expireCookie(response, AUTH_SESSION_BINDING_COOKIE);
  if (request.cookies.get(AUTH_LOGOUT_BARRIER_COOKIE)) {
    response.cookies.set({ name: AUTH_POST_LOGOUT_GESTURE_COOKIE, value: state, maxAge: AUTH_LOGOUT_BARRIER_SECONDS, ...sessionCookieOptions() });
  } else {
    expireCookie(response, AUTH_POST_LOGOUT_GESTURE_COOKIE);
  }
  return state;
}

export function callbackMayComplete(request: NextRequest): boolean {
  return callbackMatchesCurrentGesture(request.cookies, request.nextUrl.searchParams.get("state"));
}

export function applyCallbackCompletionCookies(request: NextRequest, response: NextResponse): boolean {
  const state = request.nextUrl.searchParams.get("state");
  const completed = callbackMatchesCurrentGesture(request.cookies, state) && responseSetsCurrentSession(response);
  if (completed && state) {
    response.cookies.set({ name: AUTH_SESSION_BINDING_COOKIE, value: state, maxAge: AUTH_ORDERING_COOKIE_SECONDS, ...sessionCookieOptions() });
    if (request.cookies.get(AUTH_LOGOUT_BARRIER_COOKIE) && request.cookies.get(AUTH_POST_LOGOUT_GESTURE_COOKIE)?.value === state) {
      expireCookie(response, AUTH_LOGOUT_BARRIER_COOKIE);
    }
  }
  expireCookie(response, AUTH_POST_LOGOUT_GESTURE_COOKIE);
  return completed;
}

export function expireLegacySessionCookies(response: NextResponse, requestCookies: CookieReader): void {
  for (const name of sessionCookieFamilyNames(requestCookies, LEGACY_SESSION_COOKIE_NAME)) expireCookieWithConfiguredDomain(response, name);
}

export function expireCurrentSessionCookies(response: NextResponse, requestCookies: CookieReader): void {
  const names = new Set([AUTH_SESSION_COOKIE_NAME, ...sessionCookieFamilyNames(requestCookies, AUTH_SESSION_COOKIE_NAME)]);
  for (const name of names) expireCookieWithConfiguredDomain(response, name);
}

export function expireRejectedSessionCookies(response: NextResponse, requestCookies: CookieReader): void {
  expireCurrentSessionCookies(response, requestCookies);
  expireLegacySessionCookies(response, requestCookies);
  expireCookie(response, AUTH_SESSION_BINDING_COOKIE);
}

function responseSetsCurrentSession(response: NextResponse): boolean {
  return hasCompleteSessionCookieFamily(response.cookies, AUTH_SESSION_COOKIE_NAME);
}

function expireCookie(response: NextResponse, name: string): void {
  response.cookies.set({ name, value: "", expires: new Date(0), maxAge: 0, ...sessionCookieOptions() });
}

function expireCookieWithConfiguredDomain(response: NextResponse, name: string): void {
  expireCookie(response, name);
  const domain = process.env.AUTH0_COOKIE_DOMAIN?.trim();
  if (domain && /^\.?[A-Za-z0-9.-]+$/.test(domain)) {
    response.headers.append("Set-Cookie", `${name}=; Path=/; Domain=${domain}; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; HttpOnly; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);
  }
}
