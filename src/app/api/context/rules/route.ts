import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const createRuleSchema = z.object({
  county: z.string().trim().min(1),
  state: z.string().trim().min(1),
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  evidenceRequirements: z.string().trim().optional(),
  filingDeadline: z.string().trim().optional(),
  sourceUrl: z.string().trim().url().optional().or(z.literal("")),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = createRuleSchema.parse(body);

    const rule = await prisma.jurisdictionRule.create({
      data: {
        county: parsed.county,
        state: parsed.state.toUpperCase(),
        title: parsed.title,
        summary: parsed.summary,
        evidenceRequirements: parsed.evidenceRequirements || null,
        filingDeadline: parsed.filingDeadline || null,
        sourceUrl: parsed.sourceUrl || null,
      },
    });

    return NextResponse.json(rule, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid rule data." }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Unable to save jurisdiction rule." },
      { status: 500 }
    );
  }
}
