export const HOW_IT_WORKS_STEPS = [
  {
    title: "1. Explore Rankings",
    body: "Start with the leaderboard to see how models perform on fairness at a glance.",
  },
  {
    title: "2. Compare Side by Side",
    body: "Pick up to 3 models and compare metrics across demographics with chart and table views.",
  },
  {
    title: "3. Review Model Details",
    body: "Open model info to inspect strengths, limitations, and fairness tradeoffs in more depth.",
  },
] as const;

export const FAIRNESS_CONTEXT = {
  intro:
    "The fairness views on this platform highlight how evenly model performance is distributed across sensitive demographic groups.",
  detail:
    "A stronger fairness score suggests more balanced outcomes, but it should be interpreted together with accuracy, safety, cost, and your use-case requirements.",
} as const;

export const USE_CASES = [
  "Choosing safer default models for customer support",
  "Reviewing model options for education and public sector tools",
  "Comparing vendor claims with fairness-focused evidence",
  "Explaining model tradeoffs to non-technical stakeholders",
] as const;

export const FAQ_ITEMS = [
  {
    q: "Does a higher fairness score mean a model is always better?",
    a: "Not always. Fairness is one important signal, but final decisions should also consider quality, safety, cost, and task fit.",
  },
  {
    q: "Can this platform replace a full AI audit?",
    a: "No. It is designed as an accessible starting point that helps users spot differences and ask better follow-up questions.",
  },
  {
    q: "Who is this website for?",
    a: "Anyone involved in selecting or evaluating AI systems, especially teams that include non-technical decision makers.",
  },
] as const;
