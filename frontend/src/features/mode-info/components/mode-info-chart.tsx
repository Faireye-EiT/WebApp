import { ModelData } from "~/features/model-ranking/types";

interface FairnessBarProps {
  label: string;
  value: number; // 0–1
}

function FairnessBar({ label, value }: FairnessBarProps) {
  const pct = Math.round(value * 100);
  return (
    <div className="space-y-1">
      <span className="text-sm font-semibold">{label}</span>
      <div className="flex items-center gap-3">
        <div className="flex flex-1 h-4 rounded-full overflow-hidden">
          <div className="bg-green-400 h-full" style={{ width: `${pct}%` }} />
          <div
            className="bg-zinc-100 h-full"
            style={{ width: `${100 - pct}%` }}
          />
        </div>
        <span className="text-sm font-bold w-12 text-right">{pct} %</span>
      </div>
    </div>
  );
}

export function ModelInfoChart({ model }: { model: ModelData }) {
  const bars = [
    { label: "Overall Fairness", value: model.equalized_odds_ratio },
    { label: "Male Fairness", value: model.male?.group_accuracy },
    { label: "Female Fairness", value: model.female?.group_accuracy },
    {
      label: "African-american Fairness",
      value: model["african-american"]?.group_accuracy,
    },
    { label: "European Fairness", value: model.european?.group_accuracy },
  ];

  return (
    <div className="rounded-xl  space-y-4">
      <h3 className="text-lg font-semibold">Fairness Metrics</h3>
      {bars.map((bar) =>
        bar.value != null ? (
          <FairnessBar key={bar.label} label={bar.label} value={bar.value} />
        ) : null,
      )}
    </div>
  );
}
