import { CategoryMetrics, ModelData } from "@/features/model-ranking/types";
import { ChartConfig } from "~/components/ui/chart";
import { ChartData } from "./components/model-comparison-chart";
import { CATEGORY_KEYS } from "./const";
import { AvailabilityCategory, ModelComparisonTableEntry } from "./types";

export function buildComparisonData(
  modelsData: ModelData[],
  selectedModels: string[],
): ModelData[] {
  return modelsData
    .filter((model) => selectedModels.includes(model.model_name))
    .sort((a, b) => modelsData.indexOf(a) - modelsData.indexOf(b));
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
        color: `var(--chart-${(index % 3) + 1})`,
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

  // Build category metric data points
  const categoryMetrics: ChartData[] = CATEGORY_KEYS.map((category) => {
    const dataPoint: ChartData = { metric: category.label };

    comparisonData.forEach((model) => {
      const categories = model[
        category.key as keyof ModelData
      ] as CategoryMetrics;
      dataPoint[model.model_name] = categories.equalized_odds_ratio;
    });

    return dataPoint;
  });

  // Combine datasets
  const chartData = [overallMetric, ...categoryMetrics];

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
