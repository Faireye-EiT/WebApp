"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { ModelData } from "@/features/model-ranking/types";
import { buildChartData } from "../utils";

export interface ChartData {
  metric: string;
  [key: string]: number | string;
}

export interface ModelComparisonChartProps {
  comparisonData: ModelData[];
}

export function ModelComparisonChart({
  comparisonData,
}: ModelComparisonChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    const data = buildChartData(comparisonData);
    console.log(data);
    setChartConfig(data.chartConfig);
    setChartData(data.chartData);
  }, [comparisonData]);

  return (
    <Card>
      <CardContent className="pb-0">
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="mx-auto">
            <RadarChart data={chartData}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <PolarAngleAxis dataKey="metric" />
              <PolarGrid radialLines={true} />
              {Object.keys(chartConfig).length !== 0 &&
                Object.keys(chartConfig).map((key) => (
                  <Radar
                    key={key}
                    dataKey={key}
                    fill={chartConfig[key].color}
                    fillOpacity={0}
                    stroke={chartConfig[key].color}
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fillOpacity: 1,
                    }}
                  />
                ))}
            </RadarChart>
          </ChartContainer>
        ) : (
          <div className="mx-auto min-h-75 w-full " />
        )}
      </CardContent>
    </Card>
  );
}
