import { ModelData, SortByOption, SortDirection } from "./types";

export function buildLeaderboardData(
  modelsData: ModelData[],
  searchVal: string,
  sortBy: SortByOption,
  sortDirection: SortDirection,
): ModelData[] {
  const dir = sortDirection === "desc" ? 1 : -1;
  return modelsData
    .filter(
      (model) =>
        model.name.toLowerCase().includes(searchVal) ||
        model.rank.toString().includes(searchVal),
    )
    .sort((a, b) => {
      if (sortBy === "rank") return (a.rank - b.rank) * dir;
      if (sortBy === "femaleFairness")
        return (b.female.group_accuracy - a.female.group_accuracy) * dir;
      if (sortBy === "maleFairness")
        return (b.male.group_accuracy - a.male.group_accuracy) * dir;
      if (sortBy === "europeanFairness")
        return (b.european.group_accuracy - a.european.group_accuracy) * dir;
      if (sortBy === "africanAmericanFairness")
        return (
          (b["african-american"].group_accuracy -
            a["african-american"].group_accuracy) *
          dir
        );
      return 0;
    })
}
