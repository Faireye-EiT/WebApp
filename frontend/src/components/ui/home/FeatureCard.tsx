import { Card, CardHeader, CardTitle } from "~/components/ui/card";

export type Feature = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
};

function FeatureCard({ feature }: { feature: Feature }) {
  const { title, icon: Icon } = feature;

  return (
    <Card className="rounded-2xl hover:shadow-md hover:scale-105 transition-all duration-300 bg-white border border-slate-100">
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>

        <div className="flex flex-col">
          <CardTitle className="text-xl text-slate-900">{title}</CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}

export default FeatureCard;
