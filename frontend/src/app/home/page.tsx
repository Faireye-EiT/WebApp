"use client";

import Header from "~/components/ui/Header";
import Footer from "~/components/ui/Footer";

export default function HomePage() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Header />
      <div className="h-1000"></div>
      <Footer onScrollToTop={scrollToTop} />
    </>
  );
}
