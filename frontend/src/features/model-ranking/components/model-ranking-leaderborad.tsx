import { useAlternateTab } from "~/context/alternate-tab";
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { RANK_MEDALS } from "../const";
import { ModelData } from "../types";

export interface ModelLeaderboardProps {
  modelsData: ModelData[];
  setSelectedModel: (model: ModelData) => void;
}

export function ModelLeaderboard({
  modelsData,
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
            <TableHead className="text-right pr-2">Fairness Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-80">
          {modelsData && modelsData.length > 0 ? (
            modelsData.map((model) => {
              const rank = model.rank;
              const isTop3 = rank <= 3;
              return (
                <TableRow
                  key={model.model_name}
                  className={isTop3 ? "bg-muted/30 font-medium" : ""}
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
                      {model.model_name}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.round(model.global_accuracy * 100)}%
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
