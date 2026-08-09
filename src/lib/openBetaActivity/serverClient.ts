import "server-only";

import { parseOpenBetaActivityResponse, type OpenBetaActivity } from "./contract";

export async function readOpenBetaActivity(): Promise<OpenBetaActivity | undefined> {
  const backendUrl = process.env.ZEPHIPAY_BACKEND_URL?.trim();
  if (!backendUrl) return undefined;
  try {
    const response = await fetch(new URL("/api/telemetry/open-beta", backendUrl), {
      headers: { Accept: "application/json" },
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(3_000),
    });
    if (!response.ok || !response.headers.get("content-type")?.toLowerCase().includes("application/json")) return undefined;
    return parseOpenBetaActivityResponse(await response.json());
  } catch {
    return undefined;
  }
}
