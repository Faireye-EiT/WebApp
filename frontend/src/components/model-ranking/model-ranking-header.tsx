import { ArrowRightLeft, Search, Settings } from "lucide-react";
import { Button } from "../ui/button";

interface ModelRankingHeaderProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
  onOpenComparions: (val: (prev: boolean) => boolean) => void;
}

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

export function ModelRankingHeader({
  searchValue,
  onSearchChange,
  onOpenComparions,
}: ModelRankingHeaderProps) {
  return (
    <div className="flex gap-2 justify-between items-center">
      {/* Search */}
      <InputGroup className="w-auto">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Filter LLMs..."
          value={searchValue}
          onChange={(val) => onSearchChange(val.target.value)}
        />
      </InputGroup>
      <div className="flex gap-2">
        <Button
          size={"icon-lg"}
          onClick={() => {
            onOpenComparions((prev) => !prev);
          }}
        >
          <ArrowRightLeft />
        </Button>
        <Button size={"icon-lg"}>
          <Settings />
        </Button>
      </div>
    </div>
  );
}
