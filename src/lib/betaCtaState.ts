import { isAccountResponse } from "./accountResponse";

export type BetaCtaState = "signed-out" | "request-access" | "enabled";

export function betaCtaState(status: number, body: unknown): BetaCtaState {
  if (status === 401) return "signed-out";
  if (status === 200 && isAccountResponse(body) && body.account.paymentAccess.enabled) {
    return "enabled";
  }
  return "request-access";
}
