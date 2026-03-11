"use client";
import { ModelData } from "@/features/model-ranking/types";
import { useState } from "react";
import { AlternateTabState } from "~/app/rankings/page";
import { buildComparisonData } from "../utils";
import { ModelComparisonChart } from "./model-comparison-chart";
import { ModelComparisonHeader } from "./model-comparison-header";
import { ModelComparisonTable } from "./model-comparison-table";

export interface ModelComparisonProps {
  modelsData: ModelData[];
  setAlternateTab: (
    val: (prev: AlternateTabState) => AlternateTabState,
  ) => void;
}

export function ModelComparison({
  modelsData,
  setAlternateTab,
}: ModelComparisonProps) {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const comparisonData: ModelData[] = buildComparisonData(
    modelsData,
    selectedModels,
  );

  return (
    <div className="space-y-8 flex-col p-4 rounded-xl border-2">
      <ModelComparisonHeader
        options={modelsData.map((model) => model.name)}
        setAlternateTab={setAlternateTab}
        selectedModels={selectedModels}
        onSelectModels={setSelectedModels}
      />
      <ModelComparisonChart comparisonData={comparisonData} />
      <ModelComparisonTable />
    </div>
  );
}
