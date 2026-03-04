import FeatureCard, { type Feature } from "./FeatureCard";
import { Box, RefreshCcw, Globe } from "lucide-react";

function FeatureGrid() {
  const features: Feature[] = [
    { title: "Understand fairness at a glance", icon: Box },
    { title: "Compare models interactively", icon: RefreshCcw },
    { title: "Support inclusive AI decisions", icon: Globe },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {features.map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </div>
    </div>
  );
}

export default FeatureGrid;
