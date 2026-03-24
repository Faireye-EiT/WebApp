import BrandMark from "~/components/ui/BrandMark";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

function Footer({ onScrollToTop }: { onScrollToTop?: () => void }) {
  return (
    <footer className="max-w-7xl mx-auto px-8 py-12 flex items-center justify-between">
      <div>
        <Link href="/">
          <BrandMark className="text-2xl mb-4" />
        </Link>
      </div>

      {onScrollToTop && (
        <button
          onClick={onScrollToTop}
          className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-lg"
          aria-label="Scroll to top"
          type="button"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  );
}

export default Footer;
