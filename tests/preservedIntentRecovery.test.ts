import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

import { isDefinitiveRecoveryFailure, paymentErrorCode, recoveryDelay } from "../src/lib/paymentIntents/recovery";

describe("preserved payment intent recovery", () => {
  it("uses a finite retry schedule and distinguishes definitive failures", () => {
    assert.deepEqual([0, 1, 2, 3, 4].map(recoveryDelay), [0, 1_000, 3_000, 7_000, undefined]);
    for (const code of ["AUTHENTICATION_REQUIRED", "AUTHORIZATION_DENIED", "NOT_FOUND"] as const) assert.equal(isDefinitiveRecoveryFailure(code), true);
    for (const code of ["CONFLICT", "RATE_LIMITED", "TEMPORARILY_UNAVAILABLE"] as const) assert.equal(isDefinitiveRecoveryFailure(code), false);
    assert.equal(paymentErrorCode({ code: "RATE_LIMITED" }), "RATE_LIMITED");
    assert.equal(paymentErrorCode({ code: "UNSAFE_UNKNOWN" }), undefined);
  });

  it("keeps compose hidden and exposes only a read-only manual recovery action", async () => {
    const source = await readFile(new URL("../src/components/product/personal/PaymentIntentWorkspace.tsx", import.meta.url), "utf8");
    assert.match(source, /recoveryId&&!intent\?<Shell step="Recovery"/);
    assert.match(source, />Check again<\/Button>/);
    assert.match(source, /No payment action will be repeated/);
    const recoveryEffect = source.slice(source.indexOf("useEffect(()=>{if(!recoveryId)"), source.indexOf("useEffect(()=>{if(!intent||!execution"));
    assert.doesNotMatch(recoveryEffect, /\/confirm|\/execute|method:"POST"/);
  });
});
