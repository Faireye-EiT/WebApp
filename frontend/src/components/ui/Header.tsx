"use client";
import { ChartNoAxesColumn, House, Info, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import BrandMark from "./BrandMark";
import IconNavButton from "./IconNavButton";

function Header() {
  const path = usePathname();
  useEffect(() => {
    console.log("Current path:", path);
  }, [path]);

  return (
    <header className="flex items-center justify-between px-8 py-6 relative">
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
                  icon={Info}
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
              icon={Info}
              label="About"
              active={path === "/about"}
            />
          </Link>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <BrandMark className="text-3xl" />
      </div>

      <div className="w-[132px]" aria-hidden="true" />
    </header>
  );
}

export default Header;
