import { X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useAlternateTab } from "~/context/alternate-tab";
import { ModelLogo } from "~/features/model-ranking/components/model-ranking-podium";

interface ModelInfoHeaderProps {
  name: string;
}

export function ModelInfoHeader({ name }: ModelInfoHeaderProps) {
  const { setAlternateTab } = useAlternateTab();
  return (
    <div className="p-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-2">
        <ModelLogo name={name} size={60} />
        <h2 className="text-xl font-semibold">{name}</h2>
      </div>
      <Button variant="outline" onClick={() => setAlternateTab("none")}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
