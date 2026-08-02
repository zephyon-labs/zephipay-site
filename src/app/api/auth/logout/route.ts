import { NextRequest, NextResponse } from "next/server";

import { authConfigured } from "@/lib/auth0";

export async function POST(request: NextRequest) {
  const expected = process.env.APP_BASE_URL?.trim();
  const origin = request.headers.get("origin");
  if (!expected || origin !== new URL(expected).origin) {
    return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  if (!authConfigured()) {
    return NextResponse.json({ ok: false, error: "Authentication is not configured." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  return NextResponse.redirect(new URL("/auth/logout", expected), 303);
}
