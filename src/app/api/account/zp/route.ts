import { NextResponse } from "next/server";
import { callZpApi } from "@/lib/zp/serverClient";

const headers = { "Cache-Control": "private, no-store", Pragma: "no-cache" };
export async function GET() { const result = await callZpApi(); return NextResponse.json(result.body, { status: result.status, headers }); }
