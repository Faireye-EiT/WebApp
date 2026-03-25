import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAlternateTab } from "@/context/alternate-tab";
import { RANK_MEDALS } from "../const";
import {
  ModelData,
  ModelRankingEntry,
  SortByOption,
  SortDirection,
} from "../types";
import { Info } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export interface ModelLeaderboardProps {
  modelsData: ModelData[];
  rankingData: ModelRankingEntry[];
  sortBy: SortByOption;
  sortDirection: SortDirection;
  selectedModel: ModelData | null;
  setSelectedModel: (model: ModelData | null) => void;
  comparisonModels: string[];
  setComparisonModels: (val: (prev: string[]) => string[]) => void;
}

export function ModelLeaderboard({
  modelsData,
  rankingData,
  sortBy,
  sortDirection,
  selectedModel,
  setSelectedModel,
  comparisonModels,
  setComparisonModels,
}: ModelLeaderboardProps) {
  const { setAlternateTab } = useAlternateTab();

  const onSelectModel = (model: ModelData) => {
    // If already selected, unselect it
    if (selectedModel?.model_name === model.model_name) {
      setSelectedModel(null);
      setAlternateTab("none");
    } else {
      setSelectedModel(model);
      setComparisonModels((prev) => []);
      setAlternateTab("info");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white ">
      <div className="relative h-55 overflow-y-auto  flex flex-col">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10 ">
            <TableRow>
              <TableHead className="w-16 text-center">Rank</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="text-right pr-2">{sortBy}</TableHead>
              <TableHead className="w-16 text-center">Compare</TableHead>
              <TableHead className="text-center w-16">Info</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankingData && rankingData.length > 0 ? (
              (sortDirection === "asc"
                ? rankingData.toReversed()
                : rankingData
              ).map((entry) => {
                const rank = entry.rank;
                const isTop3 = rank <= 3;
                const model = modelsData.find(
                  (m) => m.model_name === entry.model_name,
                )!;
                return (
                  <TableRow
                    key={entry.model_name}
                    className={`transition-colors hover:bg-slate-50 h-11.25 `}
                  >
                    <TableCell className="text-center">
                      {RANK_MEDALS[rank] ? (
                        <span className="text-lg">{RANK_MEDALS[rank]}</span>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground"
                        >
                          {rank}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={isTop3 ? "font-semibold" : ""}>
                        {entry.model_name}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-medium text-slate-700">
                        {Math.floor(entry.score * 100)}%
                      </span>
                    </TableCell>
                    <TableCell className="align-middle">
                      <div className="flex justify-center">
                        <Checkbox
                          defaultChecked={false}
                          disabled={
                            !comparisonModels.includes(entry.model_name) &&
                            comparisonModels.length >= 3
                          }
                          checked={comparisonModels.includes(entry.model_name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              // If first time selecting, clear info model and open comparison tab
                              if (comparisonModels.length == 0) {
                                setSelectedModel(null);
                                setAlternateTab("comparisons");
                              }
                              setComparisonModels((prev) => [
                                ...prev,
                                entry.model_name,
                              ]);
                            } else {
                              // If unselecting all models, close comparison tab
                              if (comparisonModels.length == 1) {
                                setAlternateTab("none");
                              }
                              setComparisonModels((prev) =>
                                prev.filter((m) => m !== entry.model_name),
                              );
                            }
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="align-middle">
                      <div className="flex justify-center">
                        <Button
                          size={"icon-sm"}
                          variant={
                            selectedModel?.model_name === model.model_name
                              ? "default"
                              : "outline"
                          }
                          className="shadow-xs"
                          onClick={() => onSelectModel(model)}
                        >
                          <Info />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No models found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
