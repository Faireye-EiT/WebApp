import { X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useAlternateTab } from "~/context/alternate-tab";
import { ModelLogo } from "~/features/model-ranking/components/model-ranking-podium";

interface ModelInfoHeaderProps {
  onClosePanel: () => void;
  name: string;
}

export function ModelInfoHeader({ name, onClosePanel }: ModelInfoHeaderProps) {
  const { setAlternateTab } = useAlternateTab();
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
      <div className="flex items-center gap-2">
        <ModelLogo name={name} size={60} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Model Profile
          </p>
          <h2 className="text-xl font-semibold text-slate-900">{name}</h2>
        </div>
      </div>
      <Button variant="outline" size="icon" onClick={() => onClosePanel()}>
        <X />
      </Button>
    </div>
  );
}
