import { NextResponse } from "next/server";

import type { RecipientApiResult } from "./serverClient";
import { recipientFailure } from "./errors";
import { authenticatedResponseHeaders } from "@/lib/auth/authFailure";

const headers = { "Cache-Control": "no-store, private", Pragma: "no-cache" };

export function recipientApiResponse(result: RecipientApiResult): NextResponse {
  return NextResponse.json(result.body, { status: result.status, headers: authenticatedResponseHeaders(result.body, headers) });
}

export function recipientRouteError(status: number, error: string): NextResponse {
  return recipientApiResponse(recipientFailure(status, error));
}
