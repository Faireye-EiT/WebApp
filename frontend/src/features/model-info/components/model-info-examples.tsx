import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

export interface ModelExample {
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
  const { template, instance, label, prediction } = example;
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
      <span className="rounded-md bg-black/80 px-2 py-1 text-background">
        {wordSentence.at(templateIndices[0])}
      </span>
      <span className="pl-2 pr-2">
        {wordSentence
          .slice(templateIndices[0] + 1, templateIndices[1] - 1)
          .join(" ")}
      </span>
      <span className="rounded-md bg-black/80 px-2 py-1 text-background">
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
    : " text-red-700 dark:text-red-300";

  return (
    <div className="p-4 rounded-xl border bg-muted/30 space-y-3">
      <Badge variant="outline" className="capitalize">
        {example.demographic}
      </Badge>
      <div className="text-sm text-muted-foreground">
        <ExampleInstance example={example} />
      </div>
      <div className="border-t pt-2">
        <div className={`${predictionColor}`}>
          AI says: {isPredictionPositive ? "Positive" : "Negative"}
        </div>
        <div className={`${emotionColor}`}>
          Expected: {isLabelPositive ? "Positive" : "Negative"}
        </div>
      </div>
    </div>
  );
}

export function ModelInfoExamples({ examples }: ModelInfoExamplesProps) {
  return (
    <Card className="grow space-y-4 flex">
      <CardContent className="flex flex-col gap-4 grow">
        <h3 className="text-lg font-semibold">Detected bias examples</h3>
        <ScrollArea className="h-135 w-full rounded-md">
          <div className="absolute top-0 left-0 w-full h-4 bg-linear-to-b from-white to-transparent z-10 pointer-events-none"></div>
          <div className="p-2 space-y-4">
            {examples.map((ex, idx) => (
              <ModelInfoExample key={idx} example={ex} />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-4 bg-linear-to-t from-white to-transparent z-10 pointer-events-none"></div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
