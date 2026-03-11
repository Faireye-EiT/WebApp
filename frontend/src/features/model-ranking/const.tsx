import {
  Claude,
  DeepSeek,
  Gemini,
  Gemma,
  Grok,
  HuggingFace,
  Mistral,
  Ollama,
  OpenAI,
  Qwen,
} from "@lobehub/icons";

export const RANK_MEDALS: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

export const MEDAL_COLORS = {
  1: {
    block: "bg-podium-gold border-podium-gold-border",
    label: "text-podium-gold-label",
    badge: "bg-podium-gold-badge text-podium-gold-label",
  },
  2: {
    block: "bg-podium-silver border-podium-silver-border",
    label: "text-podium-silver-label",
    badge: "bg-podium-silver-badge text-podium-silver-label",
  },
  3: {
    block: "bg-podium-bronze border-podium-bronze-border",
    label: "text-podium-bronze-label",
    badge: "bg-podium-bronze-badge text-podium-bronze-label",
  },
};

export const MODEL_LOGO_MAP = [
  [["chatgpt", "openai"], <OpenAI key="openai" />],
  [["claude"], <Claude.Color key="claude" />],
  [["gemini"], <Gemini.Color key="gemini" />],
  [["grok"], <Grok key="grok" />],
  [["deepseek"], <DeepSeek.Color key="deepseek" />],
  [["gemma"], <Gemma.Color key="gemma" />],
  [["smollm"], <HuggingFace.Color key="huggingface" />],
  [["llama"], <Ollama key="ollama" />],
  [["ministral"], <Mistral.Color key="ministral" />],
  [["qwen"], <Qwen.Color key="qwen" />],
];
