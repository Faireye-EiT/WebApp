"use client";

import { ModelComparison } from "@/features/model-comparison/components/model-comparison";
import { ModelRanking } from "@/features/model-ranking/components/model-ranking";
import { ModelData } from "@/features/model-ranking/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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
      try {
        const response = await fetch("/api/models/results");
        if (response.ok) {
          const json = await response.json();
          setModelsData(json.modelsData);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative h-auto min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col px-4 py-6 md:px-6 md:py-8 overflow-visible bg-sky-50/80">
      <div className="w-full flex-1 bg-transparent overflow-visible lg:overflow-hidden lg:pb-8">
        <div className="mx-auto w-full max-w-6xl lg:h-full">
          {/* Desktop: two-column dashboard, Mobile: stacked sections */}
          <div
            className={`flex w-full flex-col gap-4 lg:flex-row lg:items-stretch lg:h-full ${noAlternatePanelOpen ? "lg:justify-center" : ""}`}
          >
            {/* Ranking */}
            <div
              className={`w-full ${noAlternatePanelOpen ? "lg:max-w-xl lg:mx-auto" : "lg:w-[40%]"} flex flex-col gap-4 lg:h-full`}
            >
              <div
                className={`mx-auto w-full max-w-160 lg:max-w-none h-full min-h-80 lg:min-h-0 p-4 flex-1 lg:overflow-auto lg:overscroll-none bg-white rounded-2xl shadow-lg border border-slate-200/90 min-w-0 ${noAlternatePanelOpen ? "" : "lg:min-w-[360px]"}`}
              >
                {modelsData && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-full w-full min-w-0 space-y-8"
                  >
                    <ModelRanking
                      modelsData={modelsData}
                      comparisonsOpen={alternateTab === "comparisons"}
                      setSelectedModel={setSelectedModel}
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Secondary panel */}
            {!noAlternatePanelOpen && (
              <div className="w-full lg:w-[60%] flex flex-col gap-4 lg:h-full min-w-0">
                <div className="mx-auto w-full max-w-160 lg:max-w-300 h-full min-h-80 lg:min-h-0 p-4 flex-1 lg:overflow-auto lg:overscroll-none bg-white rounded-2xl shadow-lg border border-slate-200/90 min-w-0 lg:min-w-[480px]">
                  <AnimatePresence mode="wait">
                    {alternateTab === "comparisons" && (
                      <motion.div
                        key="comparisons"
                        {...panelVariants}
                        className="h-full w-full min-w-0"
                      >
                        <ModelComparison modelsData={modelsData} />
                      </motion.div>
                    )}
                    {alternateTab === "info" && selectedModel && (
                      <motion.div
                        key="info"
                        {...panelVariants}
                        className="h-full w-full min-w-0"
                      >
                        <ModelInfo model={selectedModel} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
