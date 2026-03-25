"use client";
import { Badge } from "@/components/ui/badge";
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
    <div className="overflow-hidden h-39">
      <div className="rounded-2xl border border-slate-200">
        <div className="overscroll-none">
          <Table
            className={
              comparisonData.length === 0 ? "opacity-0" : "opacity-100"
            }
          >
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Color</TableHead>
                <TableHead>Model</TableHead>
                <TableHead className="w-16 text-center">Company</TableHead>
                <TableHead className="w-16 text-center">Release Date</TableHead>
                <TableHead className="w-16 text-center">Price</TableHead>
                <TableHead className="w-16 text-center">Availability</TableHead>
                <TableHead className="text-right pr-2">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((model, index) => {
                const chartIndex = (index % 3) + 1;
                return (
                  <TableRow key={model.name}>
                    <TableCell className="align-middle">
                      <div className="flex justify-center">
                        <div
                          className="border rounded-[4px] w-5 h-5"
                          style={{
                            backgroundColor: `var(--chart-${chartIndex})`,
                          }}
                        />
                      </div>
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
                      <span>{model.releaseDate.slice(0, 7)}</span>
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
        </div>
      </div>
    </div>
  );
}
