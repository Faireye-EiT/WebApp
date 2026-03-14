"use client";
import { ModelComparisonHeader } from "./model-comparison-header";
import { ModelComparisonChart } from "./model-comparison-chart";
import { ModelComparisonTable } from "./model-comparison-table";
import { useState } from "react";
import { ModelData } from "@/features/model-ranking/types";
import { buildComparisonData, buildComparisonTableData } from "../utils";

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

  const comparisonTableData = buildComparisonTableData(comparisonData);

  return (
    <div className="flex flex-col gap-8 p-4 rounded-xl border-2 h-full min-h-0">
      <ModelComparisonHeader
        options={modelsData.map((model) => model.name)}
        onOpenComparisons={onOpenComparisons}
        selectedModels={selectedModels}
        onSelectModels={setSelectedModels}
      />
      <div className="flex flex-col flex-1 gap-4 min-h-0">
        <ModelComparisonChart comparisonData={comparisonData} />
        <ModelComparisonTable comparisonData={comparisonTableData} />
      </div>
    </div>
  );
}
