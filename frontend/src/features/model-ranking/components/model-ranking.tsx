"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import { ModelData, SortByOption, SortDirection } from "../types";
import { buildLeaderboardData } from "../utils";
import { ModelRankingHeader } from "./model-ranking-header";
import { ModelLeaderboard } from "./model-ranking-leaderborad";
import { Podium } from "./model-ranking-podium";

export interface ModelRankingProps {
  modelsData: ModelData[];
}

export function ModelRanking({ modelsData }: ModelRankingProps) {
  const [searchVal, setSearchVal] = useState("");
  const [comparisonsOpen, setComparisonsOpen] = useState(false);
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
    <div className="flex gap-2">
      <div className="space-y-8 flex-col p-4  rounded-xl border-2">
        <ModelRankingHeader
          searchValue={searchVal}
          onSearchChange={setSearchVal}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortDirection={sortDirection}
          onDirectionChange={setSortDirection}
          onOpenComparions={setComparisonsOpen}
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
        />
        <ModelLeaderboard modelsData={leaderBoardData} />
      </div>
      {comparisonsOpen && <DummyComparions />}
    </div>
  );
}

function DummyComparions() {
  return (
    <Card className="w-full max-w-xl border-zinc-500 border-2 bg-zinc-400">
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
  );
}
