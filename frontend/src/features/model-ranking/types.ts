export interface DemographicMetrics {
  group_accuracy: number;
  true_negative_rate: number;
  true_positive_rate: number;
  false_negative_rate: number;
  false_positive_rate: number;
}
export interface MainMetric {
  equalized_odds_difference: number;
  equalized_odds_ratio: number;
  max_demographic_parity_difference: number;
  global_accuracy: number;
}

export interface CategoryMetrics extends MainMetric {
  demographic_metrics: { [demographic_name: string]: DemographicMetrics };
}

export interface PredictionExample {
  instance: string;
  prediction: number;
  label: number;
  template: string;
  subgroup: string;
}

export interface CategoryPredictions {
  [key: string]: PredictionExample;
}

export interface ModelData extends MainMetric {
  model_name: string;
  rank: number;
  company?: string;
  companyUrl?: string;
  price?: string;
  availability?: string;
  releaseDate?: string;
  summary?: string;
  gender: CategoryMetrics;
  race: CategoryMetrics;
  prediction_examples: {
    gender: CategoryPredictions;
    race: CategoryPredictions;
  };
}

export interface ModelRankingEntry {
  model_name: string;
  rank: number;
  score: number;
}

export type SortByOption =
  | "Overall Fairness"
  | "Gender Fairness"
  | "Race Fairness";

export type SortDirection = "asc" | "desc";
