import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const USE_CASES = [
  "Choosing safer default models for customer support",
  "Reviewing model options for education and public sector tools",
  "Comparing vendor claims with fairness-focused evidence",
  "Explaining model tradeoffs to non-technical stakeholders",
] as const;

const carouselItems = [
  {
    title: "Problem",
    description:
      "As of now, there are more than 1 billion people that uses AI. Many people are heavily relying on the AI models with no regard for limitations the model might have. The problem is that the AI models inherits biasness against different sensitive groups for example (in gender, ethnicity, races etc). There is a lack of transparency that makes it hard to trust the AI model. Although, there has been some current fairness evaluation tools but they are too technical and complex to understand to non-technical people. Non- technical users have no simple way to understand and judge whether an AI model is ethical or fair or not.",
  },
  {
    title: "Solution",
    description:
      "We have created this website where you can easily visualize fairness evaluations across AI models. You can inspect fairness outcomes across sensitive groups and compare models side by side to support more informed, responsible choices.",
  },
  {
    title: "use cases",
    description: (
      <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
        {USE_CASES.map((useCase) => (
          <li key={useCase}>{useCase}</li>
        ))}
      </ul>
    ),
  },
] as const;

export function HomeContentCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <>
      <Carousel
        setApi={setApi}
        plugins={[Autoplay({ delay: 5_000 })]}
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full  my-10"
      >
        <CarouselContent className="-mt-1 h-90">
          {carouselItems.map((item, idx) => (
            <CarouselItem key={item.title} className="basis-1/2 pt-1">
              <div className="p-1">
                <Card className="border-border/70 bg-muted/20">
                  <CardContent className="space-y-3 py-6 max-w-lg">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {item.title}
                    </p>
                    <div className="text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex justify-center items-center gap-2 pt-10">
        {carouselItems.map((item, idx) => (
          <span
            key={item.title}
            className={`h-1 flex-1 rounded-full transition-all duration-200 ${
              idx + 1 === current ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            style={{ minWidth: 24, maxWidth: 48 }}
          />
        ))}
      </div>
    </>
  );
}
