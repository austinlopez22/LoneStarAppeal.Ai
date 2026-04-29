import { prisma } from "@/lib/prisma";

type ContextLookupInput = {
  county: string;
  state: string;
  propertyType?: string;
};

export async function getAppealContext({
  county,
  state,
  propertyType,
}: ContextLookupInput) {
  const normalizedCounty = county.trim();
  const normalizedState = state.trim().toUpperCase();
  const normalizedPropertyType = propertyType?.trim();

  const [rules, comparables] = await Promise.all([
    prisma.jurisdictionRule.findMany({
      where: {
        county: normalizedCounty,
        state: normalizedState,
      },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.comparableProperty.findMany({
      where: {
        county: normalizedCounty,
        state: normalizedState,
        ...(normalizedPropertyType
          ? {
              propertyType: normalizedPropertyType,
            }
          : {}),
      },
      orderBy: { updatedAt: "desc" },
      take: 8,
    }),
  ]);

  return { rules, comparables };
}

export function buildJurisdictionNotes(
  rules: Array<{
    title: string;
    summary: string;
    filingDeadline?: string | null;
    evidenceRequirements?: string | null;
    sourceUrl?: string | null;
  }>
) {
  return rules
    .map((rule, index) =>
      [
        `Rule ${index + 1}: ${rule.title}`,
        `Summary: ${rule.summary}`,
        rule.filingDeadline ? `Deadline: ${rule.filingDeadline}` : "",
        rule.evidenceRequirements
          ? `Evidence Requirements: ${rule.evidenceRequirements}`
          : "",
        rule.sourceUrl ? `Source: ${rule.sourceUrl}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    )
    .join("\n\n");
}

export function buildComparableNotes(
  comparables: Array<{
    address: string;
    propertyType: string;
    squareFootage?: number | null;
    bedrooms?: number | null;
    bathrooms?: number | null;
    yearBuilt?: number | null;
    salePrice?: number | null;
    assessedValue?: number | null;
    sourceNotes?: string | null;
    sourceUrl?: string | null;
  }>
) {
  return comparables
    .map((comp, index) =>
      [
        `Comparable ${index + 1}: ${comp.address}`,
        `Type: ${comp.propertyType}`,
        comp.squareFootage ? `Square Footage: ${comp.squareFootage}` : "",
        comp.bedrooms !== null && comp.bedrooms !== undefined
          ? `Bedrooms: ${comp.bedrooms}`
          : "",
        comp.bathrooms !== null && comp.bathrooms !== undefined
          ? `Bathrooms: ${comp.bathrooms}`
          : "",
        comp.yearBuilt ? `Year Built: ${comp.yearBuilt}` : "",
        comp.salePrice ? `Sale Price: $${comp.salePrice.toLocaleString()}` : "",
        comp.assessedValue
          ? `Assessed Value: $${comp.assessedValue.toLocaleString()}`
          : "",
        comp.sourceNotes ? `Notes: ${comp.sourceNotes}` : "",
        comp.sourceUrl ? `Source: ${comp.sourceUrl}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    )
    .join("\n\n");
}
