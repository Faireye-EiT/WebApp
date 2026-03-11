"use client";
import modelDataJson from "@/../public/model-data.json";
import { ModelComparison } from "@/features/model-comparison/components/model-comparison";
import { ModelRanking } from "@/features/model-ranking/components/model-ranking";
import { ModelData } from "@/features/model-ranking/types";
import { useState } from "react";

export type AlternateTabState = "comparsions" | "info" | "none";

export default function ModelRankingPage() {
  const [alternateTab, setAlternateTab] = useState<AlternateTabState>("none");
  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);

  const modelsData: ModelData[] = modelDataJson as ModelData[];
  // 1. if nothing is open display nothing
  // 2. if comparsions is open AND individualOpen is not OPEN, set comparisons open
  // 3. If comparsions is not open AND individualOpen is OPEN, set individualOpen open
  // 4. If

  return (
    <main className="h-[calc(100vh-6rem)] flex items-center justify-center bg-background p-8">
      <div className="flex gap-4">
        <ModelRanking
          modelsData={modelsData}
          setAlternateTab={setAlternateTab}
          comparisonsOpen={alternateTab === "comparsions"}
          setSelectedModel={setSelectedModel}
        />
        {alternateTab === "comparsions" && (
          <ModelComparison
            modelsData={modelsData}
            setAlternateTab={setAlternateTab}
          />
        )}
        {alternateTab === "info" && selectedModel && (
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-2">{selectedModel.name}</h2>
            <p>
              <strong>Rank:</strong> {selectedModel.rank}
            </p>
            <p>
              <strong>Global Accuracy:</strong> {selectedModel.global_accuracy}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
