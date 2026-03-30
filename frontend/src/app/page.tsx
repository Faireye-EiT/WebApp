"use client";

import { HomeContentCarousel } from "~/components/home-content-carousel";
import { SectionHeading } from "~/components/section-heading";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import Footer from "~/components/ui/Footer";
import FeatureGrid from "~/components/ui/home/FeatureGrid";
import Hero from "~/components/ui/home/Hero";
import { BiasAnalogyDemo } from "~/features/about/components/bias-analogy-demo";
import { testSteps } from "~/features/about/data";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto space-y-10 flex w-full max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <Hero />
        <FeatureGrid />

        <section className="space-y-6" id="about">
          <SectionHeading
            eyebrow="ABOUT"
            title="What FAIREYE measures and how the score works"
            description={`AI models are used at massive scale, but many people still have
                no clear way to tell whether those models treat different groups
                consistently. FAIREYE makes that behavior visible without
                requiring technical context.`}
          />
          <HomeContentCarousel />
        </section>

        <section className="space-y-6 ">
          <SectionHeading
            eyebrow="DEMO"
            title="A real example"
            description="We send models sentences that are identical except for one word. Reveal the outputs to see the inconsistency."
          />
          <BiasAnalogyDemo />
        </section>
        <section className="space-y-8">
          <SectionHeading
            eyebrow="METHOD"
            title="How FAIREYE tests models"
            description="The process is straightforward: generate controlled pairs, ask the same question for each one, and score how often the model stays consistent."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {testSteps.map(({ step, title, text, icon: Icon }) => (
              <Card key={step} className="border-border/70">
                <CardContent className="space-y-4 py-6">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="rounded-full px-2.5 py-1"
                    >
                      Step {step}
                    </Badge>
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold">{title}</h3>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
