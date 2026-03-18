"use client";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { X } from "lucide-react";
import { useAlternateTab } from "~/context/alternate-tab";

export interface ModelComparisonHeaderProps {
  options: string[];
  selectedModels: string[];
  onSelectModels: (val: (prev: string[]) => string[]) => void;
}

export function ModelComparisonHeader({
  options,
  selectedModels,
  onSelectModels,
}: ModelComparisonHeaderProps) {
  const { setAlternateTab } = useAlternateTab();
  const multiselectOptions = options.map((opt) => ({ value: opt, label: opt }));
  return (
    <div className="flex min-w-0 items-center justify-between gap-2">
      {/* Multiselect dropdown */}
      <div className="flex-1 w-full min-w-0">
        <MultiSelect
          options={multiselectOptions}
          onValueChange={(value) => {
            onSelectModels(() =>
              value.sort((a, b) => options.indexOf(a) - options.indexOf(b)),
            );
          }}
          defaultValue={selectedModels}
          maxCount={3}
          maxSelected={3}
          responsive={true}
          searchable={true}
          placeholder="Choose models to compare"
          className="rounded-[10px] border border-(--color-border)"
          hideSelectAll={true}
          animationConfig={{
            badgeAnimation: "none",
            popoverAnimation: "none",
            optionHoverAnimation: "none",
          }}
          singleLine={false}
        />
      </div>
      {/* Close button */}
      <Button
        size="icon-lg"
        variant="outline"
        onClick={() => {
          setAlternateTab("none");
        }}
      >
        <X />
      </Button>
    </div>
  );
}
