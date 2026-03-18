"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ModelData } from "@/features/model-ranking/types";
import { Button } from "~/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { useIsMobile } from "~/hooks/use-mobile";
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
  const isMobile = useIsMobile();
  const data = buildChartData(comparisonData);
  const chartData: ChartData[] = data.chartData;
  const chartConfig: ChartConfig = data.chartConfig;

  return (
    <Card className="relative w-full h-full flex-1 shrink py-0">
      {/* Floating toggle button */}
      <div className="z-10 text-end me-2 mt-2">
        <Button
          aria-label="Toggle visualization"
          variant={"secondary"}
          title="Toggle chart mode"
          className={"hover:bg-zinc-200"}
          onClick={() => {
            const idx = VISUALIZATIONS.indexOf(view);
            const next = VISUALIZATIONS[(idx + 1) % VISUALIZATIONS.length];
            setView(next);
          }}
        >
          {view.toUpperCase()}
        </Button>
      </div>

      <CardContent className="p-0 lg:p-4 h-full">
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
                margin={{
                  top: 8,
                  right: isMobile ? 8 : 24,
                  left: isMobile ? 0 : 8,
                  bottom: isMobile ? 44 : 8,
                }}
                barCategoryGap="25%"
                barGap={6}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <XAxis
                  dataKey="metric"
                  interval={0}
                  angle={isMobile ? -30 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 62 : undefined}
                  tickMargin={isMobile ? 10 : 0}
                  tick={{ fontSize: isMobile ? 11 : 12 }}
                  padding={{
                    left: isMobile ? 8 : 20,
                    right: isMobile ? 8 : 20,
                  }}
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
