"use client";
import modelDataJson from "@/../public/model-data.json";
import { ModelComparison } from "@/features/model-comparison/components/model-comparison";
import { ModelRanking } from "@/features/model-ranking/components/model-ranking";
import { ModelData } from "@/features/model-ranking/types";
import { useState } from "react";
import { useAlternateTab } from "~/context/alternate-tab";
import { ModelInfo } from "~/features/mode-info/components/model-info";

export default function ModelRankingPage() {
  const { alternateTab } = useAlternateTab();
  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);

  const modelsData: ModelData[] = modelDataJson as unknown as ModelData[];

  return (
    <main className="h-full flex items-center justify-center bg-background p-8">
      <div className="flex gap-4 flex-col md:flex-row">
        <ModelRanking
          modelsData={modelsData}
          comparisonsOpen={alternateTab === "comparisons"}
          setSelectedModel={setSelectedModel}
        />
        {alternateTab === "comparisons" && (
          <ModelComparison modelsData={modelsData} />
        )}
        {alternateTab === "info" && selectedModel && (
          <ModelInfo model={selectedModel} />
        )}
      </div>
    </main>
  );
}
