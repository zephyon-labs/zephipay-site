import { NextRequest } from "next/server";

import { authConfigured } from "@/lib/auth0";
import { logoutPostResponse } from "@/lib/auth/logoutPost";

export async function POST(request: NextRequest) {
  return logoutPostResponse(request, authConfigured());
}
