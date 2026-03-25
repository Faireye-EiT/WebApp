import { Card, CardContent } from "~/components/ui/card";
import { ModelData } from "~/features/model-ranking/types";

interface FairnessBarProps {
  label: string;
  value: number; // 0–1
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

function FairnessBar({ label, value }: FairnessBarProps) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);

  const color = getBarColor(pct);

  return (
    <div className="space-y-1.5 group">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-zinc-800">{label}</span>
        <span
          className="w-12 text-right text-sm font-bold tabular-nums"
          style={{ color }}
        >
          {pct}%
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
    { label: "Male Fairness", value: model.male?.group_accuracy },
    { label: "Female Fairness", value: model.female?.group_accuracy },
    // {
    //   label: "African-american Fairness",
    //   value: model["african-american"]?.group_accuracy,
    // },
    // { label: "European Fairness", value: model.european?.group_accuracy },
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
              />
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
