/** Bounded Backend wire result only. Site does not evaluate policy or derive approval. */
export type ControlledRuntimeAction = "runtime-evaluate" | "runtime-recover";
export type ControlledRuntimeResult = Readonly<{
  paymentId: string;
  mode: "non-value";
  productionReady: false;
  executionAuthorized: false;
  state: "NOT_EVALUATED" | "APPROVED" | "REJECTED" | "EXPIRED" | "NO_LONGER_CURRENT" | "UNAVAILABLE";
  historicalStatus: "NONE" | "APPROVED" | "REJECTED";
  currentApproval: boolean;
  decisionId: string | null;
  expiresAt: string | null;
}>;

export function validateRuntimeResult(value: unknown): ControlledRuntimeResult {
  const fail = () => { throw new Error("Invalid non-value Runtime result."); };
  if (!value || typeof value !== "object" || Array.isArray(value)) return fail();
  const v = value as ControlledRuntimeResult;
  if (Object.keys(v).sort().join() !== "currentApproval,decisionId,executionAuthorized,expiresAt,historicalStatus,mode,paymentId,productionReady,state" ||
    typeof v.paymentId !== "string" || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v.paymentId) ||
    v.mode !== "non-value" || v.productionReady !== false || v.executionAuthorized !== false ||
    !["NOT_EVALUATED", "APPROVED", "REJECTED", "EXPIRED", "NO_LONGER_CURRENT", "UNAVAILABLE"].includes(v.state) ||
    typeof v.currentApproval !== "boolean" || v.currentApproval !== (v.state === "APPROVED")) return fail();
  if (v.state === "NOT_EVALUATED") {
    if (v.historicalStatus !== "NONE" || v.decisionId !== null || v.expiresAt !== null) return fail();
  } else if (typeof v.decisionId !== "string" || !/^[A-Za-z0-9][A-Za-z0-9:._/-]{0,191}$/.test(v.decisionId) ||
    typeof v.expiresAt !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(v.expiresAt) ||
    !Number.isFinite(Date.parse(v.expiresAt)) || v.historicalStatus !== (v.state === "REJECTED" ? "REJECTED" : "APPROVED")) return fail();
  return Object.freeze({ ...v });
}
