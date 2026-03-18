"use client";

import { ModelComparison } from "@/features/model-comparison/components/model-comparison";
import { ModelRanking } from "@/features/model-ranking/components/model-ranking";
import { ModelData } from "@/features/model-ranking/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "~/components/ui/Footer";
import { useAlternateTab } from "~/context/alternate-tab";
import { ModelInfo } from "~/features/model-info/components/model-info";

const panelVariants = {
  initial: { opacity: 0, x: 24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, easing: "easeOut" },
  },
  exit: { opacity: 0, x: 24, transition: { duration: 0.2, easing: "easeIn" } },
};

export default function ModelRankingPage() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const { alternateTab } = useAlternateTab();
  const noAlternatePanelOpen = alternateTab === "none";
  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);
  const [modelsData, setModelsData] = useState<ModelData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/models/results");
      if (response.ok) {
        const json = await response.json();
        setModelsData(json.modelsData);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-dvh overflow-x-hidden">
      <main className="flex h-full w-full items-center justify-center bg-background px-4 py-6 md:px-6 md:py-8">
        <div
          className={`mx-auto flex w-full max-w-360 min-w-0 flex-col gap-4 lg:flex-row ${
            noAlternatePanelOpen ? "lg:justify-center" : ""
          }`}
        >
          {modelsData && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full w-full min-w-0 space-y-8 rounded-xl border-2 p-4 lg:max-w-140"
              >
                <ModelRanking
                  modelsData={modelsData}
                  comparisonsOpen={alternateTab === "comparisons"}
                  setSelectedModel={setSelectedModel}
                />
              </motion.div>

              <AnimatePresence mode="wait">
                {alternateTab === "comparisons" && (
                  <motion.div
                    key="comparisons"
                    {...panelVariants}
                    className="w-full min-w-0"
                  >
                    <ModelComparison modelsData={modelsData} />
                  </motion.div>
                )}
                {alternateTab === "info" && selectedModel && (
                  <motion.div
                    key="info"
                    {...panelVariants}
                    className="w-full min-w-0"
                  >
                    <ModelInfo model={selectedModel} />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </main>
      <Footer onScrollToTop={scrollToTop} />
    </div>
  );
}
