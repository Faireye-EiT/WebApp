"use client";
import { useState } from "react";
import { ModelRankingHeader } from "./model-ranking-header";

export interface ModelData {
  overallFairness: number;
}

export function ModelRanking() {
  const [searchVal, setSearchVal] = useState("");
  const [openComparions, setOpenComparisons] = useState(false);

  return (
    <div className="border-2 border-blue-600 p-4 ">
      <ModelRankingHeader
        searchValue={searchVal}
        onSearchChange={setSearchVal}
        onOpenComparions={setOpenComparisons}
      />
      <div>Search val: {searchVal}</div>
      <div>Bool: {openComparions ? "Open" : "Closed"}</div>
    </div>
  );
}
