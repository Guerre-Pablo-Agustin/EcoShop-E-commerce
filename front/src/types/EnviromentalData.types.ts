export type PackagingType =
  | "BIODEGRADABLE"
  | "RECYCLABLE"
  | "REUSABLE"
  | "MINIMAL"
  | "PLASTIC_FREE"
  | "COMPOSTABLE";

export interface EnvironmentalData {
  id: number;
  carbonFootprint: number;
  materials: string;
  origin: string;
  transportDistance: number;
  waterUsage: number;
  energyConsumption: number;
  recyclabilityPercentage: number;
  packagingType: PackagingType;
  impactLevel: string;
}
