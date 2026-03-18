import {
  ModelData,
  ModelRankingEntry,
  SortByOption,
  SortDirection,
} from "./types";

export function buildRankingData(
  modelsData: ModelData[],
  searchVal: string,
  sortBy: SortByOption,
  sortDirection: SortDirection,
): ModelRankingEntry[] {
  const dir = sortDirection === "desc" ? 1 : -1;

  return modelsData
    .filter(
      (model) =>
        model.model_name.toLowerCase().includes(searchVal) ||
        model.rank.toString().includes(searchVal),
    )
    .sort((a, b) => {
      if (sortBy === "Overall Fairness") return (a.rank - b.rank) * dir;
      if (sortBy === "Female Fairness")
        return (b.female.group_accuracy - a.female.group_accuracy) * dir;
      if (sortBy === "Male Fairness")
        return (b.male.group_accuracy - a.male.group_accuracy) * dir;
      if (sortBy === "European Fairness")
        return (b.european.group_accuracy - a.european.group_accuracy) * dir;
      if (sortBy === "African-american Fairness")
        return (
          (b["african-american"].group_accuracy -
            a["african-american"].group_accuracy) *
          dir
        );
      return 0;
    })
    .map((model, index) => {
      let score = 0;
      if (sortBy === "Overall Fairness") score = model.equalized_odds_ratio;
      if (sortBy === "Female Fairness") score = model.female.group_accuracy;
      if (sortBy === "Male Fairness") score = model.male.group_accuracy;
      if (sortBy === "European Fairness") score = model.european.group_accuracy;
      if (sortBy === "African-american Fairness")
        score = model["african-american"].group_accuracy;

      return {
        model_name: model.model_name,
        rank: index + 1,
        score: score,
      };
    });
}
