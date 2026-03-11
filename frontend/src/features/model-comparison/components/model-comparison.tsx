"use client";
import { ModelData } from "@/features/model-ranking/types";
import { useState } from "react";
import { buildComparisonData } from "../utils";
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

  return (
    <div className="space-y-8 flex-col p-4 rounded-xl border-2">
      <ModelComparisonHeader
        options={modelsData.map((model) => model.model_name)}
        selectedModels={selectedModels}
        onSelectModels={setSelectedModels}
      />
      <ModelComparisonChart comparisonData={comparisonData} />
      <ModelComparisonTable />
    </div>
  );
}
