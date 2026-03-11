
export interface DemographicMetrics {
  group_accuracy: number;
  true_negative_rate: number;
  true_positive_rate: number;
  false_negative_rate: number;
  false_positive_rate: number;
}

export interface PredictionExample {
  instance: string;
  prediction: number;
  label: number;
  template: string;
}

export interface DemographicPredictions {
  [key: string]: PredictionExample;
}

export interface ModelData {
  model_name: string;
  rank: number;
  company?: string;
  companyUrl?: string;
  price?: string;
  availability?: string;
  releaseDate?: string;
  summary?: string;
  female: DemographicMetrics;
  male: DemographicMetrics;
  european: DemographicMetrics;
  "african-american": DemographicMetrics;
  global_accuracy: number;
  max_demographic_parity_difference: number;
  equalized_odds_difference: number;
  equalized_odds_ratio: number; // "overall score"
  prediction_examples: {
    female: DemographicPredictions;
    male: DemographicPredictions;
    european: DemographicPredictions;
    "african-american": DemographicPredictions;
  };
}




export type SortByOption =
  | "rank"
  | "femaleFairness"
  | "maleFairness"
  | "europeanFairness"
  | "africanAmericanFairness";

export type SortDirection = "asc" | "desc";
