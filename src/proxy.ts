import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { authConfigured, createSiteAuth0, getAuth0 } from "@/lib/auth0";
import { AUTH_STATE_HEADER } from "@/lib/auth/authFailure";
import { authRouteBoundary } from "@/lib/auth/authRouteSurface";
import {
  applyCallbackCompletionCookies,
  applyExplicitLogoutCookies,
  applyLoginGestureCookies,
  callbackMayComplete,
  expireLegacySessionCookies,
  expireRejectedSessionCookies,
} from "@/lib/auth/sessionCookies";
import { applicationSessionOrdering } from "@/lib/auth/sessionOrdering";

import { callControlledBackend, controlledConfirmationEnabled } from "@/lib/controlledConfirmation/client";
import { controlledCallback } from "@/lib/controlledConfirmation/sdkFlow";
import { revokeControlledSession } from "@/lib/controlledConfirmation/revocation";

const authenticatedApiPrefixes = ["/api/account", "/api/activity", "/api/payment-intents", "/api/payment-requests", "/api/recipients"] as const;

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (authenticatedApiPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    if (applicationSessionOrdering(request.cookies) !== "usable") {
      const response = NextResponse.json(
        { ok: false, authenticated: false, code: "AUTHENTICATION_REQUIRED", error: "Sign in is required." },
        { status: 401, headers: { "Cache-Control": "private, no-store", Pragma: "no-cache", [AUTH_STATE_HEADER]: "signed-out" } },
      );
      expireRejectedSessionCookies(response, request.cookies);
      return response;
    }
    const response = NextResponse.next();
    if (pathname === "/api/account") expireLegacySessionCookies(response, request.cookies);
    return response;
  }

  if (pathname !== "/auth" && !pathname.startsWith("/auth/")) return NextResponse.next();

  const routeRejection = authRouteBoundary(request.method, pathname);
  if (routeRejection) return routeRejection;

  if (!authConfigured()) {
    return NextResponse.json({ error: "Authentication is not configured." }, { status: 503 });
  }

  if (pathname === "/auth/callback" && !callbackMayComplete(request)) {
    const response = NextResponse.redirect(new URL("/personal", request.url), 303);
    response.headers.set("Cache-Control", "private, no-store");
    expireRejectedSessionCookies(response, request.cookies);
    return response;
  }

  let sdk=getAuth0();
  if(pathname==="/auth/logout" || (controlledConfirmationEnabled() && pathname==="/auth/callback")) {
    const previous=await sdk.getSession(request);
    if(pathname==="/auth/logout") {
      try { await revokeControlledSession(previous,callControlledBackend); }
      catch { return NextResponse.json({error:"Sign out could not be completed. Retry to revoke the confirmation session."},{status:503,headers:{"Cache-Control":"private, no-store"}}); }
    }
    if(pathname==="/auth/callback")sdk=createSiteAuth0(controlledCallback(request,previous,callControlledBackend));
  }
  let response: NextResponse;
  try { response=await sdk.middleware(request); }
  catch { response=NextResponse.redirect(new URL("/personal/send?controlled=1&confirmation=session-changed",request.url),303); expireRejectedSessionCookies(response,request.cookies); return response; }
  if (pathname === "/auth/login") applyLoginGestureCookies(request, response);
  else if (pathname === "/auth/callback") applyCallbackCompletionCookies(request, response);
  else if (pathname === "/auth/logout") applyExplicitLogoutCookies(response, request.cookies);
  expireLegacySessionCookies(response, request.cookies);
  return response;
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/api/account/:path*",
    "/api/activity/:path*",
    "/api/payment-intents/:path*",
    "/api/payment-requests/:path*",
    "/api/recipients/:path*",
  ],
};
