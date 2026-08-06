import type { Discoverability } from "./contract";
import { DISCOVERABILITY } from "./contract";

export type IdentityWriteInput = Readonly<{ username: string; displayName: string; avatarUrl?: string; discoverability: Discoverability; expectedVersion?: string }>;
const USERNAME = /^[a-z][a-z0-9_]{2,29}$/i;
const VERSION = /^(?:0|[1-9]\d*)$/;
const ALLOWED = ["username", "displayName", "avatarUrl", "discoverability", "expectedVersion"];

export function parseIdentityWriteInput(value: unknown): IdentityWriteInput | undefined {
  if (!record(value) || Object.keys(value).some((key) => !ALLOWED.includes(key)) ||
      !["username", "displayName", "discoverability"].every((key) => key in value)) return undefined;
  if (typeof value.username !== "string" || value.username.trim() !== value.username || !USERNAME.test(value.username) ||
      typeof value.displayName !== "string" || value.displayName.trim() !== value.displayName || value.displayName.replace(/\s+/g, " ") !== value.displayName ||
      Array.from(value.displayName).length < 1 || Array.from(value.displayName).length > 80 || /\p{Cc}/u.test(value.displayName) ||
      !DISCOVERABILITY.includes(value.discoverability as Discoverability) ||
      (value.expectedVersion !== undefined && (typeof value.expectedVersion !== "string" || !VERSION.test(value.expectedVersion))) ||
      (value.avatarUrl !== undefined && !safeAvatar(value.avatarUrl))) return undefined;
  return { username: value.username, displayName: value.displayName, ...(typeof value.avatarUrl === "string" ? { avatarUrl: value.avatarUrl } : {}),
    discoverability: value.discoverability as Discoverability, ...(typeof value.expectedVersion === "string" ? { expectedVersion: value.expectedVersion } : {}) };
}

export function toBackendIdentityWrite(input: IdentityWriteInput) { return { ...input, discoverability: input.discoverability.toUpperCase() }; }
function safeAvatar(value: unknown): value is string { if (typeof value !== "string" || value.length > 2048 || value.trim() !== value) return false; try { return new URL(value).protocol === "https:"; } catch { return false; } }
function record(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
