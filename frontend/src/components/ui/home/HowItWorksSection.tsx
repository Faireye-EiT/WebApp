import { HOW_IT_WORKS_STEPS } from "./home-content";

function HowItWorksSection() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
          How It Works
        </p>
        <h3 className="text-2xl font-bold text-slate-900">
          A Simple Flow For Better AI Decisions
        </h3>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {HOW_IT_WORKS_STEPS.map((step) => (
          <article
            key={step.title}
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
          >
            <h4 className="mb-2 text-base font-semibold text-slate-900">
              {step.title}
            </h4>
            <p className="text-sm leading-relaxed text-slate-600">
              {step.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HowItWorksSection;
