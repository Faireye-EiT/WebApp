import { useAlternateTab } from "@/context/alternate-tab";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <div className="max-h-64 overflow-y-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-16 text-center">Rank</TableHead>
            <TableHead>Model</TableHead>
            <TableHead className="text-right pr-2">{sortBy}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-80">
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
                  className={`cursor-pointer hover:bg-zinc-100 ${isTop3 ? "bg-muted/30 font-medium" : ""}`}
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
                    {Math.round(entry.score * 100)}%
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
  );
}
