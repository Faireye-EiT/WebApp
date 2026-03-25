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

import { spiderWeb } from "@lucide/lab";
import { ChartColumn, Icon } from "lucide-react";

import { ModelData } from "@/features/model-ranking/types";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { useIsMobile } from "~/hooks/use-mobile";
import { buildChartData } from "../utils";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";

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
  type Visualization = "radar" | "bar";
  const [view, setView] = useState<Visualization>("radar");
  const isMobile = useIsMobile();
  const data = buildChartData(comparisonData);
  const chartData: ChartData[] = data.chartData;
  const chartConfig: ChartConfig = data.chartConfig;

  return (
    <div className="relative grow rounded-2xl border border-slate-200 min-h-20 flex">
      {/* Floating toggle button */}
      {chartData.length > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <ButtonGroup orientation="vertical">
            <Button
              size="icon-lg"
              variant={view === "bar" ? "default" : "outline"}
              onClick={() => {
                setView("bar");
              }}
            >
              <ChartColumn />
            </Button>
            <Button
              size="icon-lg"
              variant={view === "radar" ? "default" : "outline"}
              onClick={() => {
                setView("radar");
              }}
            >
              <Icon iconNode={spiderWeb} strokeWidth={1.5} />
            </Button>
          </ButtonGroup>
        </div>
      )}

      <div className="flex grow lg:p-4 p-2 pr-13 h-full">
        {chartData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto w-full grow overflow-hidden"
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
                  right: 12,
                  left: 0,
                  bottom: isMobile ? 20 : 8,
                }}
                barCategoryGap="20%"
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
                        maxBarSize={48}
                      />
                    );
                  })}
              </BarChart>
            )}
          </ChartContainer>
        ) : (
          <div className="mx-auto w-full min-h-56 flex items-center justify-center"></div>
        )}
      </div>
    </div>
  );
}
