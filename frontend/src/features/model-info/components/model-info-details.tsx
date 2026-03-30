import { Badge } from "~/components/ui/badge";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
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

  return (
    <div className="flex flex-col gap-4 grow shrink rounded-2xl border border-slate-200 p-4">
      {/* Top row: release date + company */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        {releaseDate && <span>{releaseDate}</span>}
        {model.company && (
          <div className="flex gap-0">
            <span>Company:</span>
            {model.companyUrl ? (
              <Badge
                variant="link"
                render={
                  <Link
                    href={model.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {model.company}
                    <ArrowUpRightIcon data-icon="inline-end" />
                  </Link>
                }
              />
            ) : (
              <span className="font-medium">{model.company}</span>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      {model.summary && (
        <div className="grow shrink rounded-lg border p-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Summary: </span>
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
