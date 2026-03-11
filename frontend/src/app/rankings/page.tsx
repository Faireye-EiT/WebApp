"use client";
import modelDataJson from "@/../public/model-data.json";
import { ModelRanking } from "@/features/model-ranking/components/model-ranking";
import { ModelComparison } from "@/features/model-comparison/components/model-comparison";
import { ModelData } from "@/features/model-ranking/types";
import { useState } from "react";

export default function ModelRankingPage() {
  const [comparisonsOpen, setComparisonsOpen] = useState(false);

  const modelsData: ModelData[] = modelDataJson as ModelData[];

  return (
    <main className="h-[calc(100vh-6rem)] flex items-center justify-center bg-background p-8">
      <div className="flex gap-4">
        <ModelRanking
          modelsData={modelsData}
          onOpenComparisons={setComparisonsOpen}
          comparisonsOpen={comparisonsOpen}
        />
        {comparisonsOpen && (
          <ModelComparison
            modelsData={modelsData}
            onOpenComparisons={setComparisonsOpen}
          />
        )}
      </div>
    </main>
  );
}
