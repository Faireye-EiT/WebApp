import { ArrowDown, ArrowUp, Funnel, Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../components/ui/input-group";
import { SortByOption, SortDirection } from "../types";

const SORT_OPTIONS = [
  { value: "Overall Fairness", label: "Overall Fairness" },
  { value: "Gender Fairness", label: "Gender Fairness" },
  { value: "Race Fairness", label: "Race Fairness" },
] as const;

interface ModelRankingHeaderProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
  onSortChange: (val: SortByOption) => void;
  sortBy: SortByOption;
  sortDirection: SortDirection;
  onDirectionChange: (val: SortDirection) => void;
}

export function ModelRankingHeader({
  searchValue,
  onSearchChange,
  onSortChange,
  sortBy,
  sortDirection,
  onDirectionChange,
}: ModelRankingHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white/80 p-2">
      {/* Search */}
      <InputGroup className="w-auto flex-1 rounded-xl bg-slate-50/70">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Filter LLMs..."
          value={searchValue}
          onChange={(val) => onSearchChange(val.target.value.toLowerCase())}
        />
      </InputGroup>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                size="icon-lg"
                variant={sortBy !== "Overall Fairness" ? "default" : "outline"}
                className="shadow-xs"
              />
            }
          >
            <Funnel />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={onSortChange}
              >
                {SORT_OPTIONS.map((opt) => (
                  <DropdownMenuRadioItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Direction</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={sortDirection}
                onValueChange={(v) => onDirectionChange(v)}
              >
                <DropdownMenuRadioItem value="asc">
                  <ArrowUp className="size-3.5" /> Ascending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="desc">
                  <ArrowDown className="size-3.5" /> Descending
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
