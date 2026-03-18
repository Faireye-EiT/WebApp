"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { ModelComparisonTableEntry } from "../types";

export interface ModelComparisonTableProps {
  comparisonData: ModelComparisonTableEntry[];
}

export function ModelComparisonTable({
  comparisonData,
}: ModelComparisonTableProps) {
  return (
    <Card className="w-full min-w-0 py-0">
      <CardContent className="min-h-43.75 max-h-full min-w-0 overflow-x-auto overflow-y-auto p-0">
        <Table
          className={comparisonData.length === 0 ? "opacity-0" : "opacity-100"}
        >
          <TableHeader>
            <TableRow>
              <TableHead className="w-16 text-center">Rank</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="w-16 text-center">Company</TableHead>
              <TableHead className="w-16 text-center">Release Date</TableHead>
              <TableHead className="w-16 text-center">Price</TableHead>
              <TableHead className="w-16 text-center">Availability</TableHead>
              <TableHead className="text-right pr-2">Fairness Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonData.map((model) => {
              return (
                <TableRow key={model.name}>
                  <TableCell className="text-center">
                    <span className="text-lg">{model.rank}</span>
                  </TableCell>
                  <TableCell>
                    <span>{model.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="link"
                      render={
                        <Link href={model.companyUrl}>
                          {model.company}
                          <ArrowUpRightIcon data-icon="inline-end" />
                        </Link>
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <span>{model.releaseDate}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        model.price === "Free"
                          ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                          : model.price === "Paid"
                            ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                            : ""
                      }
                    >
                      {model.price}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        model.availability === "Website Chatbot"
                          ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                          : model.availability === "Self-Host"
                            ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                            : model.availability === "API Access"
                              ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                              : ""
                      }
                    >
                      {model.availability}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.round(model.score * 100)}%
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
