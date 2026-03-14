export interface ModelComparisonTableEntry {
  rank: number;
  name: string;
  price: PriceCategory;
  company: string;
  companyUrl: string;
  releaseDate: string;
  availability: AvailabilityCategory;
  score: number;
}

export type PriceCategory = "Free" | "Paid" | "N/A";
export type AvailabilityCategory =
  | "Website"
  | "API Access"
  | "Self Host"
  | "N/A";
