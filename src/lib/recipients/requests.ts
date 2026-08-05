const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type RecipientSearchInput = Readonly<{ username: string }>;

export function parseRecipientSearchInput(value: unknown): RecipientSearchInput | undefined {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return undefined;
  const record = value as Record<string, unknown>;
  if (Object.keys(record).length !== 1 || typeof record.username !== "string") return undefined;
  const username = record.username.trim();
  if (!username || username.length > 64 || /[\u0000-\u001f\u007f]/.test(username)) return undefined;
  return { username };
}

export function validRecipientAccountId(value: string): boolean { return UUID.test(value); }
