"use client";
import {
  BadgeQuestionMark,
  ChartNoAxesColumn,
  House,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import BrandMark from "./BrandMark";
import IconNavButton from "./IconNavButton";

function Header() {
  const path = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-8 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {/* Mobile */}
        <Sheet>
          {/* Burger menu for opening sheet*/}
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </Button>
            }
          />

          {/* Actual Sheet */}
          <SheetContent side="left" className="w-72">
            <nav className="flex flex-col gap-3 mt-6 ml-2">
              <Link className="flex items-center gap-3" href="/">
                <IconNavButton
                  icon={House}
                  label="Home"
                  active={path === "/"}
                />
                <span className="text-base font-medium">Home</span>
              </Link>

              <Link className="flex items-center gap-3" href="/rankings">
                <IconNavButton
                  icon={ChartNoAxesColumn}
                  label="Rankings"
                  active={path === "/rankings"}
                />
                <span className="text-base font-medium">Rankings</span>
              </Link>

              <Link className="flex items-center gap-3" href="/about">
                <IconNavButton
                  icon={BadgeQuestionMark}
                  label="About"
                  active={path === "/about"}
                />
                <span className="text-base font-medium">About</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/">
            <IconNavButton icon={House} label="Home" active={path === "/"} />
          </Link>
          <Link href="/rankings">
            <IconNavButton
              icon={ChartNoAxesColumn}
              label="Rankings"
              active={path === "/rankings"}
            />
          </Link>
          <Link href="/about">
            <IconNavButton
              icon={BadgeQuestionMark}
              label="About"
              active={path === "/about"}
            />
          </Link>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/">
          <BrandMark className="text-3xl" />
        </Link>
      </div>

      <div className="w-[132px]" aria-hidden="true" />
    </header>
  );
}

export default Header;
