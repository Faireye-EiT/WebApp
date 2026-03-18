"use client";
import { useState } from "react";
import { ModelData, SortByOption, SortDirection } from "../types";
import { buildRankingData } from "../utils";
import { ModelRankingHeader } from "./model-ranking-header";
import { ModelLeaderboard } from "./model-ranking-leaderboard";
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
  const [sortBy, setSortBy] = useState<SortByOption>("Overall Fairness");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const rankingData = buildRankingData(
    modelsData,
    searchVal,
    sortBy,
    sortDirection,
  );

  const top3 =
    sortDirection === "desc"
      ? rankingData.slice(0, 3)
      : rankingData.slice(-3).reverse();

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
      <Podium
        title="Model Rankings"
        first={{
          name: top3[0]?.model_name,
          score: top3[0]?.score,
        }}
        second={{
          name: top3[1]?.model_name,
          score: top3[1]?.score,
        }}
        third={{
          name: top3[2]?.model_name,
          score: top3[2]?.score,
        }}
        className="flex-1 min-h-0"
      />
      <ModelLeaderboard
        modelsData={modelsData}
        rankingData={rankingData}
        sortBy={sortBy}
        sortDirection={sortDirection}
        setSelectedModel={setSelectedModel}
      />
    </div>
  );
}
