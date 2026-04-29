import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  buildComparableNotes,
  buildJurisdictionNotes,
  getAppealContext,
} from "@/lib/appeal-context";
import { prisma } from "@/lib/prisma";
import { generateAppealContent } from "@/lib/openai";

const reportRequestSchema = z.object({
  ownerName: z.string().trim().min(1, "Owner name is required."),
  taxYear: z.string().trim().min(1, "Tax year is required."),
  address: z.string().trim().min(1, "Address is required."),
  county: z.string().trim().min(1, "County is required."),
  state: z.string().trim().min(1, "State is required."),
  propertyType: z.string().trim().min(1, "Property type is required."),
  squareFootage: z.coerce.number().int().positive().optional(),
  lotSize: z.coerce.number().positive().optional(),
  yearBuilt: z.coerce.number().int().positive().optional(),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  bathrooms: z.coerce.number().nonnegative().optional(),
  upgrades: z.string().trim().optional(),
  currentValue: z.coerce.number().nonnegative().optional(),
  notes: z.string().trim().optional(),
  comparableProperties: z.string().trim().optional(),
  jurisdictionNotes: z.string().trim().optional(),
});

function normalizeOptionalNumber(value: unknown) {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  return value;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const parsed = reportRequestSchema.parse({
      ...body,
      squareFootage: normalizeOptionalNumber(body.squareFootage),
      lotSize: normalizeOptionalNumber(body.lotSize),
      yearBuilt: normalizeOptionalNumber(body.yearBuilt),
      bedrooms: normalizeOptionalNumber(body.bedrooms),
      bathrooms: normalizeOptionalNumber(body.bathrooms),
      currentValue: normalizeOptionalNumber(body.currentValue),
    });

    const context = await getAppealContext({
      county: parsed.county,
      state: parsed.state,
      propertyType: parsed.propertyType,
    });

    const autoComparableNotes = buildComparableNotes(context.comparables);
    const autoJurisdictionNotes = buildJurisdictionNotes(context.rules);

    const aiResult = await generateAppealContent({
      ...parsed,
      comparableProperties: [
        autoComparableNotes,
        parsed.comparableProperties,
      ]
        .filter(Boolean)
        .join("\n\n"),
      jurisdictionNotes: [
        autoJurisdictionNotes,
        parsed.jurisdictionNotes,
      ]
        .filter(Boolean)
        .join("\n\n"),
    });

    const created = await prisma.property.create({
      data: {
        userId: session.user.id,
        address: parsed.address,
        county: parsed.county,
        state: parsed.state,
        propertyType: parsed.propertyType,
        squareFootage: parsed.squareFootage,
        lotSize: parsed.lotSize,
        yearBuilt: parsed.yearBuilt,
        bedrooms: parsed.bedrooms,
        bathrooms: parsed.bathrooms,
        upgrades: parsed.upgrades,
        currentValue: parsed.currentValue,
        notes: [
          parsed.notes,
          parsed.ownerName ? `Owner Name: ${parsed.ownerName}` : "",
          parsed.taxYear ? `Tax Year: ${parsed.taxYear}` : "",
          autoComparableNotes
            ? `Auto-Loaded Comparable Properties:\n${autoComparableNotes}`
            : "",
          parsed.comparableProperties
            ? `Comparable Properties:\n${parsed.comparableProperties}`
            : "",
          autoJurisdictionNotes
            ? `Auto-Loaded Jurisdiction Notes:\n${autoJurisdictionNotes}`
            : "",
          parsed.jurisdictionNotes
            ? `Jurisdiction Notes:\n${parsed.jurisdictionNotes}`
            : "",
        ]
          .filter(Boolean)
          .join("\n\n"),
        reports: {
          create: {
            aiAnalysis: aiResult.analysis,
            appealLetter: aiResult.appealLetter,
          },
        },
      },
      include: {
        reports: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    const report = created.reports[0];

    return NextResponse.json({
      reportId: report.id,
      propertyId: created.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Please correct the highlighted property details.",
          details: error.flatten(),
        },
        { status: 400 }
      );
    }

    const message =
      error instanceof Error ? error.message : "Failed to generate appeal report.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
