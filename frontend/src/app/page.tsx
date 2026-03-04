"use client";

import Footer from "~/components/ui/Footer";
import Hero from "~/components/ui/home/Hero";
import FeatureGrid from "~/components/ui/home/FeatureGrid";
import SectionCard from "~/components/ui/home/SectionCard";

export default function HomePage() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const problem =
    "As of now, there are more than 1 billion people that uses AI. Many people are heavily relying on the AI models with no regard for limitations the model might have. The problem is that the AI models inherits biasness against different sensitive groups for example (in gender, ethnicity, races etc). There is a lack of transparency that makes it hard to trust the AI model. Although, there has been some current fairness evaluation tools but they are too technical and complex to understand to non-technical people. Non- technical users have no simple way to understand and judge whether an AI model is ethical or fair or not.";

  const solution =
    "We have created this website where you can easily visualize the different AI models fairness evaluations. You can see the different fairness evaluations for different sensitive groups for example (in gender, ethnicity, races etc). You can compare different AI models and decide which ones you would prefer.";

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-8 py-12">
        <Hero />
        <FeatureGrid />

        <SectionCard title="Problem" body={problem} />

        <SectionCard title="Solution" body={solution} />
      </main>

      <Footer onScrollToTop={scrollToTop} />
    </div>
  );
}
