import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { parseDevnetExecutionReadResponse } from "../src/lib/paymentIntents/devnetExecutionContract";
import { isDefinitiveRecoveryFailure, paymentErrorCode } from "../src/lib/paymentIntents/recovery";

test("existing payment with no Devnet execution parses as a normal not-started state", () => {
  assert.deepEqual(parseDevnetExecutionReadResponse({
    ok: false,
    code: "DEVNET_EXECUTION_NOT_FOUND",
    error: "No Devnet execution has started yet.",
  }), { kind: "not_started" });
  assert.equal(parseDevnetExecutionReadResponse({ ok: false, code: "NOT_FOUND", error: "Payment intent was not found." }), undefined);
});

test("Devnet execution absence is non-definitive while genuine payment absence remains definitive", () => {
  assert.equal(paymentErrorCode({ code: "DEVNET_EXECUTION_NOT_FOUND" }), "DEVNET_EXECUTION_NOT_FOUND");
  assert.equal(isDefinitiveRecoveryFailure("DEVNET_EXECUTION_NOT_FOUND"), false);
  assert.equal(isDefinitiveRecoveryFailure("NOT_FOUND"), true);
});

test("BFF distinguishes only the backend's exact no-execution response", async () => {
  const proxy = await source("src/lib/paymentIntents/backendProxy.ts");
  assert.match(proxy, /code\?:unknown}\)\.code==="DEVNET_NOT_FOUND"/);
  assert.match(proxy, /error\?:unknown}\)\.error==="Devnet execution was not found\."/);
  assert.match(proxy, /code:"DEVNET_EXECUTION_NOT_FOUND",error:"No Devnet execution has started yet\."/);
  assert.match(proxy, /normalizePaymentError\(response\.status\)/);
  assert.match(proxy, /input\.method==="GET"/);
});

test("status check and preserved-intent recovery keep no-execution state on review without POST", async () => {
  const workspace = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
  assert.match(workspace, /parsed\?\.kind==="not_started"/);
  assert.match(workspace, /Devnet execution is currently unavailable\. No transaction has been submitted\./);
  assert.match(workspace, /onClick=\{checkDevnetStatus}/);
  assert.match(workspace, /role="status"/);
  assert.match(workspace, /await readDevnetExecution\(recoveryId,c\.signal\);devnetPostAttempted\.current=true;setDevnetAttempted\(true\)/);
  assert.doesNotMatch(workspace, /e\.code!=="NOT_FOUND"/);
  const check = workspace.slice(workspace.indexOf("async function checkDevnetStatus"), workspace.indexOf("function rememberIntent"));
  assert.match(check, /readDevnetExecution\(intent\.id\)/);
  assert.match(check, /catch\(e\)/);
  assert.doesNotMatch(check, /method:"POST"|\/devnet\/execute/);
});

test("existing execution and disabled POST paths remain unchanged", async () => {
  const workspace = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
  assert.match(workspace, /parsed\.kind!=="execution"/);
  assert.match(workspace, /setDevnetExecution\(parsed\.execution\)/);
  assert.match(workspace, /response\.status===503/);
  assert.match(workspace, /not downgraded to another rail/);
  assert.equal((workspace.match(/method:"POST"/g) ?? []).length > 0, true);
  assert.doesNotMatch(workspace, /sendTransaction|signMessage|signTransaction|mainnet-beta/);
});

async function source(file: string) {
  return readFile(new URL(`../${file}`, import.meta.url), "utf8");
}
