import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

import { validateSendPayment } from "../src/lib/zephipay/validation";

const valid = { recipientType: "person" as const, recipient: "recipient", amount: 2, purpose: "" };

describe("legacy PersonalWorkspace optional purpose validation", () => {
  it("accepts empty, whitespace-only, and valid supplied purpose", () => {
    for (const purpose of ["", "   ", "Dinner"]) {
      assert.deepEqual(validateSendPayment({ ...valid, purpose }), { valid: true, errors: {} });
    }
  });

  it("rejects a supplied purpose over 120 UTF-8 bytes", () => {
    const ascii = validateSendPayment({ ...valid, purpose: "x".repeat(121) });
    const multibyte = validateSendPayment({ ...valid, purpose: "é".repeat(61) });
    assert.equal(ascii.valid, false);
    assert.equal(multibyte.valid, false);
    assert.equal(ascii.errors.purpose, "Purpose must not exceed 120 UTF-8 bytes.");
  });

  it("preserves required recipient and positive finite amount validation", () => {
    assert.equal(validateSendPayment({ ...valid, recipient: "" }).valid, false);
    for (const amount of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
      assert.equal(validateSendPayment({ ...valid, amount }).valid, false);
    }
  });

  it("allows PersonalWorkspace submission without purpose and removes legacy required copy", async () => {
    const workspace = await source("src/components/marketing/personal-workspace/PersonalWorkspace.tsx");
    const validation = await source("src/lib/zephipay/validation.ts");
    assert.match(workspace, /validateSendPayment\(sendInput\)/);
    assert.match(workspace, /if \(!validation\.valid\)/);
    assert.match(workspace, /Purpose \(optional\)/);
    assert.doesNotMatch(`${workspace}\n${validation}`, /Add a payment purpose\./);
  });
});

async function source(path: string) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}
