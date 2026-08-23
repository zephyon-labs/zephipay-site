import { NextRequest, NextResponse } from "next/server";

import { sdkLogoutUrl } from "@/lib/auth/navigation";
import { applyExplicitLogoutCookies } from "@/lib/auth/sessionCookies";

export function logoutPostResponse(request: NextRequest, authenticationConfigured: boolean): NextResponse {
  const expected = process.env.APP_BASE_URL?.trim();
  const target = expected ? sdkLogoutUrl(expected, request.headers.get("origin")) : undefined;
  if (!target) {
    return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  if (!authenticationConfigured) {
    return NextResponse.json({ ok: false, error: "Authentication is not configured." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  const response = NextResponse.redirect(target, 303);
  applyExplicitLogoutCookies(response, request.cookies);
  return response;
}
