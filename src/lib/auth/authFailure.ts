export const AUTH_STATE_HEADER = "X-ZephiPay-Auth-State";
export const REAUTHENTICATION_REQUIRED = "REAUTHENTICATION_REQUIRED";
export const REAUTHENTICATION_REQUIRED_MESSAGE = "Your session has expired. Sign in again to continue.";

export type BrowserAuthenticationFailure = "signed-out" | "reauthentication-required";

export function browserAuthenticationFailure(response: Response): BrowserAuthenticationFailure | undefined {
  if (response.status !== 401) return undefined;
  return response.headers.get(AUTH_STATE_HEADER) === "reauthentication-required" ? "reauthentication-required" : "signed-out";
}

export function reauthenticationRequiredFailure() {
  return {
    status: 401,
    body: { ok: false as const, code: REAUTHENTICATION_REQUIRED, error: REAUTHENTICATION_REQUIRED_MESSAGE },
  };
}

export function authenticatedResponseHeaders(body: unknown, base: Readonly<Record<string, string>>): Record<string, string> {
  return hasCode(body, REAUTHENTICATION_REQUIRED) ? { ...base, [AUTH_STATE_HEADER]: "reauthentication-required" } : { ...base };
}

function hasCode(value: unknown, code: string): boolean {
  return typeof value === "object" && value !== null && !Array.isArray(value) && (value as Record<string, unknown>).code === code;
}
