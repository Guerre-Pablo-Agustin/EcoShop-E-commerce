export type CertificationType =
  | "FAIR_TRADE"
  | "CARBON_NEUTRAL"
  | "ECO_LABEL"
  | "ORGANIC"
  | "RECYCLED_MATERIALS"
  | "RENEWABLE_ENERGY"
  | "BIODEGRADABLE";

export interface Certification {
  id: number;
  name: string;
  description: string;
  badgeUrl: string;
  type: CertificationType;
  issuingOrganization: string;
  validUntil: Date;
  isActive: boolean;
}
