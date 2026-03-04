"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";

export interface ModelComparisonHeaderProps {
  onOpenComparisons: (val: (prev: boolean) => boolean) => void;
  options: string[];
  selectedModels: string[];
  onSelectModels: (val: (prev: string[]) => string[]) => void;
}

export function ModelComparisonHeader({
  onOpenComparisons,
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
            onSelectModels((prev) => value);
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
          onOpenComparisons((prev) => false);
        }}
      >
        <X />
      </Button>
    </div>
  );
}
