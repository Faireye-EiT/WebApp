import { createContext, useContext, useState } from "react";

export type AlternateTabState = "comparisons" | "info" | "none";

interface AlternateTabContextProps {
  alternateTab: AlternateTabState;
  setAlternateTab: (prev: AlternateTabState) => void;
}

const AlternateTabContext = createContext<AlternateTabContextProps | undefined>(
  undefined,
);

interface AlternateTabProviderProps {
  children: React.ReactNode;
}

export const AlternateTabProvider = ({
  children,
}: AlternateTabProviderProps) => {
  const [alternateTab, setAlternateTab] = useState<AlternateTabState>("none");

  return (
    <AlternateTabContext.Provider value={{ alternateTab, setAlternateTab }}>
      {children}
    </AlternateTabContext.Provider>
  );
};

export const useAlternateTab = () => {
  const context = useContext(AlternateTabContext);
  if (!context) {
    throw new Error(
      "useAlternateTab must be used within an AlternateTabProvider",
    );
  }
  return context;
};
