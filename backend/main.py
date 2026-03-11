from fastapi import FastAPI
import json
import os


def to_ranked(d):
    sorted_models = sorted(d.items(), key=lambda x: x[1], reverse=True)
    return {model: rank + 1 for rank, (model, _) in enumerate(sorted_models)}


app = FastAPI()

@app.get("/api/models/results")
async def read_root():
    
    try:
        
        files_names_in_dir = os.listdir('backend/model-data/')

        models_data = []
        overall = {}
        attributes = {}

        for file_name in files_names_in_dir:
            with open(f"backend/model-data/{file_name}", "r", encoding="utf-8") as f:
                data = json.load(f)
                model_name = data["model_name"]

                if "prediction_examples" in data:
                    data["prediction_examples"] = {
                        group: dict(list(examples.items())[:5])
                        for group, examples in data["prediction_examples"].items()
                    }

                models_data.append(data)
                overall[model_name] = data["equalized_odds_ratio"]
                
                for key, value in data.items():
                    if isinstance(value, dict) and "group_accuracy" in value:
                        attributes.setdefault(key, {})[model_name] = value["group_accuracy"]

        overall_ranks = to_ranked(overall)

        # Inject rank into each model
        for model in models_data:
            model["rank"] = overall_ranks[model["model_name"]]

        ranking = {
            "overallScores": {
                **{attr: to_ranked(models) for attr, models in attributes.items()}
            },
            "modelsData": models_data
        }

        return ranking


    except Exception as e:
        print(f"An error occurred: {e}")
        return "Error"



if __name__ == "__main__":

    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
