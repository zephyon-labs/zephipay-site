import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { CIRCLE_DEVNET_USDC_MINT, deriveCircleDevnetUsdcAta, formatSolBalance, formatUsdcBalance, shortAddress, solanaExplorerAddressUrl } from "../src/lib/devnetWallet";

const wallet="DWLaEPUUyLgPqhoJDGni8PRaL58FdfSmXdL6Qtrp1hJ8";

test("derives and formats canonical Circle Devnet balances",async()=>{
  assert.equal(CIRCLE_DEVNET_USDC_MINT,"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");
  assert.equal(await deriveCircleDevnetUsdcAta(wallet),"AndxfxZ2vX8aBwsYAG8HRMptjBHtUrvGDseRGvUMr9mM");
  assert.equal(formatSolBalance(4_997_955_720),"4.998");
  assert.equal(formatUsdcBalance("20000000"),"20");
  assert.equal(formatUsdcBalance("0"),"0");
  assert.equal(shortAddress(wallet),"DWLa...p1hJ8");
});

test("constructs an encoded Devnet-only Explorer URL",()=>{
  assert.equal(solanaExplorerAddressUrl(wallet),`https://explorer.solana.com/address/${wallet}?cluster=devnet`);
  assert.throws(()=>solanaExplorerAddressUrl("not a wallet"));
});

test("component is user-initiated, read-only, accessible, responsive, and Devnet-verified",async()=>{
  const source=await readFile(new URL("../src/components/product/personal/DevnetTestBar.tsx",import.meta.url),"utf8");
  assert(source.includes(`aria-expanded={expanded}`));
  assert(source.includes("sm:grid-cols-2"));
  assert(source.includes("min-w-0"));
  assert(source.includes("wallet.connect()"));
  assert(source.includes("getGenesisHash().send()"));
  assert(source.includes("getTokenAccountBalance"));
  assert(source.includes("Associated account does not exist"));
  assert(source.includes("temporarily unavailable"));
  assert(source.includes("SOLANA_DEVNET_GENESIS_HASH"));
  assert.equal(/signTransaction|signMessage|sendTransaction|mainnet-beta/.test(source),false);
  assert.equal(/useEffect\([\s\S]{0,400}wallet\.connect\(\)/.test(source),false);
});

test("Devnet bar is directly beneath the primary payment workspace",async()=>{
  const page=await readFile(new URL("../src/app/personal/send/page.tsx",import.meta.url),"utf8");
  assert(page.indexOf("<PaymentIntentWorkspace")<page.indexOf("<DevnetTestBar"));
});
