import { FAQ_ITEMS } from "./home-content";

function FaqSection() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
        Frequently Asked Questions
      </p>
      <h3 className="mb-6 text-2xl font-bold text-slate-900">
        Quick Answers Before You Dive In
      </h3>
      <div className="space-y-4">
        {FAQ_ITEMS.map((item) => (
          <article
            key={item.q}
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
          >
            <h4 className="mb-2 text-base font-semibold text-slate-900">
              {item.q}
            </h4>
            <p className="text-sm leading-relaxed text-slate-600">{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FaqSection;
