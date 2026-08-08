import { randomUUID } from "node:crypto";
import { hasTrustedOrigin } from "@/lib/paymentIntents/origin";
import { validIdempotencyKey } from "@/lib/paymentIntents/requests";
import { apiResponse,routeError } from "@/lib/paymentIntents/routeResponse";
import { parseCreatePaymentRequest } from "@/lib/paymentRequests/requests";
import { callPaymentRequestApi } from "@/lib/paymentRequests/serverClient";
export async function GET(request:Request){const limit=new URL(request.url).searchParams.get("limit")??"20";if(!/^\d+$/.test(limit)||Number(limit)<1||Number(limit)>50)return routeError(400,"Payment request limit must be between 1 and 50.");return apiResponse(await callPaymentRequestApi({method:"GET",path:`/api/payment-requests?limit=${limit}`,requestId:request.headers.get("x-request-id"),response:"list"}) as never)}
export async function POST(request:Request){if(!hasTrustedOrigin(request))return routeError(403,"Request origin is not allowed.");const raw:unknown=await request.json().catch(()=>undefined),body=parseCreatePaymentRequest(raw);if(!body)return routeError(400,"Review the request details and try again.");const supplied=request.headers.get("idempotency-key"),key=supplied??randomUUID();if(!validIdempotencyKey(key))return routeError(400,"A valid idempotency key is required.");return apiResponse(await callPaymentRequestApi({method:"POST",path:"/api/payment-requests",body,idempotencyKey:key,requestId:request.headers.get("x-request-id"),response:"create"}) as never)}
