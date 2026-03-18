"use client";

import { ModelComparison } from "@/features/model-comparison/components/model-comparison";
import { ModelRanking } from "@/features/model-ranking/components/model-ranking";
import { ModelData } from "@/features/model-ranking/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAlternateTab } from "~/context/alternate-tab";
import { ModelInfo } from "~/features/model-info/components/model-info";
import Footer from "~/components/ui/Footer";

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
    <div>
      <main className="h-full flex items-center justify-center bg-background p-8">
        <div className="flex gap-4 flex-col md:flex-row">
          {modelsData && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ModelRanking
                  modelsData={modelsData}
                  comparisonsOpen={alternateTab === "comparisons"}
                  setSelectedModel={setSelectedModel}
                />
              </motion.div>

              <AnimatePresence mode="wait">
                {alternateTab === "comparisons" && (
                  <motion.div key="comparisons" {...panelVariants}>
                    <ModelComparison modelsData={modelsData} />
                  </motion.div>
                )}
                {alternateTab === "info" && selectedModel && (
                  <motion.div key="info" {...panelVariants}>
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
