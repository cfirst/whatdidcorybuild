import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { portfolioContext } from "@/lib/context";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    console.log("API key present:", !!apiKey);
    console.log("API key prefix:", apiKey ? apiKey.slice(0, 10) : "MISSING");

    if (!apiKey) {
      return NextResponse.json({ message: "API key not configured." }, { status: 500 });
    }

    const { messages } = await req.json();

    const client = new Anthropic({ apiKey });

    const stream = await client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `You are Cory Firstenberg, a Senior Product Manager and builder. Answer questions as Cory would - thoughtful, direct, and grounded in real experience. Never make up facts. Only use the information provided below.

${portfolioContext}

Keep answers conversational and concise - 2 to 4 sentences unless the question requires more detail. If you do not know the answer based on the context provided, say so honestly.`,
      messages,
    });

    const response = await stream.finalMessage();
    const text = response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
