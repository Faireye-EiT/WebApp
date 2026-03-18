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

  const rankingData = buildRankingData(modelsData, sortBy);
  const searchedRankingData = rankingData.filter(
    (model) =>
      model.model_name.toLowerCase().includes(searchVal) ||
      model.rank.toString().includes(searchVal),
  );

  const top3 = rankingData.slice(0, 3);
  const averageScore =
    rankingData.length > 0
      ? rankingData.reduce((sum, entry) => sum + entry.score, 0) /
        rankingData.length
      : 0;
  const bestModel = rankingData[0];

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Live Rankings
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              Model Fairness Leaderboard
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Tap any row to open full model details.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
              {rankingData.length} models
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
              Avg {Math.round(averageScore * 100)}%
            </span>
            {bestModel && (
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Top: {bestModel.model_name}
              </span>
            )}
          </div>
        </div>
      </section>

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
        rankingData={searchedRankingData}
        sortBy={sortBy}
        sortDirection={sortDirection}
        setSelectedModel={setSelectedModel}
      />
    </div>
  );
}
