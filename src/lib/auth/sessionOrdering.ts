import {
  hasCompleteSessionCookieFamily,
  type CookieCollection,
} from "@/lib/auth/sessionCookieFamily";
import { AUTH_SESSION_COOKIE_NAME } from "@/lib/auth/sessionSafety";

export const AUTH_LOGOUT_BARRIER_COOKIE = "__zephipay_logout_barrier_v1";
export const AUTH_GESTURE_GENERATION_COOKIE = "__zephipay_auth_generation_v1";
export const AUTH_SESSION_BINDING_COOKIE = "__zephipay_session_binding_v1";
export const AUTH_POST_LOGOUT_GESTURE_COOKIE = "__zephipay_post_logout_gesture_v1";

export const AUTH_LOGOUT_BARRIER_SECONDS = 30 * 60;
export const AUTH_ORDERING_COOKIE_SECONDS = 7 * 24 * 60 * 60;

export type CookieReader = CookieCollection;

export type ApplicationSessionOrdering =
  | "usable"
  | "logout-barrier"
  | "invalid-session-family"
  | "missing-generation"
  | "generation-mismatch";

export function applicationSessionOrdering(cookies: CookieReader): ApplicationSessionOrdering {
  if (cookies.get(AUTH_LOGOUT_BARRIER_COOKIE)) return "logout-barrier";
  if (!hasCompleteSessionCookieFamily(cookies, AUTH_SESSION_COOKIE_NAME)) return "invalid-session-family";
  const generation = cookies.get(AUTH_GESTURE_GENERATION_COOKIE)?.value;
  const binding = cookies.get(AUTH_SESSION_BINDING_COOKIE)?.value;
  if (!generation || !binding) return "missing-generation";
  return generation === binding ? "usable" : "generation-mismatch";
}

export function validAuthenticationState(value: string | null | undefined): value is string {
  return typeof value === "string" && /^[A-Za-z0-9._~-]{16,512}$/.test(value);
}

export function callbackMatchesCurrentGesture(cookies: CookieReader, state: string | null): boolean {
  if (!validAuthenticationState(state) || cookies.get(AUTH_GESTURE_GENERATION_COOKIE)?.value !== state) return false;
  if (!cookies.get(AUTH_LOGOUT_BARRIER_COOKIE)) return true;
  return cookies.get(AUTH_POST_LOGOUT_GESTURE_COOKIE)?.value === state;
}
