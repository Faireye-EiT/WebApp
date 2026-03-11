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
          <span
            className={
              isFree
                ? "bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase"
                : "bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase"
            }
          >
            {isFree ? "Free" : "Paid"}
          </span>
        )}
        {model.availability && (
          <span
            className={
              isOpenSource
                ? "bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase"
                : "bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase"
            }
          >
            {isOpenSource ? "Open-Source" : "Closed-Source"}
          </span>
        )}
      </div>
    </div>
  );
}
