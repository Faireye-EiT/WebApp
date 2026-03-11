import { ModelData } from "~/features/model-ranking/types";
import { ModelInfoChart } from "./mode-info-chart";
import { ModelExample, ModelInfoExamples } from "./mode-info-exmaples";
import { ModelInfoDetails } from "./model-info-details";
import { ModelInfoHeader } from "./model-info-header";

interface ModelInfoProps {
  model: ModelData;
}

export function ModelInfo({ model }: ModelInfoProps) {
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
    <div className="space-y-8 flex-col p-4 rounded-xl border-2">
      <ModelInfoHeader name={model.model_name} />
      <div className="p-4 space-y-10 lg:grid lg:grid-cols-4 gap-4 ">
        <div className="flex flex-col gap-4 col-span-2">
          <ModelInfoDetails model={model} />
          <ModelInfoChart model={model} />
        </div>
        <div className="col-span-2">
          <ModelInfoExamples examples={examples} />
        </div>
      </div>
    </div>
  );
}
