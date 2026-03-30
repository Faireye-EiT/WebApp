"use client";

import React from "react";
import { AlternateTabProvider } from "~/context/alternate-tab";
import { TooltipProvider } from "~/components/ui/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <AlternateTabProvider>{children}</AlternateTabProvider>
    </TooltipProvider>
  );
}
