"use client";
import { ModelData } from "@/features/model-ranking/types";
import { useState } from "react";
import { buildComparisonData, buildComparisonTableData } from "../utils";
import { ModelComparisonChart } from "./model-comparison-chart";
import { ModelComparisonHeader } from "./model-comparison-header";
import { ModelComparisonTable } from "./model-comparison-table";

export interface ModelComparisonProps {
  modelsData: ModelData[];
}

export function ModelComparison({ modelsData }: ModelComparisonProps) {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const comparisonData: ModelData[] = buildComparisonData(
    modelsData,
    selectedModels,
  );

  const comparisonTableData = buildComparisonTableData(comparisonData);

  return (
    <div className="h-full flex flex-col gap-5">
      <ModelComparisonHeader
        options={modelsData.map((model) => model.model_name)}
        selectedModels={selectedModels}
        onSelectModels={setSelectedModels}
      />
      <ModelComparisonChart comparisonData={comparisonData} />
      <ModelComparisonTable comparisonData={comparisonTableData} />
    </div>
  );
}
