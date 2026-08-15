import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { isCanonicalSolanaAddressInput } from "../src/lib/paymentIntents/requests";

const wallet = "DWLaEPUUyLgPqhoJDGni8PRaL58FdfSmXdL6Qtrp1hJ8";

test("accepts only canonical Solana destination syntax", () => {
  assert.equal(isCanonicalSolanaAddressInput(wallet), true);
  assert.equal(isCanonicalSolanaAddressInput(` ${wallet}`), false);
  assert.equal(isCanonicalSolanaAddressInput("11111111111111111111111111111111"), true);
  assert.equal(isCanonicalSolanaAddressInput("not-a-solana-address"), false);
});

test("makes Devnet wallet a primary Send mode while preserving Request", async () => {
  const compose = await source("src/components/product/personal/PaymentComposeForm.tsx");
  const request = await source("src/components/product/personal/PaymentRequestWorkspace.tsx");
  assert.match(compose, /ZephiPay username/);
  assert.match(compose, /Solana Devnet wallet/);
  assert.match(compose, /aria-pressed/);
  assert.match(compose, /Mainnet is not supported/);
  assert.match(request, /flow="request"/);
});

test("stops wallet review before any browser payment mutation", async () => {
  const workspace = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
  const devnetBoundary = workspace.slice(workspace.indexOf("const devnetView="), workspace.indexOf("return <div>", workspace.indexOf("const devnetView=")));
  assert.match(devnetBoundary, /Backend connection required/);
  assert.match(devnetBoundary, /No payment intent was created/);
  assert.doesNotMatch(devnetBoundary, /fetch\(|confirmAndExecute|sendTransaction|signMessage|signTransaction/);
  assert.doesNotMatch(workspace, /Advanced Wallet/);
});

async function source(path: string) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}
