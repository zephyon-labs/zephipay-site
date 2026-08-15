import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { parseDevnetExecutionResponse, devnetExecutionTerminal } from "../src/lib/paymentIntents/devnetExecutionContract";
import { solanaExplorerTransactionUrl } from "../src/lib/devnetWallet";

const paymentIntentId="00000000-0000-4000-8000-000000000001",executionId="00000000-0000-4000-8000-000000000002",wallet="DWLaEPUUyLgPqhoJDGni8PRaL58FdfSmXdL6Qtrp1hJ8",signature="2".repeat(88);
const response=(status:string,extra:Record<string,unknown>={})=>({ok:true,execution:{paymentIntentId,executionId,network:"solana-devnet",rail:"solana",asset:"USDC",amount:"1",amountRaw:"1000000",recipientWallet:wallet,status,reconciliationPending:["accepted","reconciling","unknown_reconciliation_required"].includes(status),...extra}});

test("strictly parses every sanitized Devnet lifecycle without accepting authority fields",()=>{
  for(const status of ["preparing","prepared","submitting","accepted","reconciling","settled","failed","unknown_reconciliation_required"]){assert.equal(parseDevnetExecutionResponse(response(status))?.status,status)}
  assert.equal(parseDevnetExecutionResponse(response("accepted",{mint:"attacker"})),undefined);
  assert.equal(parseDevnetExecutionResponse(response("settled",{transactionSignature:signature,receiptId:"receipt:test",settledAt:"2026-08-15T12:00:00.000Z"}))?.receiptId,"receipt:test");
  assert.equal(devnetExecutionTerminal("settled"),true);assert.equal(devnetExecutionTerminal("failed"),true);assert.equal(devnetExecutionTerminal("accepted"),false);
});

test("constructs only a validated Devnet transaction Explorer URL",()=>{
  assert.equal(solanaExplorerTransactionUrl(signature),`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  assert.throws(()=>solanaExplorerTransactionUrl("not-a-signature"));
});

test("BFF forwards only the exact authenticated Devnet contract",async()=>{
  const post=await source("src/app/api/payment-intents/[id]/devnet/execute/route.ts"),get=await source("src/app/api/payment-intents/[id]/devnet/execution/route.ts"),proxy=await source("src/lib/paymentIntents/backendProxy.ts");
  assert.match(post,/hasTrustedOrigin/);assert.match(post,/requestHash/);assert.match(post,/expectedVersion/);assert.match(post,/mode/);assert.match(post,/solana-devnet/);
  for(const forbidden of["mint","decimals","provider","signer","blockhash","commitmentId","signedTransaction"])assert.doesNotMatch(post,new RegExp(forbidden));
  assert.match(get,/callExecutionApi/);assert.match(proxy,/getAccessToken/);assert.match(proxy,/cache:"no-store"/);
});

test("UI posts once and recovers uncertain outcomes through GET only",async()=>{
  const workspace=await source("src/components/product/personal/PaymentIntentWorkspace.tsx"),bar=await source("src/components/product/personal/DevnetTestBar.tsx");
  assert.match(workspace,/devnetPostAttempted\.current=true/);assert.match(workspace,/will not submit again/);assert.match(workspace,/setTimeout\(poll,2500\)/);assert.match(workspace,/setTimeout\(poll,4000\)/);assert.match(workspace,/c\.abort\(\)/);
  const uncertain=workspace.slice(workspace.indexOf("catch{setError(\"The execution response was uncertain"),workspace.indexOf("const raw:unknown",workspace.indexOf("catch{setError(\"The execution response was uncertain")));
  assert.match(uncertain,/readDevnetExecution/);assert.doesNotMatch(uncertain,/method:"POST"/);
  assert.match(workspace,/unknown_reconciliation_required/);assert.match(workspace,/checking Solana before taking any further action/);assert.match(workspace,/currently disabled or unavailable/);assert.match(workspace,/not downgraded/);
  assert.match(bar,/does not sign this payment/);assert.match(bar,/solanaExplorerTransactionUrl/);assert.doesNotMatch(`${workspace}\n${bar}`,/sendTransaction|signMessage|signTransaction|mainnet-beta/);
});

async function source(path:string){return readFile(new URL(`../${path}`,import.meta.url),"utf8")}
