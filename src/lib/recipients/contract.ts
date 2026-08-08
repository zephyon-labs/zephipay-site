export const RECIPIENT_ACCOUNT_TYPES = ["personal", "creator", "business", "ai_agent"] as const;
export const RECIPIENT_VERIFICATION_STATES = ["unverified", "pending", "verified", "restricted"] as const;
export const RECIPIENT_PAYABILITY_STATES = ["available", "unavailable", "restricted"] as const;
export const RECIPIENT_IDENTITY_SOURCES = ["recipient_directory", "synthetic_beta"] as const;

export type RecipientAccountType = (typeof RECIPIENT_ACCOUNT_TYPES)[number];
export type RecipientVerificationState = (typeof RECIPIENT_VERIFICATION_STATES)[number];
export type RecipientPayabilityState = (typeof RECIPIENT_PAYABILITY_STATES)[number];
export type RecipientIdentitySource = (typeof RECIPIENT_IDENTITY_SOURCES)[number];

export type PublicRecipient = Readonly<{
  accountId: string;
  username: string;
  displayName: string;
  accountType: RecipientAccountType;
  verificationState: RecipientVerificationState;
  payabilityState: RecipientPayabilityState;
  identitySource?: RecipientIdentitySource;
  avatarUrl?: string;
}>;

export type RecipientSearchSuccess = Readonly<{ ok: true; recipients: PublicRecipient[] }>;
export type RecipientResolveSuccess = Readonly<{ ok: true; recipient: PublicRecipient }>;
export type RecentPaymentIdentity = Readonly<Pick<PublicRecipient, "accountId" | "username" | "displayName" | "accountType" | "verificationState">>;
export type RecipientRecentSuccess = Readonly<{ ok: true; recipients: RecentPaymentIdentity[] }>;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const RECIPIENT_KEYS = ["accountId", "username", "displayName", "accountType", "verificationState", "payabilityState", "identitySource", "avatarUrl"];

export function parseRecipientSearchResponse(value: unknown): RecipientSearchSuccess | undefined {
  if (!hasExactKeys(value, ["ok", "recipients"]) || value.ok !== true || !Array.isArray(value.recipients) || value.recipients.length > 1) return undefined;
  const recipients = value.recipients.map(parseRecipient);
  if (recipients.some((recipient) => recipient === undefined)) return undefined;
  return { ok: true, recipients: recipients as PublicRecipient[] };
}

export function parseRecipientResolveResponse(value: unknown): RecipientResolveSuccess | undefined {
  if (!hasExactKeys(value, ["ok", "recipient"]) || value.ok !== true) return undefined;
  const recipient = parseRecipient(value.recipient);
  return recipient ? { ok: true, recipient } : undefined;
}

export function parseRecipientRecentResponse(value: unknown): RecipientRecentSuccess | undefined {
  if (!hasExactKeys(value,["ok","recipients"]) || value.ok !== true || !Array.isArray(value.recipients) || value.recipients.length > 5) return undefined;
  const recipients = value.recipients.map((entry) => {
    if (!hasExactKeys(entry,["accountId","username","displayName","accountType","verificationState"])) return undefined;
    if (typeof entry.accountId !== "string" || !UUID.test(entry.accountId) || typeof entry.username !== "string" ||
        typeof entry.displayName !== "string" || !RECIPIENT_ACCOUNT_TYPES.includes(entry.accountType as RecipientAccountType) ||
        !RECIPIENT_VERIFICATION_STATES.includes(entry.verificationState as RecipientVerificationState)) return undefined;
    return Object.freeze({ accountId: entry.accountId.toLowerCase(), username: entry.username, displayName: entry.displayName,
      accountType: entry.accountType as RecipientAccountType, verificationState: entry.verificationState as RecipientVerificationState });
  });
  return recipients.some((entry) => !entry) ? undefined : { ok: true, recipients: recipients as RecentPaymentIdentity[] };
}

function parseRecipient(value: unknown): PublicRecipient | undefined {
  if (!isRecord(value)) return undefined;
  const keys = Object.keys(value);
  if (keys.some((key) => !RECIPIENT_KEYS.includes(key)) || RECIPIENT_KEYS.slice(0, 6).some((key) => !keys.includes(key))) return undefined;
  if (
    typeof value.accountId !== "string" || !UUID.test(value.accountId) ||
    typeof value.username !== "string" || value.username.length < 1 || value.username.length > 30 ||
    typeof value.displayName !== "string" || value.displayName.length < 1 || Array.from(value.displayName).length > 80 ||
    !RECIPIENT_ACCOUNT_TYPES.includes(value.accountType as RecipientAccountType) ||
    !RECIPIENT_VERIFICATION_STATES.includes(value.verificationState as RecipientVerificationState) ||
    !RECIPIENT_PAYABILITY_STATES.includes(value.payabilityState as RecipientPayabilityState) ||
    (value.identitySource !== undefined &&
      !RECIPIENT_IDENTITY_SOURCES.includes(value.identitySource as RecipientIdentitySource)) ||
    (value.avatarUrl !== undefined && !isSafeAvatar(value.avatarUrl))
  ) return undefined;
  return Object.freeze({
    accountId: value.accountId.toLowerCase(), username: value.username, displayName: value.displayName,
    accountType: value.accountType as RecipientAccountType,
    verificationState: value.verificationState as RecipientVerificationState,
    payabilityState: value.payabilityState as RecipientPayabilityState,
    ...(typeof value.identitySource === "string"
      ? { identitySource: value.identitySource as RecipientIdentitySource }
      : {}),
    ...(typeof value.avatarUrl === "string" ? { avatarUrl: value.avatarUrl } : {}),
  });
}

function isSafeAvatar(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 2048) return false;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}

function hasExactKeys(value: unknown, expected: readonly string[]): value is Record<string, unknown> {
  return isRecord(value) && Object.keys(value).length === expected.length && Object.keys(value).every((key) => expected.includes(key));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
