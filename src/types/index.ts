export interface PropertyInfo {
    ownerName: string;
    propertyAddress: string;
    propertyValue: number;
    propertyType: string; // e.g., "Residential", "Commercial"
    yearBuilt: number;
    squareFootage: number;
}

export interface AIResponse {
    insights: string[];
    recommendedActions: string[];
    estimatedTaxReduction: number;
}