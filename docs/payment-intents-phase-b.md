# Authenticated payment intents — Phase B

`/personal/send` is the first authenticated website payment-intent workspace. It uses same-origin BFF routes; browser code never receives an Auth0 access token or calls the backend directly.

## Boundary and flow

- The server-only client obtains an access token for `AUTH0_AUDIENCE` with `read:payments write:payments`, calls `ZEPHIPAY_BACKEND_URL`, applies a five-second timeout, requires JSON, validates successful responses, normalizes errors, and disables caching.
- `POST /api/payment-intents` validates the browser body and Origin, forwards `Idempotency-Key` and `X-Request-Id`, and creates or safely replays an intent.
- `GET /api/payment-intents/[id]` validates the UUID and performs the actor-owned authoritative read.
- `POST /api/payment-intents/[id]/confirm` accepts only `requestHash` and `expectedVersion` from the validated backend response and records explicit approval.
- Mutations accept the configured application origin or same request origin. A missing Origin is rejected in production and tolerated only for local development tools.

The compose client creates one `crypto.randomUUID()` idempotency key per submission attempt. Double submission is disabled. Network-ambiguous retries retain the key; editing after a successful creation starts a new attempt.

The only recovery pointer is `/personal/send?intent=<uuid>`. Refresh uses that ID to refetch every authoritative field. No amount, recipient, hash, version, or status is stored locally. “Start another payment” removes only the URL pointer and never deletes the durable record.

Backend statuses are validated exactly as `awaiting_confirmation` and `processing`. They are presented as “Ready for your review” and “Confirmed and ready for execution.” `processing` does not mean sent, paid, settled, completed, or delivered.

## Local prerequisites and deferred work

Existing server configuration must provide Auth0 and backend environment values. The Auth0 tenant must manually grant user-delegated `read:payments` and `write:payments` scopes before end-to-end testing. No tenant settings or environment files are changed here.

This phase records and confirms intents only. Payment execution, Runtime/Solana integration, settlement polling, completed/failed status support, durable receipts, expanded onboarding, and broader application integration remain deferred.
