# Auth0 campaign runbook

Auth0 proves authentication; ZephiPay owns the canonical account and immutable `actor_subject`. The backend resolves only validated issuer plus subject. Email never links accounts.

Create one Auth0 API with the exact `AUTH0_AUDIENCE`, RS256, and `read:account`. Create one Regular Web Application using Universal Login. Configure:

- callbacks: `http://localhost:3000/auth/callback`, `https://zephipay.com/auth/callback`
- logout URLs: `http://localhost:3000`, `https://zephipay.com`
- web origins: `http://localhost:3000`, `https://zephipay.com`
- tenant connections as desired: Google, Apple, email/passwordless, and passkeys

The site uses the server-only variables in `.env.example`. Its official SDK stores the encrypted session in the versioned `__zephipay_session_v2` HttpOnly, host-only, `SameSite=Lax` cookie (Secure in production). The controlled-beta policy is non-rolling with a seven-day absolute maximum. `offline_access` is not requested, refresh tokens are stripped before persistence, and an expired or otherwise unrefreshable credential requires a new deliberate sign-in. The browser access-token endpoint remains disabled. The same-origin BFF obtains the API token server-side and calls the backend with only Bearer authorization plus a request ID.

Small HttpOnly ordering cookies fence explicit logout against a delayed authentication callback. They contain no identity or account data and cannot grant authentication: the SDK session and canonical backend account are still required. Mounted authenticated UI independently revalidates server authority on focus, visible restoration, `pageshow`, and every five minutes while authenticated. Five minutes is the initial Superteam Controlled Beta balance between bounding stale UI and avoiding high-frequency session traffic. Duplicate browser signals are coalesced for five seconds with a guaranteed trailing check. A restore signal immediately unmounts sensitive mutating UI until the server affirms the current principal; a network or 5xx result enters `authenticated-unavailable` without claiming the user is signed out. Same-principal confirmation restores interactivity, while a different canonical account creates a clean new lifecycle.

Only canonical `GET /auth/login`, `GET /auth/callback`, and `GET /auth/logout` are reachable through the controlled-beta Auth0 proxy. Profile, access-token, back-channel logout, connect-account, MFA helper, passwordless helper, and passkey helper routes are disabled and fail closed with private no-store responses. Universal Login connections still complete through the canonical callback. Unknown `/auth/*` routes and wrong methods are rejected before the SDK runs.

## Session-cookie migration and rollback

Deploy the v2 session transition forward-only and drain the old application version before serving the new version. **NO MIXED OLD/NEW AUTH WRITERS** may serve the same cookie scope. Auth0 v4.26.0 writes current chunked sessions as `__zephipay_session_v2__0`, `__zephipay_session_v2__1`, and so on; ZephiPay accepts only a base cookie or a contiguous, non-empty, bounded current chunk family with canonical decimal suffixes. Any numeric member using a noncanonical suffix such as `__00`, a duplicate semantic index, a gap, or an out-of-bound index makes the protected family unusable. The application rejects and explicitly expires the evidenced legacy `__session` base and `__session__<index>` chunks. Unsupported dot-index names such as `__session.0` are not treated as part of ZephiPay's session-cookie family. Scans are bounded to 16 chunks, malformed families do not establish authority, and unrelated similarly named cookies are not deleted.

**P2A-NEW-001 — low, nonblocking availability/reauthentication compatibility follow-up.** A callback that replaces a larger existing chunked v2 session family with a smaller family can currently fail closed because SDK surplus-chunk deletion tombstones are interpreted as empty family members. Before public beta expansion or Mainnet, callback validation must evaluate the effective final browser family after applying the SDK's set and delete response operations to the incoming family, while preserving the strict canonical grammar for request-side cookies. This is not a controlled-beta authority bypass and is not claimed as handled by the current remediation.

Direct rollback to the pre-remediation rolling-cookie behavior is forbidden. A compatible rollback must either understand and preserve the v2 migration and ordering rules, or deliberately invalidate all site sessions and require reauthentication. Do not restore legacy writers as a rollback mechanism.

The backend requires explicit `AUTH_ENABLED=true`, `POSTGRES_ENABLED=true`, `DATABASE_URL`, exact HTTPS `AUTH0_ISSUER` with trailing slash, `AUTH0_AUDIENCE`, and `AUTH0_REQUIRED_SCOPE`. It verifies RS256 with rotating cached JWKS and exact issuer/audience, then provisions under a transaction-scoped issuer/subject lock. Security events remain append-only and matching email never merges accounts.

The schema lacks authentication-evidence/email snapshot columns, so those values are not persisted or fabricated. `account_sessions` is not populated because a stable UUID session identifier is not guaranteed end to end. Future native clients use Authorization Code with PKCE and do not share site cookies. Future KYC/KYB attaches to the canonical account without changing `actor_subject`.

Payments, allowlist enforcement, KYC/KYB, Plaid/ACH, and native clients remain disconnected. `PAYMENTS_ENABLED=false`; `/api/send` is unchanged.
