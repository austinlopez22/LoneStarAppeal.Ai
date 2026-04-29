import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const createComparableSchema = z.object({
  address: z.string().trim().min(1),
  county: z.string().trim().min(1),
  state: z.string().trim().min(1),
  propertyType: z.string().trim().min(1),
  squareFootage: z.coerce.number().int().positive().optional(),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  bathrooms: z.coerce.number().nonnegative().optional(),
  yearBuilt: z.coerce.number().int().positive().optional(),
  salePrice: z.coerce.number().nonnegative().optional(),
  assessedValue: z.coerce.number().nonnegative().optional(),
  sourceUrl: z.string().trim().url().optional().or(z.literal("")),
  sourceNotes: z.string().trim().optional(),
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
    const parsed = createComparableSchema.parse({
      ...body,
      squareFootage: normalizeOptionalNumber(body.squareFootage),
      bedrooms: normalizeOptionalNumber(body.bedrooms),
      bathrooms: normalizeOptionalNumber(body.bathrooms),
      yearBuilt: normalizeOptionalNumber(body.yearBuilt),
      salePrice: normalizeOptionalNumber(body.salePrice),
      assessedValue: normalizeOptionalNumber(body.assessedValue),
    });

    const comparable = await prisma.comparableProperty.create({
      data: {
        address: parsed.address,
        county: parsed.county,
        state: parsed.state.toUpperCase(),
        propertyType: parsed.propertyType,
        squareFootage: parsed.squareFootage,
        bedrooms: parsed.bedrooms,
        bathrooms: parsed.bathrooms,
        yearBuilt: parsed.yearBuilt,
        salePrice: parsed.salePrice,
        assessedValue: parsed.assessedValue,
        sourceUrl: parsed.sourceUrl || null,
        sourceNotes: parsed.sourceNotes || null,
      },
    });

    return NextResponse.json(comparable, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid comparable property data." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Unable to save comparable property." },
      { status: 500 }
    );
  }
}
