import { NextResponse } from "next/server";

import {
  buildComparableNotes,
  buildJurisdictionNotes,
  getAppealContext,
} from "@/lib/appeal-context";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const county = searchParams.get("county") ?? "";
  const state = searchParams.get("state") ?? "";
  const propertyType = searchParams.get("propertyType") ?? "";

  if (!county.trim() || !state.trim()) {
    return NextResponse.json({
      rules: [],
      comparables: [],
      jurisdictionNotes: "",
      comparableNotes: "",
    });
  }

  const { rules, comparables } = await getAppealContext({
    county,
    state,
    propertyType,
  });

  return NextResponse.json({
    rules,
    comparables,
    jurisdictionNotes: buildJurisdictionNotes(rules),
    comparableNotes: buildComparableNotes(comparables),
  });
}
