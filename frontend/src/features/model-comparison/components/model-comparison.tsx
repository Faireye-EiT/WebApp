"use client";
import { ModelComparisonHeader } from "./model-comparison-header";
import { ModelComparisonChart } from "./model-comparison-chart";
import { ModelComparisonTable } from "./model-comparison-table";
import { useState } from "react";
import { ModelData } from "@/features/model-ranking/types";
import { buildComparisonData } from "../utils";

export interface ModelComparisonProps {
  modelsData: ModelData[];
  onOpenComparisons: (val: (prev: boolean) => boolean) => void;
}

export function ModelComparison({
  modelsData,
  onOpenComparisons,
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
        onOpenComparisons={onOpenComparisons}
        selectedModels={selectedModels}
        onSelectModels={setSelectedModels}
      />
      <ModelComparisonChart comparisonData={comparisonData} />
      <ModelComparisonTable />
    </div>
  );
}
