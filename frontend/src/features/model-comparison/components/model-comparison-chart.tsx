"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
} from "recharts";
import { useState } from "react";

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
  const VISUALIZATIONS = ["radar", "bar"] as const;
  type Visualization = (typeof VISUALIZATIONS)[number];
  const [view, setView] = useState<Visualization>("radar");
  const data = buildChartData(comparisonData);
  const chartData: ChartData[] = data.chartData;
  const chartConfig: ChartConfig = data.chartConfig;

  return (
    <Card className="relative h-full flex-1 shrink py-0">
      {/* Floating toggle button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          aria-label="Toggle visualization"
          className="bg-background/90 hover:bg-background px-2 py-1 rounded-md shadow-md text-sm"
          onClick={() => {
            const idx = VISUALIZATIONS.indexOf(view);
            const next = VISUALIZATIONS[(idx + 1) % VISUALIZATIONS.length];
            setView(next);
          }}
        >
          {view.toUpperCase()}
        </button>
      </div>

      <CardContent className="p-4 h-full">
        {chartData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto h-full overflow-hidden"
          >
            {view === "radar" ? (
              <RadarChart data={chartData} className="h-full w-full">
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
            ) : (
              <BarChart
                data={chartData}
                className="h-full w-full"
                margin={{ top: 8, right: 40, left: 12, bottom: 8 }}
                barCategoryGap="25%"
                barGap={6}
              >
                <ReTooltip />
                <XAxis
                  dataKey="metric"
                  interval={0}
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis
                  domain={[0, 1]}
                  tickFormatter={(v) => `${Math.round(Number(v) * 100)}%`}
                />
                {Object.keys(chartConfig).length !== 0 &&
                  Object.keys(chartConfig).map((key) => {
                    const cfg = chartConfig[key];
                    const rawLabel = cfg?.label;
                    const name = typeof rawLabel === "string" ? rawLabel : key;

                    return (
                      <Bar
                        key={key}
                        dataKey={key}
                        name={name}
                        fill={cfg.color}
                        maxBarSize={64}
                      />
                    );
                  })}
              </BarChart>
            )}
          </ChartContainer>
        ) : (
          <div className="mx-auto w-full " />
        )}
      </CardContent>
    </Card>
  );
}
