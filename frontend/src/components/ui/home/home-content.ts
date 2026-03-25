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
	{
		q: "What does the '135m', '3:3b', and '175b' mean in the model names?",
		a: "These numbers refer to the number of parameters in the model. Generally, a higher number of parameters can indicate a more complex and potentially more capable model, but it doesn't necessarily mean it's better for every use case.",
	},
	{
		q: "Are the models tested on real-world data?",
		a: "Models are evaluated on curated benchmark datasets designed to reflect real-world scenarios, but may not capture every possible use case.",
	},
	{
		q: "How often are the model rankings updated?",
		a: "Rankings are updated periodically as new models are added or as evaluation methods improve.",
	},
] as const;
