"use client";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { X } from "lucide-react";
import { AlternateTabState } from "~/app/rankings/page";

export interface ModelComparisonHeaderProps {
  setAlternateTab: (
    val: (prev: AlternateTabState) => AlternateTabState,
  ) => void;
  options: string[];
  selectedModels: string[];
  onSelectModels: (val: (prev: string[]) => string[]) => void;
}

export function ModelComparisonHeader({
  setAlternateTab,
  options,
  selectedModels,
  onSelectModels,
}: ModelComparisonHeaderProps) {
  return (
    <div className="flex gap-2 justify-between items-center">
      {/* Multiselect dropdown */}
      <div className="flex-1 w-full min-w-0">
        <MultiSelect
          options={options.map((opt) => ({ value: opt, label: opt }))}
          onValueChange={(value) => {
            onSelectModels(() => value);
          }}
          defaultValue={selectedModels}
          maxCount={3}
          maxSelected={3}
          responsive={false}
          searchable={true}
          placeholder="Choose models to compare"
          className="border rounded-[10px] border-[var(--color-border)"
          hideSelectAll={true}
          animationConfig={{
            badgeAnimation: "none",
            popoverAnimation: "none",
            optionHoverAnimation: "none",
          }}
          singleLine={true}
        />
      </div>
      {/* Close button */}
      <Button
        size="icon-lg"
        variant="outline"
        onClick={() => {
          setAlternateTab(() => "none");
        }}
      >
        <X />
      </Button>
    </div>
  );
}
