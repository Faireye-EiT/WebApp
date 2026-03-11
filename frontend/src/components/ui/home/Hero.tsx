import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

function Hero() {
  return (
    <div className="mb-12">
      <h2 className="text-6xl font-bold mb-8 leading-tight">
        Making AI Fairness
        <br />
        Visible to Everyone
      </h2>

      <div className="flex items-center gap-4">
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
  );
}

export default Hero;
