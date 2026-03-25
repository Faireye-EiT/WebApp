"use client";
import FaqSection from "~/components/ui/home/FaqSection";

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto space-y-10 max-w-5xl px-6 py-10 md:px-8 md:py-14">
        <FaqSection />
      </main>
    </div>
  );
}
