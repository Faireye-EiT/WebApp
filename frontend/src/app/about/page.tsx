import type { Metadata } from "next";
import { AboutPage } from "~/features/about/components/about-page";

export const metadata: Metadata = {
  title: "About | FAIREYE",
  description: "Learn how FAIREYE evaluates bias and fairness across AI models.",
};

export default function Page() {
  return <AboutPage />;
}
