import modelDataJson from "../../../public/model-data.json";
import { ModelRanking } from "../../features/model-ranking/components/model-ranking";
import { ModelData } from "../../features/model-ranking/types";

export default function ModelRankingPage() {
  const modelsData: ModelData[] = modelDataJson as ModelData[];

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-8">
      <ModelRanking modelsData={modelsData} />
    </main>
  );
}
