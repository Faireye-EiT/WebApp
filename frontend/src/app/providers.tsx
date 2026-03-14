"use client";

import React from "react";
import { AlternateTabProvider } from "~/context/alternate-tab";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AlternateTabProvider>{children}</AlternateTabProvider>;
}
