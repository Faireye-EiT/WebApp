"use client";

import { AlertTriangle, Lightbulb } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Problem: <AlertTriangle className="w-7 h-7 text-blue-600" />,
  Solution: <Lightbulb className="w-7 h-7 text-blue-600" />,
};

const accentMap: Record<string, { pill: string; bar: string; bg: string }> = {
  Problem: {
    pill: "bg-red-50 text-red-600 border border-red-200",
    bar: "bg-red-400",
    bg: "from-red-50/40 via-white to-white",
  },
  Solution: {
    pill: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    bar: "bg-emerald-400",
    bg: "from-emerald-50/40 via-white to-white",
  },
};

function SectionCard({
  title,
  body,
  id,
  className,
}: {
  title: string;
  body: string;
  id?: string;
  className?: string;
}) {
  const accent = accentMap[title] ?? {
    pill: "bg-blue-50 text-blue-600 border border-blue-200",
    bar: "bg-blue-400",
    bg: "from-blue-50/40 via-white to-white",
  };

  const icon = iconMap[title] ?? null;

  return (
    <section
      id={id}
      className={`relative overflow-hidden rounded-3xl mb-8 border border-slate-200 shadow-sm bg-gradient-to-br ${accent.bg} ${className ?? ""}`}
    >
      {/* Decorative top accent bar */}
      <div className={`h-1 w-full ${accent.bar}`} />

      <div className="grid md:grid-cols-[auto_1fr] gap-0">
        {/* Left icon column */}
        <div className="flex items-start justify-center md:justify-start pt-10 pl-10 pr-4 pb-10">
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
              {icon}
            </div>
            {/* Vertical dotted line on md+ */}
            <div className="hidden md:block w-px flex-1 border-l-2 border-dashed border-slate-200 min-h-[60px]" />
          </div>
        </div>

        {/* Right content column */}
        <div className="pt-10 pr-10 pb-10 pl-0">
          {/* Pill label */}
          <span
            className={`inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${accent.pill}`}
          >
            {title}
          </span>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 text-balance">
            {title === "Problem"
              ? "The Bias Hidden in AI"
              : "Fairness Made Visible"}
          </h3>

          <p className="text-slate-600 leading-relaxed text-base max-w-2xl">
            {body}
          </p>

          {/* Key points */}
          {title === "Problem" && (
            <ul className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                "Inherited bias",
                "Lack of transparency",
                "No simple tools",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 bg-white/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 border border-slate-100 shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          )}

          {title === "Solution" && (
            <ul className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                "Visual evaluations",
                "Model comparisons",
                "Accessible insights",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 bg-white/80 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 border border-slate-100 shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default SectionCard;
