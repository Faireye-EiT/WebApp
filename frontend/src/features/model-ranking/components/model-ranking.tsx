"use client";
import { useState } from "react";
import { ModelData, SortByOption, SortDirection } from "../types";
import { buildLeaderboardData } from "../utils";
import { ModelRankingHeader } from "./model-ranking-header";
import { ModelLeaderboard } from "./model-ranking-leaderborad";
import { Podium } from "./model-ranking-podium";

export interface ModelRankingProps {
  modelsData: ModelData[];
  onOpenComparisons: (val: (prev: boolean) => boolean) => void;
  comparisonsOpen: boolean;
}

export function ModelRanking({
  modelsData,
  onOpenComparisons,
  comparisonsOpen,
}: ModelRankingProps) {
  const [searchVal, setSearchVal] = useState("");
  const [sortBy, setSortBy] = useState<SortByOption>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const leaderBoardData = buildLeaderboardData(
    modelsData,
    searchVal,
    sortBy,
    sortDirection,
  );

  const top3 = modelsData.sort((a, b) => a.rank - b.rank).slice(0, 3);

  return (
    <div className="space-y-8 flex flex-col p-4 rounded-xl border-2 md:min-w-125 h-full">
      <ModelRankingHeader
        searchValue={searchVal}
        onSearchChange={setSearchVal}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortDirection={sortDirection}
        onDirectionChange={setSortDirection}
        onOpenComparisons={onOpenComparisons}
        comparisonsOpen={comparisonsOpen}
      />
      <Podium
        title="Model Rankings"
        first={{
          name: top3[0].name,
          score: top3[0].global_accuracy,
        }}
        second={{
          name: top3[1].name,
          score: top3[1].global_accuracy,
        }}
        third={{
          name: top3[2].name,
          score: top3[2].global_accuracy,
        }}
        className="flex-1 min-h-0"
      />
      <ModelLeaderboard modelsData={leaderBoardData} />
    </div>
  );
}
