import { createContext, useContext } from "react";

export type AlternateTabState = "comparisons" | "info" | "none";

export const AlternateTabContext = createContext<{
  alternateTab: AlternateTabState;
  setAlternateTab: (
    val: (prev: AlternateTabState) => AlternateTabState,
  ) => void;
}>({
  alternateTab: "none",
  setAlternateTab: () => {},
});

export const useAlternateTab = () => {
  const context = useContext(AlternateTabContext);
  if (!context) {
    throw new Error(
      "useAlternateTab must be used within an AlternateTabProvider",
    );
  }
  return context;
};
