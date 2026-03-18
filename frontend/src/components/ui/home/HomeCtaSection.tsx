import Link from "next/link";

function HomeCtaSection() {
  return (
    <section className="rounded-3xl border border-blue-200 bg-linear-to-r from-blue-50 via-white to-sky-50 p-6 shadow-sm sm:p-8">
      <h3 className="mb-2 text-2xl font-bold text-slate-900">
        Ready To Compare Models?
      </h3>
      <p className="mb-5 max-w-3xl text-slate-600 leading-relaxed">
        Start with rankings for a quick overview, then compare up to 3 models to
        understand where fairness differs across demographic groups.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/rankings"
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          View Rankings
        </Link>
        <a
          href="#problem-info-card"
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Revisit Problem Statement
        </a>
      </div>
    </section>
  );
}

export default HomeCtaSection;
