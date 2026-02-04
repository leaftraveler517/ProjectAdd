import { NextResponse } from "next/server";
import { getSummary } from "@/lib/summary";

export const runtime = "nodejs";

export async function GET() {
  try {
    const summary = await getSummary();
    return NextResponse.json(summary);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Failed to compute summary" },
      { status: 400 },
    );
  }
}
