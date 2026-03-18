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
    <div className="flex w-full min-w-0 flex-col space-y-8 rounded-3xl border border-slate-200/90 bg-white/90 p-4 shadow-[0_20px_60px_-34px_rgba(15,23,42,0.5)] backdrop-blur-sm md:p-5">
      <ModelComparisonHeader
        options={modelsData.map((model) => model.model_name)}
        selectedModels={selectedModels}
        onSelectModels={setSelectedModels}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
        <ModelComparisonChart comparisonData={comparisonData} />
        <ModelComparisonTable comparisonData={comparisonTableData} />
      </div>
    </div>
  );
}
