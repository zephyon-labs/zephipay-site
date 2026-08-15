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

test("keeps page support copy consistent with the selected mode through review", async () => {
  const experience = await source("src/components/product/personal/PersonalSendExperience.tsx");
  assert.match(experience, /recipientMode === "solana-devnet"/);
  assert.match(experience, /ZephiPay Devnet/);
  assert.match(experience, /Circle USDC · Solana Devnet/);
  assert.match(experience, /secure Devnet payment lifecycle/);
  assert.match(experience, /ZephiPay Beta/);
  assert.match(experience, /Mock Rail · simulated settlement/);
});

test("keeps the embedded wallet surface compact and responsive", async () => {
  const bar = await source("src/components/product/personal/DevnetTestBar.tsx");
  assert.match(bar, /embedded = false/);
  assert.match(bar, /min-w-0 overflow-hidden/);
  assert.match(bar, /sm:flex-row/);
  assert.match(bar, /min-h-11/);
  assert.match(bar, /truncate text-sm font-medium/);
  assert.match(bar, /aria-expanded=\{expanded\}/);
});

test("routes wallet review through the backend-owned Devnet contract", async () => {
  const workspace = await source("src/components/product/personal/PaymentIntentWorkspace.tsx");
  const devnetBoundary = workspace.slice(workspace.indexOf("devnetView="), workspace.indexOf("return <div>", workspace.indexOf("devnetView=")));
  assert.match(devnetBoundary, /Send on Solana Devnet/);
  assert.match(workspace, /requestHash:confirmed\.requestHash,expectedVersion:confirmed\.version,mode:"solana-devnet"/);
  assert.match(workspace, /devnet\/execution/);
  assert.doesNotMatch(workspace, /sendTransaction|signMessage|signTransaction|mainnet-beta/);
  assert.doesNotMatch(workspace, /Advanced Wallet/);
});

async function source(path: string) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}
