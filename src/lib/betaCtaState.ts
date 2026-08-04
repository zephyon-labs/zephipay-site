export type BetaCtaState = "signed-out" | "signed-in";

export function betaCtaState(status: number): BetaCtaState {
  return status === 401 ? "signed-out" : "signed-in";
}
