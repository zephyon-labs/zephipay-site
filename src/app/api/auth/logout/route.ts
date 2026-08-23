import { NextRequest, NextResponse } from "next/server";

import { authConfigured } from "@/lib/auth0";
import { sdkLogoutUrl } from "@/lib/auth/navigation";
import { applyExplicitLogoutCookies } from "@/lib/auth/sessionCookies";

export async function POST(request: NextRequest) {
  const expected = process.env.APP_BASE_URL?.trim();
  const target = expected ? sdkLogoutUrl(expected, request.headers.get("origin")) : undefined;
  if (!target) {
    return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  if (!authConfigured()) {
    return NextResponse.json({ ok: false, error: "Authentication is not configured." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  const response = NextResponse.redirect(target, 303);
  applyExplicitLogoutCookies(response, request.cookies);
  return response;
}
