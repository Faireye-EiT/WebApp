import { ModelData } from "~/features/model-ranking/types";
import { ModelInfoHeader } from "./model-info-header";
import { AlternateTabState } from "~/app/rankings/page";

interface ModelInfoProps {
  model: ModelData;
  setAlternateTab: (
    val: (prev: AlternateTabState) => AlternateTabState,
  ) => void;
}

export function ModelInfo({ model }: ModelInfoProps) {
  return (
    <div className="space-y-8 flex-col p-4 rounded-xl border-2">
      <ModelInfoHeader name={model.name} />
      <p className="text-gray-600">
        Here you can find detailed information about the selected model,
        including its performance metrics, fairness evaluations, and other
        relevant data. Use this information to compare different models and make
        informed decisins about which one best suits your needs.
      </p>
    </div>
  );
}
