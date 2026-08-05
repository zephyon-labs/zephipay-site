import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe,it } from "node:test";
import { parsePaymentIntentResponse } from "../src/lib/paymentIntents/contract";
import { parseCreateInput } from "../src/lib/paymentIntents/requests";
import { parseRecipientRecentResponse } from "../src/lib/recipients/contract";

const ACCOUNT="00000000-0000-4000-8000-000000000902";
const snapshot={accountId:ACCOUNT,username:"recipient_01",displayName:"Recipient",accountType:"personal",verificationState:"unverified",payabilityState:"available",capturedAt:"2026-08-05T12:00:00.000Z",schemaVersion:1,resolutionSource:"recipient_directory",trustOutcome:"acknowledged"};
const response={ok:true,paymentIntent:{id:"00000000-0000-4000-8000-000000000001",status:"awaiting_confirmation",version:"0",requestHash:"a".repeat(64),recipientType:"payment_identity",recipientSnapshot:snapshot,amountRaw:"1000000",amount:"1",asset:"USDC",network:"solana-devnet",purpose:"Test",createdAt:"2026-08-05T12:00:00.000Z"}};

describe("Payment Identity site contracts",()=>{
  it("allows only account linkage and explicit acknowledgment in identity mode",()=>{
    const valid={recipientType:"payment_identity",recipientAccountId:ACCOUNT,amount:"1",purpose:"Test",trustAcknowledgment:{acknowledged:true}};
    assert.deepEqual(parseCreateInput(valid),valid);
    for(const extra of [{recipient:"wallet"},{walletAddress:"wallet"},{verificationState:"verified"},{recipientSnapshot:snapshot}]) assert.equal(parseCreateInput({...valid,...extra}),undefined);
  });
  it("strictly parses persisted snapshots without a hidden destination",()=>{
    const parsed=parsePaymentIntentResponse(response); assert.equal(parsed?.paymentIntent.recipientType,"payment_identity");
    assert.equal("recipient" in (parsed?.paymentIntent ?? {}),false);
    assert.equal(parsePaymentIntentResponse({...response,paymentIntent:{...response.paymentIntent,recipient:"wallet"}}),undefined);
    assert.equal(parsePaymentIntentResponse({...response,paymentIntent:{...response.paymentIntent,recipientSnapshot:{...snapshot,email:"private@example.com"}}}),undefined);
  });
  it("accepts only five narrow Recent identities",()=>{
    const recent={accountId:ACCOUNT,username:"recipient_01",displayName:"Recipient",accountType:"personal",verificationState:"unverified"};
    assert.deepEqual(parseRecipientRecentResponse({ok:true,recipients:[recent]})?.recipients,[recent]);
    assert.equal(parseRecipientRecentResponse({ok:true,recipients:[{...recent,amount:"1"}]}),undefined);
    assert.equal(parseRecipientRecentResponse({ok:true,recipients:Array(6).fill(recent)}),undefined);
  });
  it("keeps fresh resolution, server-only BFF access, recovery, and wallet separation",async()=>{
    const ui=await readFile(new URL("../src/components/product/personal/RecipientExperience.tsx",import.meta.url),"utf8");
    const workspace=await readFile(new URL("../src/components/product/personal/PaymentIntentWorkspace.tsx",import.meta.url),"utf8");
    const recentRoute=await readFile(new URL("../src/app/api/recipients/recent/route.ts",import.meta.url),"utf8");
    assert.match(ui,/\/api\/recipients\/recent/); assert.match(ui,/\/api\/recipients\/\$\{encodeURIComponent\(recipient.accountId\)\}/);
    assert.match(ui,/recipientAccountId:recipient.accountId/); assert.doesNotMatch(ui,/walletAddress/);
    assert.match(ui,/key\.current=undefined/); assert.match(workspace,/recipientSnapshot/); assert.match(workspace,/\?intent=/);
    assert.match(recentRoute,/requireRecipientSession/); assert.doesNotMatch(recentRoute,/getAccessToken/);
  });
});
