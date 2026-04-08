import { Button } from "~/components/ui/button";
import { ModelData } from "~/features/model-ranking/types";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { DemographicMetrics } from "~/features/model-ranking/types";

interface FairnessBarProps {
  label: string;
  value: number; // 0–1
  demographicMetrics?: { [demographic_name: string]: DemographicMetrics };
}

function getBarColor(pct: number) {
  const clamped = Math.max(0, Math.min(100, pct));
  const hue = (clamped / 100) * 120;
  return `hsl(${hue}, 75%, 45%)`;
}

function getBarGradient(pct: number) {
  const clamped = Math.max(0, Math.min(100, pct));
  const hue = (clamped / 100) * 120;
  const start = `hsl(${hue}, 85%, 55%)`;
  const end = `hsl(${Math.min(120, hue + 8)}, 70%, 40%)`;
  return `linear-gradient(90deg, ${start}, ${end})`;
}

function FairnessBar({ label, value, demographicMetrics }: FairnessBarProps) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  const color = getBarColor(pct);

  return (
    <div className="space-y-1.5 group">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-zinc-800">{label}</span>
        <div className="flex flex-1 justify-end">
          {label !== "Overall Fairness" && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button size="icon-xs" variant="outline">
                    <Plus />
                  </Button>
                }
              ></TooltipTrigger>
              <TooltipContent
                className="dark border border-slate-200"
                sideOffset={8}
              >
                {demographicMetrics ? (
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">Demographics</p>
                    {Object.entries(demographicMetrics).map(
                      ([demographic, metrics]) => (
                        <div
                          key={demographic}
                          className="flex items-center justify-between gap-2 py-1"
                        >
                          <p className="text-sm text-zinc-500">{demographic}</p>
                          <p
                            className="text-sm font-bold tabular-nums"
                            style={{
                              color: getBarColor(
                                Math.max(
                                  0,
                                  Math.min(1, metrics.group_accuracy),
                                ) * 100,
                              ),
                            }}
                          >
                            {(metrics.group_accuracy * 100).toFixed(1)}%
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                ) : null}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <span
          className="w-12 text-right text-sm font-bold tabular-nums"
          style={{ color }}
        >
          {pct.toFixed(1)}%
        </span>
      </div>
      <div className="h-4 w-full rounded-full bg-zinc-100 ring-1 ring-zinc-200/70 overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out shadow-[inset_0_-1px_0_rgba(0,0,0,0.15)]"
          style={{ width: `${pct}%`, backgroundImage: getBarGradient(pct) }}
        />
      </div>
    </div>
  );
}

export function ModelInfoMetrics({ model }: { model: ModelData }) {
  const bars = [
    { label: "Overall Fairness", value: model.equalized_odds_ratio },
    {
      label: "Gender Fairness",
      value: model.gender.equalized_odds_ratio,
      demographicMetrics: model.gender.demographic_metrics,
    },
    {
      label: "Race Fairness",
      value: model.race.equalized_odds_ratio,
      demographicMetrics: model.race.demographic_metrics,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="flex flex-col rounded-xl gap-4">
        <h3 className="text-lg font-semibold">Metrics</h3>
        <div className="flex flex-col gap-2">
          {bars.map((bar) =>
            bar.value != null ? (
              <FairnessBar
                key={bar.label}
                label={bar.label}
                value={bar.value}
                demographicMetrics={bar.demographicMetrics}
              />
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
