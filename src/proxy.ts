import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { authConfigured, getAuth0 } from "@/lib/auth0";

export async function proxy(request: NextRequest) {
  if (!authConfigured()) {
    if (request.nextUrl.pathname.startsWith("/auth/")) {
      return NextResponse.json({ error: "Authentication is not configured." }, { status: 503 });
    }
    return NextResponse.next();
  }
  return getAuth0().middleware(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
