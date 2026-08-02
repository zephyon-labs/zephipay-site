export function isAccountResponse(value: unknown): value is { ok: true; account: { id: string; actorSubject: string; status: string; createdAt: string; identities: unknown[] } } {
  if (!value || typeof value !== "object") return false;
  const root = value as Record<string, unknown>;
  if (root.ok !== true || !root.account || typeof root.account !== "object") return false;
  const account = root.account as Record<string, unknown>;
  return typeof account.id === "string" && typeof account.actorSubject === "string" &&
    account.actorSubject === `zp:account:${account.id.toLowerCase()}` && typeof account.status === "string" &&
    typeof account.createdAt === "string" && Array.isArray(account.identities);
}
