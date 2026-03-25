import { ModelData } from "~/features/model-ranking/types";
import { ModelInfoChart } from "./model-info-chart";
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
  ).flatMap(([demographic, value]) =>
    Object.values(value)
      .slice(0, 5)
      .map((example) => ({
        demographic,
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
      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-6 col-span-2 m-0">
          <ModelInfoDetails model={model} />
          <ModelInfoChart model={model} />
        </div>
        <div className="flex col-span-2">
          <ModelInfoExamples examples={examples} />
        </div>
      </div>
    </div>
  );
}
