export function hasTrustedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";
  try {
    const supplied = new URL(origin).origin;
    const allowed = new Set([new URL(request.url).origin]);
    const configured = process.env.APP_BASE_URL?.trim();
    if (configured) allowed.add(new URL(configured).origin);
    return allowed.has(supplied);
  } catch {
    return false;
  }
}
