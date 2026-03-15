import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { message: "Chat is temporarily unavailable. Check back soon." },
    { status: 503 }
  );
}
