import "server-only";

import { cookies } from "next/headers";

import { authConfigured, getAuth0 } from "@/lib/auth0";
import { applicationSessionOrdering } from "@/lib/auth/sessionOrdering";

type AccessTokenOptions = Readonly<{ audience?: string; scope?: string }>;

export async function getApplicationSession() {
  if (!authConfigured()) return null;
  const cookieStore = await cookies();
  if (applicationSessionOrdering(cookieStore) !== "usable") return null;
  return getAuth0().getSession();
}

export async function getApplicationAccessToken(options?: AccessTokenOptions) {
  const cookieStore = await cookies();
  if (applicationSessionOrdering(cookieStore) !== "usable") {
    throw new ApplicationSessionUnavailableError();
  }
  return options ? getAuth0().getAccessToken(options) : getAuth0().getAccessToken();
}

export class ApplicationSessionUnavailableError extends Error {
  constructor() {
    super("The application session is not usable.");
    this.name = "ApplicationSessionUnavailableError";
  }
}
