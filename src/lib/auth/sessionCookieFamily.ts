export const MAX_SESSION_COOKIE_CHUNKS = 16;

export type CookieCollection = Readonly<{
  get(name: string): Readonly<{ value: string }> | undefined;
  getAll(): readonly Readonly<{ name: string; value: string }>[];
}>;

export function sessionCookieFamilyNames(cookies: CookieCollection, baseName: string): string[] {
  const pattern = numericMemberPattern(baseName);
  return cookies.getAll()
    .filter(({ name }) => name === baseName || pattern.test(name))
    .map(({ name }) => name);
}

export function hasCompleteSessionCookieFamily(
  cookies: CookieCollection,
  baseName: string,
): boolean {
  const members = numericMembers(cookies, baseName);
  if (members.some(({ canonical }) => !canonical)) return false;
  const base = cookies.get(baseName)?.value;
  if (base) return members.length === 0;
  if (members.length === 0 || members.length > MAX_SESSION_COOKIE_CHUNKS) return false;
  members.sort((first, second) => first.index - second.index);
  return members.every(({ index, value }, position) => index === position && value.length > 0);
}

function numericMembers(cookies: CookieCollection, baseName: string) {
  const pattern = numericMemberPattern(baseName);
  return cookies.getAll().flatMap(({ name, value }) => {
    const match = pattern.exec(name);
    if (!match) return [];
    const suffix = match[1];
    const index = Number(suffix);
    const canonical = Number.isSafeInteger(index)
      && index >= 0
      && index < MAX_SESSION_COOKIE_CHUNKS
      && String(index) === suffix;
    return [{ index, value, canonical }];
  });
}

function numericMemberPattern(baseName: string): RegExp {
  return new RegExp(`^${escapeRegularExpression(baseName)}__(\\d+)$`);
}

function escapeRegularExpression(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
