"use client";

import { ChartNoAxesColumn, House, Info, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import BrandMark from "./BrandMark";
import IconNavButton from "./IconNavButton";

function Header() {
  const [active, setActive] = useState("home");

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
              <div className="flex items-center gap-3">
                <IconNavButton icon={House} label="Home" />
                <span className="text-base font-medium">Home</span>
              </div>

              <div className="flex items-center gap-3">
                <IconNavButton icon={ChartNoAxesColumn} label="Rankings" />
                <span className="text-base font-medium">Rankings</span>
              </div>

              <div className="flex items-center gap-3">
                <IconNavButton icon={Info} label="About" />
                <span className="text-base font-medium">About</span>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <IconNavButton
            icon={House}
            label="Home"
            active={active === "home"}
            onClick={() => setActive("home")}
          />
          <IconNavButton
            icon={ChartNoAxesColumn}
            label="Rankings"
            active={active === "rankings"}
            onClick={() => setActive("rankings")}
          />
          <IconNavButton
            icon={Info}
            label="About"
            active={active === "about"}
            onClick={() => setActive("about")}
          />
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
