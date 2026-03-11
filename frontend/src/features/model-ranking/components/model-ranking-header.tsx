import {
  ArrowDown,
  ArrowRightLeft,
  ArrowUp,
  Search,
  Settings,
} from "lucide-react";
import { useAlternateTab } from "~/context/alternate-tab";
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
  { value: "rank", label: "Rank" },
  { value: "femaleFairness", label: "Female Fairness" },
  { value: "maleFairness", label: "Male Fairness" },
  { value: "europeanFairness", label: "European Fairness" },
  { value: "africanAmericanFairness", label: "African-American Fairness" },
] as const;

interface ModelRankingHeaderProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
  comparisonsOpen: boolean;
  onSortChange: (val: SortByOption) => void;
  sortBy: SortByOption;
  sortDirection: SortDirection;
  onDirectionChange: (val: SortDirection) => void;
}

export function ModelRankingHeader({
  searchValue,
  onSearchChange,
  comparisonsOpen,
  onSortChange,
  sortBy,
  sortDirection,
  onDirectionChange,
}: ModelRankingHeaderProps) {
  const { setAlternateTab } = useAlternateTab();
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
          onChange={(val) => onSearchChange(val.target.value.toLowerCase())}
        />
      </InputGroup>
      <div className="flex gap-2">
        <Button
          size={"icon-lg"}
          variant={comparisonsOpen ? "default" : "outline"}
          onClick={() => {
            setAlternateTab(comparisonsOpen ? "none" : "comparisons");
          }}
        >
          <ArrowRightLeft />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                size="icon-lg"
                variant={sortBy !== "rank" ? "default" : "outline"}
              />
            }
          >
            <Settings />
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
