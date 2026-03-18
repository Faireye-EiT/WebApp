"use client";

import { useState } from "react";
import { AlertTriangle, Check, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { biasPairs } from "../data";

function SentenceCard({
  label,
  role,
  subject,
  emotion,
  revealed,
  isPositive,
}: {
  label: string;
  role: string;
  subject: string;
  emotion: string;
  revealed: boolean;
  isPositive: boolean;
}) {
  const revealedClassName = revealed
    ? isPositive
      ? "border-emerald-300 bg-emerald-50 dark:border-emerald-900/60 dark:bg-emerald-950/30"
      : "border-rose-300 bg-rose-50 dark:border-rose-900/60 dark:bg-rose-950/30"
    : "border-border bg-muted/40";

  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-colors",
        revealedClassName,
      )}
    >
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mb-4 font-mono text-sm leading-6 text-foreground">
        The {role}{" "}
        <span className="rounded-md bg-foreground px-2 py-1 text-background">
          {subject}
        </span>{" "}
        is {emotion}
      </p>
      {revealed ? (
        <div
          className={cn(
            "flex items-center gap-2 text-sm font-semibold",
            isPositive
              ? "text-emerald-700 dark:text-emerald-300"
              : "text-rose-700 dark:text-rose-300",
          )}
        >
          {isPositive ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
          <span>AI says: {isPositive ? "Positive" : "Negative"}</span>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Waiting for reveal...</p>
      )}
    </div>
  );
}

export function BiasAnalogyDemo() {
  const [pairIndex, setPairIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const pair = biasPairs[pairIndex];

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>See it for yourself</CardTitle>
          </div>
          <div className="flex flex-wrap gap-2">
            {biasPairs.map((item, index) => (
              <Button
                key={item.kind}
                variant={pairIndex === index ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setPairIndex(index);
                  setRevealed(false);
                }}
              >
                {item.kind}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-6">
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          These two sentences say the exact same thing. Only the{" "}
          <b className="text-black">{pair.differenceLabel}</b> is different.
          What does the AI think of each one?
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <SentenceCard
            label="Sentence A"
            role={pair.role}
            subject={pair.a}
            emotion={pair.emotion}
            revealed={revealed}
            isPositive={pair.aPositive}
          />
          <SentenceCard
            label="Sentence B"
            role={pair.role}
            subject={pair.b}
            emotion={pair.emotion}
            revealed={revealed}
            isPositive={pair.bPositive}
          />
        </div>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-4">
        {!revealed ? (
          <Button
            size="lg"
            className="w-full"
            onClick={() => setRevealed(true)}
          >
            Reveal what the AI said
          </Button>
        ) : (
          <div className="flex items-start gap-3 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-300">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="leading-6">
              Same sentence, different answer. The only thing that changed was
              the {pair.differenceLabel}, and the model treated them
              differently. That&apos;s bias.
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
