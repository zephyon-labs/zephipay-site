import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { afterEach, describe, it } from "node:test";
import { NextRequest } from "next/server";

import { logoutPostResponse } from "../src/lib/auth/logoutPost";
import { AUTH_LOGOUT_BARRIER_COOKIE } from "../src/lib/auth/sessionOrdering";
import { AUTH_SESSION_COOKIE_NAME } from "../src/lib/auth/sessionSafety";

const originalAppBaseUrl = process.env.APP_BASE_URL;

afterEach(() => {
  if (originalAppBaseUrl === undefined) delete process.env.APP_BASE_URL;
  else process.env.APP_BASE_URL = originalAppBaseUrl;
});

describe("logout POST application boundary", () => {
  it("keeps the route wired directly to configured authority and exposes no GET shortcut", async () => {
    const source = await readFile(new URL("../src/app/api/auth/logout/route.ts", import.meta.url), "utf8");
    assert.match(source, /logoutPostResponse\(request, authConfigured\(\)\)/);
    assert.doesNotMatch(source, /export (?:async )?function GET/);
  });

  it("rejects a cross-origin request without applying logout cookies", async () => {
    process.env.APP_BASE_URL = "https://pay.example";
    const response = logoutPostResponse(request("https://evil.example"), true);
    assert.equal(response.status, 403);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(response.headers.get("set-cookie"), null);
    assert.deepEqual(await response.json(), { ok: false, error: "Invalid request origin." });
  });

  it("returns 303 to the mandatory SDK logout route and applies explicit logout cookies", () => {
    process.env.APP_BASE_URL = "https://pay.example";
    const response = logoutPostResponse(request("https://pay.example", `${AUTH_SESSION_COOKIE_NAME}=session-value`), true);
    assert.equal(response.status, 303);
    assert.equal(response.headers.get("location"), "https://pay.example/auth/logout");
    const cookies = response.headers.getSetCookie();
    assert.ok(cookies.some((cookie) => cookie.startsWith(`${AUTH_LOGOUT_BARRIER_COOKIE}=logout;`)));
    assert.ok(cookies.some((cookie) => cookie.startsWith(`${AUTH_SESSION_COOKIE_NAME}=;`)));
  });

  it("fails closed when authentication is not configured", async () => {
    process.env.APP_BASE_URL = "https://pay.example";
    const response = logoutPostResponse(request("https://pay.example"), false);
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("set-cookie"), null);
    assert.deepEqual(await response.json(), { ok: false, error: "Authentication is not configured." });
  });
});

function request(origin: string, cookie?: string): NextRequest {
  return new NextRequest("https://pay.example/api/auth/logout", {
    method: "POST",
    headers: { origin, ...(cookie ? { cookie } : {}) },
  });
}
