"use client";
import { ModelData } from "@/features/model-ranking/types";
import { buildComparisonData, buildComparisonTableData } from "../utils";
import { ModelComparisonChart } from "./model-comparison-chart";
import { ModelComparisonHeader } from "./model-comparison-header";
import { ModelComparisonTable } from "./model-comparison-table";

export interface ModelComparisonProps {
  handleClosePanel: () => void;
  modelsData: ModelData[];
  comparisonModels: string[];
  setComparisonModels: (val: (prev: string[]) => string[]) => void;
}

export function ModelComparison({
  handleClosePanel,
  modelsData,
  comparisonModels,
  setComparisonModels,
}: ModelComparisonProps) {
  const comparisonData: ModelData[] = buildComparisonData(
    modelsData,
    comparisonModels,
  );

  const comparisonTableData = buildComparisonTableData(comparisonData);

  return (
    <div className="h-full flex flex-col gap-5">
      <ModelComparisonHeader
        options={modelsData.map((model) => model.model_name)}
        selectedModels={comparisonModels}
        onSelectModels={setComparisonModels}
        onClosePanel={handleClosePanel}
      />
      <ModelComparisonChart comparisonData={comparisonData} />
      <ModelComparisonTable comparisonData={comparisonTableData} />
    </div>
  );
}
