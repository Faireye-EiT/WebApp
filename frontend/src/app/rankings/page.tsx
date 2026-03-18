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
      <main className="relative flex h-full w-full items-center justify-center overflow-hidden bg-background px-4 py-6 md:px-6 md:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(59,130,246,0.12),transparent_34%),radial-gradient(circle_at_90%_76%,rgba(14,165,233,0.1),transparent_32%)]" />

        <div className="relative z-10 mx-auto w-full max-w-360">
          <section className="mb-4 rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Fairness Explorer
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-700 sm:text-base">
                Compare models, inspect tradeoffs, and choose with clearer
                fairness evidence.
              </p>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {modelsData.length} models loaded
              </span>
            </div>
          </section>

          <div
            className={`mx-auto flex w-full min-w-0 flex-col gap-4 lg:flex-row ${
              noAlternatePanelOpen ? "lg:justify-center" : ""
            }`}
          >
            {modelsData && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full w-full min-w-0 space-y-8 rounded-3xl border border-slate-200/90 bg-white/90 p-4 shadow-[0_20px_60px_-34px_rgba(15,23,42,0.5)] backdrop-blur-sm md:p-5 lg:max-w-140"
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
        </div>
      </main>
      <Footer onScrollToTop={scrollToTop} />
    </div>
  );
}
