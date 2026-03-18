"use client";
import Footer from "~/components/ui/Footer";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { testSteps } from "../data";
import { BiasAnalogyDemo } from "./bias-analogy-demo";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-3">
      <Badge
        variant="outline"
        className="rounded-full px-3 py-1 text-[11px] tracking-[0.16em]"
      >
        {eyebrow}
      </Badge>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

export function AboutPage() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-5xl px-6 py-10 md:px-8 md:py-14">
        <section className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-background via-background to-blue-50/70 px-6 py-10 shadow-sm md:px-10 md:py-14 dark:to-blue-950/20">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.16),transparent_58%)] md:block" />
          <div className="relative max-w-3xl space-y-6">
            <Badge className="rounded-full px-3 py-1 text-[11px] tracking-[0.16em]">
              ABOUT FAIREYE
            </Badge>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                What FAIREYE measures and how the score works
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                AI models are used at massive scale, but many people still have
                no clear way to tell whether those models treat different groups
                consistently. FAIREYE makes that behavior visible without
                requiring technical context.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div className="space-y-4">
            <SectionHeading
              eyebrow="BIAS"
              title='What does "AI bias" actually mean?'
              description="If two people ask effectively the same thing, a fair model should respond the same way. Bias shows up when a name, pronoun, or other group signal changes the answer."
            />
            <p className="text-sm leading-7 text-muted-foreground md:text-base">
              Models learn from huge volumes of human-written text, and those
              sources contain the same stereotypes and imbalances that exist in
              society. The result is that a model can absorb patterns it was
              never explicitly meant to learn.
            </p>
          </div>

          <Card className="border-border/70 bg-muted/20">
            <CardContent className="space-y-3 py-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Simple example
              </p>
              <p className="text-sm leading-7 text-muted-foreground">
                Imagine two people sending the same sentence to a model. If one
                sentence uses “Emily” and the other uses “Lakisha”, the answer
                should not change because of the name alone.
              </p>
              <p className="text-sm leading-7 text-muted-foreground">
                That is the core pattern FAIREYE tests for: identical meaning,
                different identity signal, then measure whether the model stays
                consistent.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6 pb-12 md:pb-16">
          <SectionHeading
            eyebrow="DEMO"
            title="A real example"
            description="We send models sentences that are identical except for one word. Reveal the outputs to see the inconsistency."
          />
          <BiasAnalogyDemo />
        </section>

        <Separator />

        <section className="space-y-8 py-12 md:py-16">
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

      <Footer onScrollToTop={scrollToTop} />
    </div>
  );
}
