"use client";
import { ModelComparisonHeader } from "./model-comparison-header";
import { ModelComparisonChart } from "./model-comparison-chart";
import { ModelComparisonTable } from "./model-comparison-table";
import { useState } from "react";

export interface ModelComparisonProps {
  onOpenComparisons: (val: (prev: boolean) => boolean) => void;
}

export function ModelComparison({ onOpenComparisons }: ModelComparisonProps) {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  return (
    <div className="space-y-8 flex-col p-4 rounded-xl border-2">
      <ModelComparisonHeader
        onOpenComparisons={onOpenComparisons}
        selectedModels={selectedModels}
        onSelectModels={setSelectedModels}
      />
      <ModelComparisonChart />
      <ModelComparisonTable />
    </div>
  );
}
