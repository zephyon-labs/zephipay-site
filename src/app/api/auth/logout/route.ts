import { NextRequest, NextResponse } from "next/server";

import { authConfigured, getAuth0 } from "@/lib/auth0";
import { logoutPostResponse } from "@/lib/auth/logoutPost";

import { callControlledBackend } from "@/lib/controlledConfirmation/client";
import { revokeControlledSession } from "@/lib/controlledConfirmation/revocation";

export async function POST(request: NextRequest) {
  const response=logoutPostResponse(request, authConfigured());
  if(response.status===303) {
    const session=await getAuth0().getSession(request);
    {
      try {await revokeControlledSession(session,callControlledBackend);}
      catch {return NextResponse.json({error:"Sign out could not be completed. Retry to revoke confirmation authority."},{status:503,headers:{"Cache-Control":"private, no-store"}});}
    }
  }
  return response;
}
