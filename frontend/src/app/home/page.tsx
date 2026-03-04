"use client";

import Header from "~/components/ui/Header";
import Footer from "~/components/ui/Footer";
import Hero from "~/components/ui/home/Hero";

export default function HomePage() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-8 py-12">
        <Hero />
      </main>

      <Footer onScrollToTop={scrollToTop} />
    </div>
  );
}
