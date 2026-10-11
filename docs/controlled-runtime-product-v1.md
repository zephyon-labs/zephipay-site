# Controlled Runtime product integration V1

This Site-only package consumes the accepted private Backend Runtime contract from
protected PR #14, canonical `a7f7270cc074359cbbdb32a06d665b2933b8a22c` (accepted
candidate `16e551e278add47391eb94319c9a9b11b84290b8`). It starts from Site canonical
`a85d49f9014d3e788d57d228229d2f86f3e12edb`. Protocol remains Git-pinned v0.5.0.
Production readiness and execution authorization remain **false**.

## Product boundary

The existing server-only `ZEPHIPAY_CONTROLLED_CONFIRMATION=non-value-test` gate
and `/personal/send?controlled=1` entry select the controlled flow. No new flag,
environment variable, credential, deployment configuration or dependency is introduced.
Ordinary Send remains unchanged. Only eligible direct-wallet Solana Devnet TEST
preparations enter this flow; username-to-canonical-destination resolution is deferred.

The accepted Auth0 SDK ceremony still leads to a separate **Confirm payment** action.
After confirmation, Site reads Runtime status. **Check payment policy** is a second
explicit user action, offered only after confirmed context and `NOT_EVALUATED` recovery.
Callback success, loading, refresh and navigation never initiate evaluation.

The existing authenticated, trusted-origin POST BFF adds `runtime-evaluate` and
`runtime-recover` to its action allowlist. Its body is still exactly `{action}`; the
route payment ID is the only browser-selected reference. SDK-owned session context
is loaded on the server. The private signed body is exactly `{paymentId, session}`.
Policy, evidence, amount, asset, destination, envelope digest, time and approval cannot
be supplied by the browser. Backend independently requires guarded consent and exact
ownership before either Runtime action, including calls made outside the UI sequence.

The BFF reuses the existing pinned Ed25519 keys, context, private origin, request
expiry, replay protection and no-store transport. Runtime responses have the accepted
distinct signed type, exact request digest/action/payment binding and strict bounded
schema. The browser receives no tokens, policy evidence, envelope or execution capability.
Auth0 state, SDK nonce, PKCE, callback binding and confirmation admission are unchanged.

## Display contract

| Backend state | Product label | Action |
| --- | --- | --- |
| NOT_EVALUATED | Payment confirmed | Explicit policy check when confirmation is current in the UI |
| APPROVED, currentApproval=true | Approved to continue | Recover status only; no execution action |
| REJECTED | Unable to proceed | Recover existing result; no fallback or re-evaluation button |
| EXPIRED | Policy approval expired | Recover status; existing approval cannot continue |
| NO_LONGER_CURRENT | Policy approval no longer current | Recover status; historical approval is not current permission |
| UNAVAILABLE or transport/validation failure | Policy status unavailable | Recover status; no approval inferred |

The signed contract provides `REJECTED`, without finer reason categories. Site uses
only that bounded category and generic policy-rejection wording. It does not invent
reasons or render error bodies. A transport failure is not fabricated as policy rejection.

Current approval means only that Zephyon policy currently permits this confirmed
payment to proceed to a future execution-preparation stage. It never means sent, paid,
settled, completed or transaction-authorized. No transaction or wallet signature exists
in this integration. Historical APPROVED is displayed separately when Backend reports
`currentApproval=false`. Inconsistent signed result fields fail validation.

## Recovery and freshness

Mount, reload, navigation, restored browser pages and focus/visibility restoration use
`runtime-recover`. They cannot create a first Runtime decision. A confirmed payment
without a decision stays ready for an explicit policy check. There is no browser storage
or BFF in-memory authority ledger; Backend retains the one immutable decision.

The UI suppresses double clicks. Every private retry signs a fresh request while the
same payment reference identifies the durable result. A lost evaluation response clears
the display; recovery reads the stored result. Reconstructed SDK/BFF and Backend processes
use the same canonical references. The accepted Backend owns duplicate convergence.

Every new observation clears the previous current-approval display. Lifecycle generations
fence delayed responses across unmount, backgrounding, restored pages and authentication
changes. At the returned expiry, a browser timer clears approval and requests Backend
status. The browser clock can only withhold a claim; it cannot establish, extend or
renew approval. Backend/PostgreSQL remains authoritative. This is a point-in-time policy
observation, not an execution credential or a guarantee of later eligibility.

Strict confirmation recovery may refuse a revoked canonical session. Site can still
request Runtime history through the separately accepted authenticated ownership path.
History does not revive consent or grant current approval. Missing/expired Site credentials
still fail closed. There is no new historical-session authentication bypass.

## Validation and review

Site validation runs lint, generated route types plus standalone TypeScript, the full
test suite, production build and diff checks. Focused tests cover explicit consent and
evaluation, NOT_EVALUATED, all decision states, strict signed results, bounded rejection,
expiry, origin/authentication/gate rejection, duplicate clicks, lost response, refresh,
revoked-session history, browser lifecycle and obsolete authenticated responses.
Existing ordinary Send, unsupported-recipient and controlled lifecycle tests remain active.

`tests/helpers/controlledRuntimeProductFixture.tsx` exercises the real candidate UI
with an injected browser transport for a bounded cross-repository run. The run composes
the actual Site BFF and signed transport, accepted Backend private HTTP actions, installed
Auth0 SDK fixture, Protocol v0.5.0 and a fresh disposable PostgreSQL database with actual
restricted LOGINs. Fault injection loses the first committed evaluation response.
Reconstruction and revocation must retain exactly one historical decision and one consent,
with zero legacy Runtime approvals, finalizations or signer contacts. The review handoff
records the runner, exact Backend fixture source, database setup and logs outside both
repositories. No Backend source or semantics change. No giant Backend suite is rerun locally.

RUNTIME-OBS-01 remains a nonblocking fixture/timing observation from Backend review.
Existing PostgreSQL-observed waits may establish valid positive fixture chronology;
production clocks, security guards and approval assertions are not loosened.

## Release boundary

This is a local Site review candidate. No Site push, PR or merge precedes independent
review. Vercel Git stays disconnected; Railway's automatic production trigger stays
removed. No deployment, live provider call, production database/configuration change,
transaction construction, blockhash fetch, wallet invocation, sponsor finalization,
signing, submission, reconciliation, funds movement or ZERA activation is authorized.

No breaking contract, SDK release or migration is needed for this Site change. A future
separately authorized release must make the accepted Backend composition available first;
its existing migration 033 and role-provisioning prerequisites still apply before Runtime
authority processes start. Site release follows Backend validation. Neither deployment
hold is restored as part of this package. ZephiPay remains useful without ZERA.
