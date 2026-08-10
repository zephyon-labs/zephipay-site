import "server-only";
import { randomUUID } from "node:crypto";
import { authConfigured,getAuth0,paymentScopes } from "@/lib/auth0";
import { failure,normalizePaymentError } from "./errors";
import type { PaymentIntentApiResult } from "./serverClient";

export async function callExecutionApi(input:{method:"GET"|"POST";path:string;body?:unknown;requestId?:string|null}):Promise<PaymentIntentApiResult>{
  if(!authConfigured())return failure(503,"Payment service is not configured.");const auth0=getAuth0();if(!await auth0.getSession())return failure(401,"Sign in is required.");const backendUrl=process.env.ZEPHIPAY_BACKEND_URL?.trim(),audience=process.env.AUTH0_AUDIENCE?.trim();if(!backendUrl||!audience)return failure(503,"Payment service is not configured.");const requestId=input.requestId&&/^[\x21-\x7e]{1,128}$/.test(input.requestId)?input.requestId:randomUUID();
  try{const {token}=await auth0.getAccessToken({audience,scope:paymentScopes});const response=await fetch(new URL(input.path,backendUrl),{method:input.method,headers:{Accept:"application/json",Authorization:`Bearer ${token}`,"X-Request-Id":requestId,...(input.body===undefined?{}:{"Content-Type":"application/json"})},body:input.body===undefined?undefined:JSON.stringify(input.body),cache:"no-store",signal:AbortSignal.timeout(5_000)});if(!response.headers.get("content-type")?.includes("application/json"))return failure(502,"Payment service returned an invalid response.");const body:unknown=await response.json();if(response.ok)return{status:response.status,body:body as never};const normalized=normalizePaymentError(response.status);console.warn("Payment execution upstream request failed.",{category:normalized.body.code,requestId,status:response.status});return normalized}catch{console.warn("Payment execution upstream request failed.",{category:"TEMPORARILY_UNAVAILABLE",requestId,status:503});return failure(503,"Payment service is temporarily unavailable.")}
}
