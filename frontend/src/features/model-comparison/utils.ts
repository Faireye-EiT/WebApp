import { DemographicMetrics, ModelData } from "@/features/model-ranking/types";
import { ChartConfig } from "~/components/ui/chart";
import { ChartData } from "./components/model-comparison-chart";
import { DEMOGRAPHIC_KEYS } from "./const";
import {
  AvailabilityCategory,
  ModelComparisonTableEntry,
  PriceCategory,
} from "./types";

export function buildComparisonData(
  modelsData: ModelData[],
  selectedModels: string[],
): ModelData[] {
  return modelsData.filter((model) =>
    selectedModels.includes(model.model_name),
  );
}

export function buildChartData(comparisonData: ModelData[]): {
  chartData: ChartData[];
  chartConfig: ChartConfig;
} {
  if (comparisonData.length === 0) return { chartData: [], chartConfig: {} };

  // Generate Chart Configuration (Colors & Labels)
  const chartConfig: ChartConfig = comparisonData.reduce<ChartConfig>(
    (config, model, index) => {
      config[model.model_name] = {
        label: model.model_name,
        color: `var(--chart-${(index % 5) + 1})`,
      };
      return config;
    },
    {},
  );

  // Build "Overall" metric data point
  const overallMetric: ChartData = { metric: "Overall" };
  comparisonData.forEach((model) => {
    overallMetric[model.model_name] = model.equalized_odds_ratio;
  });

  // Build demographic metric data points
  const demographicMetrics: ChartData[] = DEMOGRAPHIC_KEYS.map((demo) => {
    const dataPoint: ChartData = { metric: demo.label };

    comparisonData.forEach((model) => {
      const demographics = model[
        demo.key as keyof ModelData
      ] as DemographicMetrics;
      dataPoint[model.model_name] = demographics?.group_accuracy ?? 0;
    });

    return dataPoint;
  });

  // Combine datasets
  const chartData = [overallMetric, ...demographicMetrics];

  return { chartData, chartConfig };
}

export function buildComparisonTableData(
  comparisonData: ModelData[],
): ModelComparisonTableEntry[] {
  return comparisonData.map((model) => {
    const isFree =
      model.price === "$0.00" || model.price === "Free" || model.price === "$0";

    return {
      rank: model.rank,
      name: model.model_name,
      company: model?.company ?? "",
      companyUrl: model?.companyUrl ?? "#",
      releaseDate: model?.releaseDate ?? "",
      price: isFree ? "Free" : "Paid",
      availability: (model?.availability as AvailabilityCategory) ?? "N/A",
      score: model.equalized_odds_ratio,
    };
  });
}
