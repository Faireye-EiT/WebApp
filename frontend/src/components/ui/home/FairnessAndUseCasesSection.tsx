import { FAIRNESS_CONTEXT, USE_CASES } from "./home-content";

function FairnessAndUseCasesSection() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
          Fairness Context
        </p>
        <h3 className="mb-4 text-2xl font-bold text-slate-900">
          What Fairness Means Here
        </h3>
        <p className="mb-4 text-slate-600 leading-relaxed">
          {FAIRNESS_CONTEXT.intro}
        </p>
        <p className="text-slate-600 leading-relaxed">
          {FAIRNESS_CONTEXT.detail}
        </p>
      </article>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
          Real-World Use Cases
        </p>
        <h3 className="mb-4 text-2xl font-bold text-slate-900">
          Where This Helps Most
        </h3>
        <ul className="space-y-3">
          {USE_CASES.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export default FairnessAndUseCasesSection;
