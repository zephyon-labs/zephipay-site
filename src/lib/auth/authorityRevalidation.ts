import type { AuthLifecycleStatus } from "@/lib/auth/authLifecycle";

// Five minutes bounds stale mounted UI during the controlled beta without turning
// every tab into high-frequency session traffic. Focus/restore signals may check
// sooner, with the gap below coalescing duplicate browser events.
export const AUTHORITY_REVALIDATION_INTERVAL_MS = 5 * 60 * 1000;
export const AUTHORITY_REVALIDATION_SIGNAL_GAP_MS = 5_000;

export type AuthorityRevalidationTrigger = "focus" | "visible" | "pageshow" | "periodic";

export function authorityRevalidationDelay(
  status: AuthLifecycleStatus,
  now: number,
  lastCheckAt: number,
): number | undefined {
  if (status !== "authenticated" && status !== "authenticated-unavailable") return undefined;
  return Math.max(0, AUTHORITY_REVALIDATION_SIGNAL_GAP_MS - (now - lastCheckAt));
}
