"use client";

import { motion } from "framer-motion";
import { ChartNoAxesColumn, House, Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "./ui/BrandMark";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: House },
  { href: "/rankings", label: "Rankings", icon: ChartNoAxesColumn },
  { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-8 max-w-7xl mx-auto relative">
        {/* Nav Pill - Visible on all screens */}
        <nav className="flex items-center gap-1 rounded-lg border bg-background/50 p-1 shadow-sm backdrop-blur">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            // Using template literals instead of cn()
            const linkClass = `relative flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass}
                onClick={() => console.log("hello")}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md bg-secondary"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
                <span className="relative z-10">
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* BrandMark - Centered absolute on all screens */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className="flex items-center gap-2">
            <BrandMark className="text-xl" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
