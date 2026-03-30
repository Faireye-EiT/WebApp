import { ModelData, ModelRankingEntry, SortByOption } from "./types";

export function buildRankingData(
  modelsData: ModelData[],
  sortBy: SortByOption,
): ModelRankingEntry[] {
  return modelsData
    .sort((a, b) => {
      if (sortBy === "Overall Fairness") return a.rank - b.rank;
      if (sortBy === "Gender Fairness")
        return b.gender.equalized_odds_ratio - a.gender.equalized_odds_ratio;
      if (sortBy === "Race Fairness")
        return b.race.equalized_odds_ratio - a.race.equalized_odds_ratio;
      return 0;
    })
    .map((model, index) => {
      let score = 0;
      if (sortBy === "Overall Fairness") score = model.equalized_odds_ratio;
      if (sortBy === "Gender Fairness")
        score = model.gender.equalized_odds_ratio;
      if (sortBy === "Race Fairness") score = model.race.equalized_odds_ratio;

      return {
        model_name: model.model_name,
        rank: index + 1,
        score: score,
      };
    });
}
