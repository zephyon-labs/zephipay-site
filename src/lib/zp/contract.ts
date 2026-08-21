export const ZP_MILESTONES = ["FIRST_PAYMENT_SENT", "FIRST_PAYMENT_RECEIVED", "TEN_PAYMENTS_SENT", "TWENTY_FIVE_PAYMENTS_SENT"] as const;
export type ZpMilestone = (typeof ZP_MILESTONES)[number];
export const ZP_MILESTONE_LABELS: Readonly<Record<ZpMilestone, string>> = {
  FIRST_PAYMENT_SENT: "First payment sent", FIRST_PAYMENT_RECEIVED: "First payment received",
  TEN_PAYMENTS_SENT: "10 payments sent", TWENTY_FIVE_PAYMENTS_SENT: "25 payments sent",
};
export type ZpPendingMilestone = Readonly<{ milestone: ZpMilestone; dimension: "SENT" | "RECEIVED"; current: string; target: string; progressPercent: number }>;
export type ZpSummary = Readonly<{ totalPoints: string; sentCount: string; receivedCount: string; policyVersion: number; unlockedMilestones: readonly ZpMilestone[]; pendingMilestones: readonly ZpPendingMilestone[] }>;
export type ZpSuccess = Readonly<{ ok: true; zp: ZpSummary; requestId: string }>;
export type ZpFailure = Readonly<{ ok: false; code: "AUTHENTICATION_REQUIRED" | "NOT_CONFIGURED" | "TEMPORARILY_UNAVAILABLE"; error: string }>;

const DECIMAL = /^(?:0|[1-9]\d*)$/;
export function parseZpResponse(value: unknown): ZpSuccess | undefined {
  if (!exact(value, ["ok", "zp", "requestId"]) || value.ok !== true || typeof value.requestId !== "string" || value.requestId.length === 0) return undefined;
  if (!exact(value.zp, ["totalPoints", "sentCount", "receivedCount", "policyVersion", "unlockedMilestones", "pendingMilestones"])) return undefined;
  const zp = value.zp;
  if (![zp.totalPoints, zp.sentCount, zp.receivedCount].every(decimal) || !Number.isSafeInteger(zp.policyVersion) || (zp.policyVersion as number) < 0) return undefined;
  if (!Array.isArray(zp.unlockedMilestones) || !zp.unlockedMilestones.every(milestone) || !Array.isArray(zp.pendingMilestones)) return undefined;
  const pending = zp.pendingMilestones.map(parsePendingMilestone);
  if (pending.some((item) => item === undefined)) return undefined;
  return Object.freeze({ ok: true, requestId: value.requestId, zp: Object.freeze({
    totalPoints: zp.totalPoints as string, sentCount: zp.sentCount as string, receivedCount: zp.receivedCount as string,
    policyVersion: zp.policyVersion as number, unlockedMilestones: Object.freeze([...(zp.unlockedMilestones as ZpMilestone[])]),
    pendingMilestones: Object.freeze(pending as ZpPendingMilestone[]),
  }) });
}
function parsePendingMilestone(value: unknown): ZpPendingMilestone | undefined {
  if (!exact(value, ["milestone", "dimension", "current", "target", "progressPercent"]) || !milestone(value.milestone) || !["SENT", "RECEIVED"].includes(String(value.dimension)) || !decimal(value.current) || !decimal(value.target) || !Number.isInteger(value.progressPercent) || (value.progressPercent as number) < 0 || (value.progressPercent as number) > 100) return undefined;
  return Object.freeze({ milestone: value.milestone, dimension: value.dimension as "SENT" | "RECEIVED", current: value.current, target: value.target, progressPercent: value.progressPercent as number });
}
function milestone(value: unknown): value is ZpMilestone { return typeof value === "string" && ZP_MILESTONES.includes(value as ZpMilestone); }
function decimal(value: unknown): value is string { return typeof value === "string" && DECIMAL.test(value); }
function exact(value: unknown, keys: readonly string[]): value is Record<string, unknown> { return record(value) && Object.keys(value).length === keys.length && Object.keys(value).every((key) => keys.includes(key)); }
function record(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
