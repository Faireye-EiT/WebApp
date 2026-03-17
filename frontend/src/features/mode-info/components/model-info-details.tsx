import { Badge } from "~/components/ui/badge";
import { ModelData } from "~/features/model-ranking/types";

interface ModelInfoDetailsProps {
  model: ModelData;
}

function formatReleaseDate(dateStr?: string) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

export function ModelInfoDetails({ model }: ModelInfoDetailsProps) {
  const releaseDate = formatReleaseDate(model.releaseDate);
  const isFree =
    model.price === "$0.00" || model.price === "Free" || model.price === "$0";
  const isOpenSource = model.availability?.toLowerCase().includes("open");

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Model Details</h3>
      {/* Top row: release date + company */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        {releaseDate && <span>Release date: {releaseDate}</span>}
        {model.company &&
          (model.companyUrl ? (
            <a
              href={model.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Company: {model.company}
            </a>
          ) : (
            <span>Company: {model.company}</span>
          ))}
      </div>

      {/* Summary */}
      {model.summary && (
        <div className="rounded-lg border p-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">LLM summary: </span>
          {model.summary}
        </div>
      )}

      {/* Badges */}
      <div className="flex gap-2">
        {isFree !== null && (
          <Badge
            variant="secondary"
            className={
              isFree
                ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
            }
          >
            {isFree ? "Free" : "Paid"}
          </Badge>
        )}
        {model.availability && (
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
        )}
      </div>
    </div>
  );
}
