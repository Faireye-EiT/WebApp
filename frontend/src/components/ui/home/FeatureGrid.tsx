import { Box, Globe, RefreshCcw } from "lucide-react";
import FeatureCard, { type Feature } from "./FeatureCard";

function FeatureGrid() {
  const features: Feature[] = [
    { title: "Understand fairness at a glance", icon: Box },
    { title: "Compare models interactively", icon: RefreshCcw },
    { title: "Support inclusive AI decisions", icon: Globe },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      {features.map((f) => (
        <FeatureCard key={f.title} feature={f} />
      ))}
    </div>
  );
}

export default FeatureGrid;
