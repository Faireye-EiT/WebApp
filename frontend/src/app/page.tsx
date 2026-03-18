"use client";

import Footer from "~/components/ui/Footer";
import FairnessAndUseCasesSection from "~/components/ui/home/FairnessAndUseCasesSection";
import FaqSection from "~/components/ui/home/FaqSection";
import FeatureGrid from "~/components/ui/home/FeatureGrid";
import Hero from "~/components/ui/home/Hero";
import HomeCtaSection from "~/components/ui/home/HomeCtaSection";
import HowItWorksSection from "~/components/ui/home/HowItWorksSection";
import SectionCard from "~/components/ui/home/SectionCard";

export default function HomePage() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const problem =
    "As of now, there are more than 1 billion people that uses AI. Many people are heavily relying on the AI models with no regard for limitations the model might have. The problem is that the AI models inherits biasness against different sensitive groups for example (in gender, ethnicity, races etc). There is a lack of transparency that makes it hard to trust the AI model. Although, there has been some current fairness evaluation tools but they are too technical and complex to understand to non-technical people. Non- technical users have no simple way to understand and judge whether an AI model is ethical or fair or not.";

  const solution =
    "We have created this website where you can easily visualize fairness evaluations across AI models. You can inspect fairness outcomes across sensitive groups and compare models side by side to support more informed, responsible choices.";

  return (
    <div className="min-h-screen">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <Hero />
        <FeatureGrid />

        <SectionCard
          title="Problem"
          body={problem}
          id="problem-info-card"
          className="mt-12 scroll-mt-24 lg:mt-20"
        />

        <SectionCard title="Solution" body={solution} />

        <HowItWorksSection />
        <FairnessAndUseCasesSection />
        <FaqSection />
        <HomeCtaSection />
      </main>

      <Footer onScrollToTop={scrollToTop} />
    </div>
  );
}
