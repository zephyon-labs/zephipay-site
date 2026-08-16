export type OpenBetaActivity = Readonly<{
  scope: "open_beta";
  rail: "mock";
  settlement: "simulated";
  generatedAt: string;
  betaTesters: number;
  paymentsCompleted: number;
  mockUsdcProcessed: Readonly<{ amountRaw: string; decimals: 6 }>;
  durableReceipts: number;
  paymentCompletionRate: Readonly<{ completed: number; initiated: number; basisPoints: number | null }>;
  devnetQa?: Readonly<{
    totalLiveRuns: number;
    passed: number;
    failed: number;
    latestResult: "RUNNING" | "PASSED" | "FAILED" | null;
    latestActorFlow: "H2H" | null;
    latestCanonicalPaymentFlow: "P2P" | null;
    invariantViolationCount: number;
    latestDurationMs: number | null;
    latestAt: string | null;
  }>;
}>;

export function parseOpenBetaActivityResponse(value: unknown): OpenBetaActivity | undefined {
  if (!record(value) || !exact(value, ["ok", "data"]) || value.ok !== true || !record(value.data)) return undefined;
  const data = value.data;
  const keys = ["scope", "rail", "settlement", "generatedAt", "betaTesters", "paymentsCompleted", "mockUsdcProcessed", "durableReceipts", "paymentCompletionRate", ...(data.devnetQa === undefined ? [] : ["devnetQa"])] as const;
  if (!exact(data, keys) ||
      data.scope !== "open_beta" || data.rail !== "mock" || data.settlement !== "simulated" ||
      typeof data.generatedAt !== "string" || !Number.isFinite(Date.parse(data.generatedAt)) ||
      !count(data.betaTesters) || !count(data.paymentsCompleted) || !count(data.durableReceipts) ||
      !record(data.mockUsdcProcessed) || !exact(data.mockUsdcProcessed, ["amountRaw", "decimals"]) ||
      typeof data.mockUsdcProcessed.amountRaw !== "string" || !/^\d+$/.test(data.mockUsdcProcessed.amountRaw) || data.mockUsdcProcessed.decimals !== 6 ||
      !record(data.paymentCompletionRate) || !exact(data.paymentCompletionRate, ["completed", "initiated", "basisPoints"]) ||
      !count(data.paymentCompletionRate.completed) || !count(data.paymentCompletionRate.initiated) ||
      data.paymentCompletionRate.completed > data.paymentCompletionRate.initiated) return undefined;
  const rate = data.paymentCompletionRate.basisPoints;
  if (data.paymentCompletionRate.initiated === 0 ? rate !== null :
      !count(rate) || rate > 10_000 || rate !== Math.floor((data.paymentCompletionRate.completed * 10_000) / data.paymentCompletionRate.initiated)) return undefined;
  if (data.devnetQa !== undefined && !validDevnetQa(data.devnetQa)) return undefined;
  return data as OpenBetaActivity;
}

function validDevnetQa(value: unknown): boolean {
  if (!record(value) || !exact(value, ["totalLiveRuns", "passed", "failed", "latestResult", "latestActorFlow", "latestCanonicalPaymentFlow", "invariantViolationCount", "latestDurationMs", "latestAt"])) return false;
  if (!count(value.totalLiveRuns) || !count(value.passed) || !count(value.failed) || value.passed + value.failed > value.totalLiveRuns || !count(value.invariantViolationCount)) return false;
  if (![null, "RUNNING", "PASSED", "FAILED"].includes(value.latestResult as never) || ![null, "H2H"].includes(value.latestActorFlow as never) || ![null, "P2P"].includes(value.latestCanonicalPaymentFlow as never)) return false;
  if (value.latestDurationMs !== null && !count(value.latestDurationMs)) return false;
  if (value.latestAt !== null && (typeof value.latestAt !== "string" || !Number.isFinite(Date.parse(value.latestAt)))) return false;
  return value.totalLiveRuns === 0 ? value.latestResult === null && value.latestActorFlow === null && value.latestCanonicalPaymentFlow === null && value.latestDurationMs === null && value.latestAt === null : value.latestResult !== null;
}

export function formatMockUsdc(amountRaw: string): string {
  const padded = amountRaw.padStart(7, "0"), whole = padded.slice(0, -6).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const fraction = padded.slice(-6).replace(/0+$/, "").padEnd(2, "0");
  return `${whole}.${fraction}`;
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function exact(value: Record<string, unknown>, keys: readonly string[]): boolean {
  const actual = Object.keys(value).sort(), expected = [...keys].sort();
  return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}
function count(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}
