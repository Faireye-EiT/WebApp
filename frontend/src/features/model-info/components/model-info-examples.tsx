export interface ModelExample {
  category: string;
  demographic: string;
  instance: string;
  prediction: number;
  label: number;
  template: string;
}

export interface ModelInfoExamplesProps {
  examples: ModelExample[];
}

function ExampleInstance({ example }: { example: ModelExample }) {
  const { template, instance } = example;
  // Calculate the position of the name and emotion word in the template
  const templateIndices = template
    .split(" ")
    .map((word, index) => ({ word: word, index: index }))
    .filter(({ word }) => word.includes("<"))
    .map(({ index }) => index);
  const wordSentence = instance.split(" ");

  return (
    <div>
      <span className="pr-2">
        {wordSentence.slice(0, templateIndices[0]).join(" ")}
      </span>
      <span className="rounded-md bg-gray-500 px-2 py-1 text-white">
        {wordSentence.at(templateIndices[0])}
      </span>
      <span className="pl-2 pr-2">
        {wordSentence
          .slice(templateIndices[0] + 1, templateIndices[1] - 1)
          .join(" ")}
      </span>
      <span className="rounded-md bg-gray-500 px-2 py-1 text-white">
        {wordSentence.at(templateIndices[1] - 1)}
      </span>
    </div>
  );
}

export function ModelInfoExample({ example }: { example: ModelExample }) {
  const isPredictionPositive = example.prediction === 1;
  const predictionColor = isPredictionPositive
    ? "text-green-700 dark:text-green-300"
    : "text-red-700 dark:text-red-300";

  const isLabelPositive = example.label === 1;
  const emotionColor = isLabelPositive
    ? "text-green-700 dark:text-green-300"
    : "text-red-700 dark:text-red-300";

  return (
    <div className="shrink-0 rounded-xl border border-slate-200 bg-muted/30 overflow-hidden">
      {/* Header */}
      <div className="px-3 py-1 text-sm font-semibold tracking-wide bg-muted/100">
        Category: {example.category} ({example.demographic})
      </div>

      <div className="border-t" />

      {/* Content */}
      <div className="p-3 space-y-2">
        <div className="text-sm text-muted-foreground">
          <ExampleInstance example={example} />
        </div>

        <div className="pt-1 text-sm">
          <div className={predictionColor}>
            AI says: {isPredictionPositive ? "Positive" : "Negative"}
          </div>
          <div className={emotionColor}>
            Expected: {isLabelPositive ? "Positive" : "Negative"}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModelInfoExamples({ examples }: ModelInfoExamplesProps) {
  return (
    <div className="min-h-100 max-h-160 grow flex flex-col rounded-2xl border border-slate-200 p-4 gap-4">
      <h3 className="text-lg font-semibold">Detected bias examples</h3>
      <div className="flex-1 min-h-0 overflow-auto space-y-4 flex flex-col">
        {examples.map((ex, idx) => (
          <ModelInfoExample key={idx} example={ex} />
        ))}
      </div>
    </div>
  );
}
