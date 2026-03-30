import json
import os
import random

from fastapi import FastAPI

from model_metadata import get_model_metadata



# Build per-category rankings
def category_ranks(key, model_results):
    ranked = sorted(model_results, key=lambda x: x.get(key, {}).get("equalized_odds_ratio", 0), reverse=True)
    return {m["model_name"]: i + 1 for i, m in enumerate(ranked)}


app = FastAPI()


@app.get("/api/models/results")
async def read_root():
    try:
        model_results = []
        for fname in os.listdir("./model-data/"):
            model_name = fname.replace("_results.json", "")
            with open(f"./model-data/{fname}") as f:
                data = json.load(f)

            for category in ("gender", "race"):
                if "prediction_examples" in data and category in data["prediction_examples"]:
                    items = list(data["prediction_examples"][category].items())
                    sampled = random.sample(items, 5) if len(items) > 5 else items
                    data["prediction_examples"][category] = dict(sampled)

            model_results.append({"model_name": model_name, **data, **get_model_metadata(model_name)})

        model_results.sort(key=lambda x: x.get("equalized_odds_ratio", 0), reverse=True)
        for i, m in enumerate(model_results):
            m["rank"] = i + 1

        def category_ranks(key):
            ranked = sorted(model_results, key=lambda x: x.get(key, {}).get("equalized_odds_ratio", 0), reverse=True)
            return {m["model_name"]: i + 1 for i, m in enumerate(ranked)}

        return {
            "overallScores": {
                "gender": category_ranks("gender"),
                "race": category_ranks("race"),
            },
            "modelsData": model_results,
        }
    except Exception as e:
        print(f"An error occurred: {e}")
        return "Error"