# Auth0 campaign runbook

Auth0 proves authentication; ZephiPay owns the canonical account and immutable `actor_subject`. The backend resolves only validated issuer plus subject. Email never links accounts.

Create one Auth0 API with the exact `AUTH0_AUDIENCE`, RS256, and `read:account`. Create one Regular Web Application using Universal Login. Configure:

- callbacks: `http://localhost:3000/auth/callback`, `https://zephipay.com/auth/callback`
- logout URLs: `http://localhost:3000`, `https://zephipay.com`
- web origins: `http://localhost:3000`, `https://zephipay.com`
- tenant connections as desired: Google, Apple, email/passwordless, and passkeys

The site uses the server-only variables in `.env.example`. Its official SDK stores an encrypted HttpOnly, host-only, `SameSite=Lax` cookie (Secure in production), rolls an 8-hour idle session up to a 7-day absolute limit, and disables its browser access-token endpoint. The same-origin BFF obtains the API token server-side and calls the backend with only Bearer authorization plus a request ID.

The backend requires explicit `AUTH_ENABLED=true`, `POSTGRES_ENABLED=true`, `DATABASE_URL`, exact HTTPS `AUTH0_ISSUER` with trailing slash, `AUTH0_AUDIENCE`, and `AUTH0_REQUIRED_SCOPE`. It verifies RS256 with rotating cached JWKS and exact issuer/audience, then provisions under a transaction-scoped issuer/subject lock. Security events remain append-only and matching email never merges accounts.

The schema lacks authentication-evidence/email snapshot columns, so those values are not persisted or fabricated. `account_sessions` is not populated because a stable UUID session identifier is not guaranteed end to end. Future native clients use Authorization Code with PKCE and do not share site cookies. Future KYC/KYB attaches to the canonical account without changing `actor_subject`.

Payments, allowlist enforcement, KYC/KYB, Plaid/ACH, and native clients remain disconnected. `PAYMENTS_ENABLED=false`; `/api/send` is unchanged.
