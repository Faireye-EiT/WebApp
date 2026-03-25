import { ArrowUp } from "lucide-react";
import Link from "next/link";
import BrandMark from "~/components/ui/BrandMark";
import { Button } from "./button";

function Footer({ scrollable = true }: { scrollable?: boolean }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <footer className="max-w-7xl mx-auto px-8 py-12 flex items-center justify-between">
      <div>
        <Link href="/">
          <BrandMark className="text-2xl mb-4" />
        </Link>
      </div>

      {scrollable && (
        <Button
          size="lg"
          onClick={scrollToTop}
          className="p-4 py-7 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-lg"
          aria-label="Scroll to top"
          type="button"
        >
          <ArrowUp className="size-6" />
        </Button>
      )}
    </footer>
  );
}

export default Footer;
