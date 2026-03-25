import { ArrowUp } from "lucide-react";
import Link from "next/link";
import BrandMark from "~/components/ui/BrandMark";
import { Button } from "./button";

function Footer({ onScrollToTop }: { onScrollToTop?: () => void }) {
  return (
    <footer className="max-w-7xl mx-auto px-8 py-12 flex items-center justify-between">
      <div>
        <Link href="/">
          <BrandMark className="text-2xl mb-4" />
        </Link>
      </div>

      {onScrollToTop && (
        <Button
          size={"icon-lg"}
          onClick={onScrollToTop}
          className="p-4 bg-blue-500 size-12 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
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
