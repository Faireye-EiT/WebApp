"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { useEffect, useState } from "react";

import { Card, CardContent } from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { ClassDictionary } from "clsx";

type ChartRadarProps = {
  data: Array<{
    metric: string;
    values: Array<{
      model: string;
      score: number;
    }>;
  }>;
};

export function ChartRadar({ data }: ChartRadarProps) {
  const [chartData, setChartData] = useState([
    { metric: "Overall fairness", model1: 86, model2: 60, model3: 50 },
    { metric: "Male fairness", model1: 85, model2: 70, model3: 90 },
    { metric: "Female fairness", model1: 17, model2: 80, model3: 88 },
    { metric: "European fairness", model1: 73, model2: 60, model3: 55 },
    { metric: "African-American fairness", model1: 60, model2: 90, model3: 20 },
  ]);

  const [chartConfig, setChartConfig] = useState({
    model1: {
      label: "Gemini 3 Pro",
      color: "var(--chart-3)",
    },
    model2: {
      label: "GPT 5 mini",
      color: "var(--chart-5)",
    },
    model3: {
      label: "Grok 4.1",
      color: "var(--chart-1)",
    },
  });

  useEffect(() => {
    console.log(Object.values(data));
  }, [data]);

  return (
    <Card>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto">
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="metric" />
            <PolarGrid radialLines={true} />
            {Object.keys(chartConfig).map((key) => (
              <Radar
                dataKey={key}
                fill={`var(--color-${key})`}
                fillOpacity={0}
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                dot={{
                  r: 4,
                  fillOpacity: 1,
                }}
                activeDot={{
                  r: 7,
                  fillOpacity: 1,
                }}
              />
            ))}
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function ModelComparisonChart() {
  return <div></div>;
}
