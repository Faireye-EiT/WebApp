import { ModelData } from "~/features/model-ranking/types";

interface BiasBarProps {
  label: string;
  value: number; // 0–1
}

function BiasBar({ label, value }: BiasBarProps) {
  const pct = Math.round(value * 100);
  return (
    <div className="space-y-1">
      <span className="text-sm font-semibold">{label}</span>
      <div className="flex items-center gap-3">
        <div className="flex flex-1 h-4 rounded-full overflow-hidden">
          <div className="bg-red-400 h-full" style={{ width: `${pct}%` }} />
          <div
            className="bg-green-400 h-full"
            style={{ width: `${100 - pct}%` }}
          />
        </div>
        <span className="text-sm font-bold w-12 text-right">{pct} %</span>
      </div>
    </div>
  );
}

export function ModelInfoChart({ model }: { model: ModelData }) {
  const bars: BiasBarProps[] = [
    { label: "Overall Bias", value: model.max_demographic_parity_difference },
    { label: "Male Bias", value: model.male.false_positive_rate },
    { label: "Female Bias", value: model.female.false_positive_rate },
    {
      label: "African-american Bias",
      value: model["african-american"].false_positive_rate,
    },
    { label: "European Bias", value: model.european.false_positive_rate },
  ];

  return (
    <div className="rounded-xl  space-y-4">
      <h3 className="text-lg font-semibold">Fairness Metrics</h3>
      {bars.map((bar) => (
        <BiasBar key={bar.label} label={bar.label} value={bar.value} />
      ))}
    </div>
  );
}
