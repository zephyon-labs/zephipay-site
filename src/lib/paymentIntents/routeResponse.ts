import { NextResponse } from "next/server";

import type { PaymentIntentApiResult } from "./serverClient";
import { authenticatedResponseHeaders } from "@/lib/auth/authFailure";

export const privateHeaders = { "Cache-Control": "no-store, private", Pragma: "no-cache" };

export function apiResponse(result: PaymentIntentApiResult) {
  return NextResponse.json(result.body, { status: result.status, headers: authenticatedResponseHeaders(result.body, privateHeaders) });
}

export function routeError(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status, headers: privateHeaders });
}
