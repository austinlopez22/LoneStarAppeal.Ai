import { NextResponse } from "next/server";
import { z } from "zod";

import { generateChatReply } from "@/lib/openai";

const chatSchema = z.object({
  message: z.string().trim().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatSchema.parse(body);
    const reply = await generateChatReply(parsed.message);

    return NextResponse.json({ reply });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
    }

    const message =
      error instanceof Error ? error.message : "Unable to generate chat reply.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
