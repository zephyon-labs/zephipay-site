import { NextResponse } from "next/server";

import type { PaymentIntentApiResult } from "./serverClient";

export const privateHeaders = { "Cache-Control": "no-store, private", Pragma: "no-cache" };

export function apiResponse(result: PaymentIntentApiResult) {
  return NextResponse.json(result.body, { status: result.status, headers: privateHeaders });
}

export function routeError(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status, headers: privateHeaders });
}
