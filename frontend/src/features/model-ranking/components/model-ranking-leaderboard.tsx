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

export interface ModelLeaderboardProps {
  modelsData: ModelData[];
  rankingData: ModelRankingEntry[];
  sortBy: SortByOption;
  sortDirection: SortDirection;
  setSelectedModel: (model: ModelData) => void;
}

export function ModelLeaderboard({
  modelsData,
  rankingData,
  sortBy,
  sortDirection,
  setSelectedModel,
}: ModelLeaderboardProps) {
  const { setAlternateTab } = useAlternateTab();
  const onRowClick = (model: ModelData) => {
    setSelectedModel(model);
    setAlternateTab("info");
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
                    className={`cursor-pointer transition-colors hover:bg-slate-50 h-11.25 `}
                    onClick={() => onRowClick(model)}
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
                        {Math.round(entry.score * 100)}%
                      </span>
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
