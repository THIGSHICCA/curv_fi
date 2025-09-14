import { NextRequest, NextResponse } from "next/server";
import { checkCoins } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json(); // decode from JWT in real scenario
    const remainingCoins = await checkCoins(userId);

    // Your AI/GPT request logic here
    // Only allowed if remainingCoins > 0

    return NextResponse.json({
      message: "Request successful",
      remainingCoins,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 403 });
  }
}
