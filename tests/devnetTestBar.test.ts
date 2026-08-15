import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { CIRCLE_DEVNET_USDC_MINT, deriveCircleDevnetUsdcAta, detectPhantomProvider, formatSolBalance, formatUsdcBalance, shortAddress, solanaExplorerAddressUrl, walletConnectionFailure, type InjectedSolanaWallet } from "../src/lib/devnetWallet";

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

test("detects current and legacy Phantom injection at interaction time",()=>{
  const provider={isPhantom:true,async connect(){return{publicKey:{toBase58:()=>wallet}}},async disconnect(){}} satisfies InjectedSolanaWallet;
  assert.equal(detectPhantomProvider({phantom:{solana:provider}}),provider);
  assert.equal(detectPhantomProvider({solana:provider}),provider);
  assert.equal(detectPhantomProvider({solana:{...provider,isPhantom:false}}),undefined);
  assert.equal(detectPhantomProvider({}),undefined);
});

test("classifies cancellation, pending requests, and provider failures without leaking errors",()=>{
  assert.match(walletConnectionFailure({code:4001,message:"secret provider detail"}),/cancelled/);
  assert.match(walletConnectionFailure({code:-32002}),/already open/);
  const generic=walletConnectionFailure(new Error("credential-bearing raw error"));
  assert.match(generic,/could not connect/); assert.doesNotMatch(generic,/credential-bearing/);
});

test("component is user-initiated, read-only, accessible, responsive, and Devnet-verified",async()=>{
  const source=await readFile(new URL("../src/components/product/personal/DevnetTestBar.tsx",import.meta.url),"utf8");
  assert(source.includes(`aria-expanded={expanded}`));
  assert(source.includes("sm:grid-cols-2"));
  assert(source.includes("min-w-0"));
  assert(source.includes("provider.connect()"));
  assert(source.includes("getGenesisHash().send()"));
  assert(source.includes("getTokenAccountBalance"));
  assert(source.includes("Associated account does not exist"));
  assert(source.includes("temporarily unavailable"));
  assert(source.includes("HTTPS, localhost, or 127.0.0.1"));
  assert(source.includes("SOLANA_DEVNET_GENESIS_HASH"));
  assert.equal(/signTransaction|signMessage|sendTransaction|mainnet-beta/.test(source),false);
  assert.equal(/useEffect\([\s\S]{0,400}wallet\.connect\(\)/.test(source),false);
  assert.equal(source.includes("useMemo"),false);
});

test("Devnet bar is directly beneath the primary payment workspace",async()=>{
  const page=await readFile(new URL("../src/app/personal/send/page.tsx",import.meta.url),"utf8");
  assert(page.indexOf("<PaymentIntentWorkspace")<page.indexOf("<DevnetTestBar"));
});
