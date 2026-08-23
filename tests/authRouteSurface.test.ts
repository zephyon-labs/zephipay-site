import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  AUTH0_ALLOWED_ROUTE_SURFACE,
  AUTH0_DISABLED_ROUTE_SURFACE,
  AUTH0_SDK_ROUTES,
  authRouteBoundary,
  authRouteAllowed,
} from "../src/lib/auth/authRouteSurface";

describe("controlled-beta Auth0 route surface", () => {
  it("allowlists only canonical GET login, callback, and logout", () => {
    assert.deepEqual(AUTH0_ALLOWED_ROUTE_SURFACE, [
      { method: "GET", pathname: "/auth/login" },
      { method: "GET", pathname: "/auth/callback" },
      { method: "GET", pathname: "/auth/logout" },
    ]);
    assert.equal(AUTH0_DISABLED_ROUTE_SURFACE.length, Object.keys(AUTH0_SDK_ROUTES).length - 3);
    for (const route of AUTH0_ALLOWED_ROUTE_SURFACE) {
      assert.equal(authRouteAllowed(route.method, route.pathname), true);
      assert.equal(authRouteAllowed(route.method, `${route.pathname}/`), false);
    }
    assert.equal(authRouteAllowed("POST", "/auth/login"), false);
    assert.equal(authRouteAllowed("POST", "/auth/callback"), false);
    assert.equal(authRouteAllowed("POST", "/auth/logout"), false);
  });

  it("fails every installed auxiliary /auth route closed before it can read or replace a session", async () => {
    for (const pathname of AUTH0_DISABLED_ROUTE_SURFACE) {
      for (const method of ["GET", "POST"]) {
        const response = authRouteBoundary(method, pathname);
        assert.ok(response);
        assert.equal(response.status, 404, `${method} ${pathname}`);
        assert.equal(response.headers.get("Cache-Control"), "private, no-store");
        assert.equal(response.headers.get("Pragma"), "no-cache");
        assert.equal(response.headers.get("Set-Cookie"), null);
      }
    }
  });

  it("fails unknown, malformed, and helper-session replacement paths closed", async () => {
    for (const [method, pathname] of [
      ["GET", "/auth/future-session"],
      ["GET", "/auth"],
      ["POST", "/auth/login"],
      ["GET", "/auth/callback/"],
      ["POST", "/auth/passkey/get-token"],
      ["POST", "/auth/passwordless/verify/extra"],
      ["GET", "/auth/profile/extra"],
    ] as const) {
      const response = authRouteBoundary(method, pathname);
      assert.ok(response);
      assert.equal(response.status, 404, `${method} ${pathname}`);
      assert.equal(response.headers.get("Set-Cookie"), null);
    }
  });
});
