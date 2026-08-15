export type AccountResponse = Readonly<{
  ok: true;
  account: Readonly<{
    id: string;
    actorSubject: string;
    status: string;
    createdAt: string;
    identities: unknown[];
    paymentAccess: Readonly<{ enabled: boolean }>;
  }>;
}>;

export function isAuthenticatedAccountFailure(value: unknown): boolean {
  return Boolean(value && typeof value === "object" && (value as Record<string, unknown>).ok === false && (value as Record<string, unknown>).authenticated === true);
}

export function isAccountResponse(value: unknown): value is AccountResponse {
  if (!value || typeof value !== "object") return false;
  const root = value as Record<string, unknown>;
  if (root.ok !== true || !root.account || typeof root.account !== "object") return false;
  const account = root.account as Record<string, unknown>;
  const paymentAccess = account.paymentAccess;
  return typeof account.id === "string" && typeof account.actorSubject === "string" &&
    account.actorSubject === `zp:account:${account.id.toLowerCase()}` && typeof account.status === "string" &&
    typeof account.createdAt === "string" && Array.isArray(account.identities) &&
    Boolean(paymentAccess) && typeof paymentAccess === "object" && !Array.isArray(paymentAccess) &&
    Object.keys(paymentAccess as Record<string, unknown>).length === 1 &&
    typeof (paymentAccess as Record<string, unknown>).enabled === "boolean";
}
