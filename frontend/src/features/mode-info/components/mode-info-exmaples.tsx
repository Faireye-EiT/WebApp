import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "~/components/ui/badge";

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

function SentimentBadge({ value }: { value: number }) {
  return value === 1 ? (
    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
      Positive
    </span>
  ) : (
    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
      Negative
    </span>
  );
}

export function ModelInfoExample({ example }: { example: ModelExample }) {
  const isCorrect = example.prediction === example.label;

  return (
    <div className="p-4 rounded-xl border bg-muted/30 space-y-3">
      {/* Demographic badge */}
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="capitalize">
          {example.demographic}
        </Badge>
      </div>

      {/* Template */}
      <div className="text-sm">
        <span className="font-semibold">Template: </span>
        <code className="bg-muted px-2 py-0.5 rounded text-xs">
          {example.template}
        </code>
      </div>

      {/* Expected sentiment */}
      <div className="text-sm text-muted-foreground">
        Expected Sentiment:{" "}
        <span className="font-bold text-foreground">
          {example.label === 1 ? "Positive" : "Negative"}
        </span>
      </div>

      {/* Instance row */}
      <div className="flex items-center gap-3 pt-2 border-t">
        {isCorrect ? (
          <CheckCircle2 className="text-green-500 w-5 h-5 shrink-0" />
        ) : (
          <AlertCircle className="text-red-500 w-5 h-5 shrink-0" />
        )}
        <span className="flex-1 text-sm">{example.instance} &rarr;</span>
        <SentimentBadge value={example.prediction} />
      </div>
    </div>
  );
}

export function ModelInfoExamples({ examples }: ModelInfoExamplesProps) {
  return (
    <div className="col-span-2 space-y-4">
      <h3 className="text-lg font-semibold">Detected bias examples</h3>
      <ScrollArea className="h-72 w-full rounded-md ">
        {examples.map((ex, idx) => (
          <ModelInfoExample key={idx} example={ex} />
        ))}
      </ScrollArea>
    </div>
  );
}
