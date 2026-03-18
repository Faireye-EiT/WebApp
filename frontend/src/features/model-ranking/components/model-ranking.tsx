"use client";
import { useState } from "react";
import { ModelData, SortByOption, SortDirection } from "../types";
import { buildLeaderboardData } from "../utils";
import { ModelRankingHeader } from "./model-ranking-header";
import { ModelLeaderboard } from "./model-ranking-leaderborad";
import { Podium } from "./model-ranking-podium";

export interface ModelRankingProps {
  modelsData: ModelData[];
  setSelectedModel: (model: ModelData) => void;
  comparisonsOpen: boolean;
}

export function ModelRanking({
  modelsData,
  setSelectedModel,
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
        comparisonsOpen={comparisonsOpen}
      />
      {top3 && top3.length > 0 && (
        <Podium
          title="Model Rankings"
          first={{
            name: top3[0].model_name,
            score: top3[0].equalized_odds_ratio,
          }}
          second={{
            name: top3[1]?.model_name,
            score: top3[1]?.equalized_odds_ratio,
          }}
          third={{
            name: top3[2]?.model_name,
            score: top3[2]?.equalized_odds_ratio,
          }}
          className="flex-1 min-h-0"
        />
      )}
      <ModelLeaderboard
        modelsData={leaderBoardData}
        setSelectedModel={setSelectedModel}
      />
    </div>
  );
}
