import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

function Hero() {
  return (
    <section className="relative mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-br from-white via-blue-50/60 to-sky-100/70 p-6 shadow-sm sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.2),transparent_40%),radial-gradient(circle_at_85%_65%,rgba(14,165,233,0.22),transparent_42%)] opacity-35" />
      <div className="pointer-events-none absolute -right-20 -top-16 h-80 w-80 bg-[url('/globe.svg')] bg-contain bg-no-repeat opacity-25" />
      <div className="pointer-events-none absolute -left-12 -bottom-18 h-56 w-56 rounded-full bg-blue-200/30 blur-2xl" />

      <div className="relative z-10 max-w-3xl">
        <h2 className="mb-8 text-4xl leading-tight font-bold text-slate-900 sm:text-5xl lg:text-6xl">
          Making AI Fairness
          <br />
          Visible to Everyone
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/rankings">
            <PrimaryButton icon={ArrowRight}>See Rankings</PrimaryButton>
          </Link>

          <SecondaryButton
            icon={ArrowDown}
            onClick={() => (location.href = "#problem-info-card")}
          >
            Learn more
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}

export default Hero;
