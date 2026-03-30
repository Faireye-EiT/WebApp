import { ModelData } from "~/features/model-ranking/types";
import { ModelInfoMetrics } from "./model-info-metrics";
import { ModelInfoDetails } from "./model-info-details";
import { ModelExample, ModelInfoExamples } from "./model-info-examples";
import { ModelInfoHeader } from "./model-info-header";

interface ModelInfoProps {
  handleClosePanel: () => void;
  model: ModelData;
}

export function ModelInfo({ handleClosePanel, model }: ModelInfoProps) {
  const examples: ModelExample[] = Object.entries(
    model.prediction_examples,
  ).flatMap(([category, examples]) =>
    Object.values(examples).map((example) => ({
      category,
      demographic: example.subgroup,
      instance: example.instance,
      prediction: example.prediction,
      label: example.label,
      template: example.template,
    })),
  );
  return (
    <div className="h-full flex flex-col gap-5">
      <ModelInfoHeader
        name={model.model_name}
        onClosePanel={handleClosePanel}
      />
      <div className="grow flex flex-col lg:grid lg:grid-cols-2 gap-5 min-h-0">
        <div className="grow flex flex-col gap-5">
          <ModelInfoDetails model={model} />
          <ModelInfoMetrics model={model} />
        </div>
        <ModelInfoExamples examples={examples} />
      </div>
    </div>
  );
}
