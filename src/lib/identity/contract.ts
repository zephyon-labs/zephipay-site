export const ACCOUNT_TYPES = ["personal", "creator", "business", "ai_agent"] as const;
export const DISCOVERABILITY = ["private", "username_only", "public"] as const;
export const VERIFICATION_STATES = ["unverified", "pending", "verified", "restricted"] as const;
export const PAYABILITY_STATES = ["available", "unavailable", "restricted"] as const;

export type AccountType = (typeof ACCOUNT_TYPES)[number];
export type Discoverability = (typeof DISCOVERABILITY)[number];
export type VerificationState = (typeof VERIFICATION_STATES)[number];
export type PayabilityState = (typeof PAYABILITY_STATES)[number];

export type PaymentIdentity = Readonly<{
  accountType: AccountType;
  username: string;
  displayName: string;
  avatarUrl?: string;
  discoverability: Discoverability;
  verificationState: VerificationState;
  payabilityState: PayabilityState;
  version: string;
}>;

export type IdentitySuccess = Readonly<{ ok: true; identity: PaymentIdentity | null }>;
export type IdentityErrorCode = "AUTHENTICATION_REQUIRED" | "AUTHORIZATION_DENIED" | "NOT_FOUND" | "NOT_CONFIGURED" | "RATE_LIMITED" | "TEMPORARILY_UNAVAILABLE" | "VALIDATION_ERROR" | "USERNAME_UNAVAILABLE" | "VERSION_CONFLICT";
export type IdentityFailure = Readonly<{ ok: false; code: IdentityErrorCode; error: string }>;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const VERSION = /^(?:0|[1-9]\d*)$/;
const IDENTITY_KEYS = ["accountId", "accountType", "username", "displayName", "avatarUrl", "publicIdentityStatus", "discoverability", "verificationState", "payabilityState", "version", "createdAt", "updatedAt"];

export function parseIdentityReadResponse(value: unknown): IdentitySuccess | undefined {
  if (!exact(value, ["ok", "identity", "destinations"]) || value.ok !== true || !Array.isArray(value.destinations) || !value.destinations.every(validDestination)) return undefined;
  const identity = value.identity === null ? null : parseIdentity(value.identity);
  return identity === undefined ? undefined : { ok: true, identity };
}

function validDestination(value: unknown): boolean {
  if (!exact(value, ["id", "type", "address", "status", "ownershipState", "primary", "version", "createdAt", "updatedAt"])) return false;
  return typeof value.id === "string" && UUID.test(value.id) && value.type === "solana_wallet" && typeof value.address === "string" && value.address.length >= 32 && value.address.length <= 44 &&
    ["active", "inactive", "restricted"].includes(String(value.status)) && ["unverified", "verified", "rejected"].includes(String(value.ownershipState)) && typeof value.primary === "boolean" &&
    typeof value.version === "string" && VERSION.test(value.version) && typeof value.createdAt === "string" && validDate(value.createdAt) && typeof value.updatedAt === "string" && validDate(value.updatedAt);
}

export function parseIdentityWriteResponse(value: unknown): IdentitySuccess | undefined {
  if (!exact(value, ["ok", "identity"]) || value.ok !== true) return undefined;
  const identity = parseIdentity(value.identity);
  return identity ? { ok: true, identity } : undefined;
}

function parseIdentity(value: unknown): PaymentIdentity | undefined {
  if (!record(value)) return undefined;
  const keys = Object.keys(value);
  if (keys.some((key) => !IDENTITY_KEYS.includes(key)) || IDENTITY_KEYS.filter((key) => key !== "avatarUrl").some((key) => !keys.includes(key))) return undefined;
  if (typeof value.accountId !== "string" || !UUID.test(value.accountId) || !ACCOUNT_TYPES.includes(value.accountType as AccountType) ||
      typeof value.username !== "string" || value.username.length < 3 || value.username.length > 30 ||
      typeof value.displayName !== "string" || Array.from(value.displayName).length < 1 || Array.from(value.displayName).length > 80 ||
      !["active", "hidden"].includes(String(value.publicIdentityStatus)) || !DISCOVERABILITY.includes(value.discoverability as Discoverability) ||
      !VERIFICATION_STATES.includes(value.verificationState as VerificationState) || !PAYABILITY_STATES.includes(value.payabilityState as PayabilityState) ||
      typeof value.version !== "string" || !VERSION.test(value.version) || typeof value.createdAt !== "string" || !validDate(value.createdAt) ||
      typeof value.updatedAt !== "string" || !validDate(value.updatedAt) || (value.avatarUrl !== undefined && !safeAvatar(value.avatarUrl))) return undefined;
  return Object.freeze({ accountType: value.accountType as AccountType, username: value.username, displayName: value.displayName,
    ...(typeof value.avatarUrl === "string" ? { avatarUrl: value.avatarUrl } : {}), discoverability: value.discoverability as Discoverability,
    verificationState: value.verificationState as VerificationState, payabilityState: value.payabilityState as PayabilityState, version: value.version });
}

function safeAvatar(value: unknown): value is string { if (typeof value !== "string" || value.length > 2048) return false; try { return new URL(value).protocol === "https:"; } catch { return false; } }
function validDate(value: string): boolean { return Number.isFinite(Date.parse(value)); }
function exact(value: unknown, keys: readonly string[]): value is Record<string, unknown> { return record(value) && Object.keys(value).length === keys.length && Object.keys(value).every((key) => keys.includes(key)); }
function record(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
