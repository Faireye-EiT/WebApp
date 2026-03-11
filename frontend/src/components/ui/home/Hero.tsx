import Link from "next/link";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { ArrowRight, ArrowDown } from "lucide-react";

function Hero() {
  return (
    <div className="mb-12">
      <h2 className="text-6xl font-bold mb-8 leading-tight">
        Making AI Fairness
        <br />
        Visible to Everyone
      </h2>

      <div className="flex items-center gap-4">
        <Link href={"/rankings"}>
          <PrimaryButton icon={ArrowRight}>See Rankings</PrimaryButton>
        </Link>
        <Link href={"/#problem-section"}>
          <SecondaryButton icon={ArrowDown}>Learn more</SecondaryButton>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
