from fastapi import FastAPI
import json

app = FastAPI()


@app.get("/api/models/results")
async def read_root():
    try:
        with open("./model-data/gemma3:270m_results.json", "r", encoding="utf-8") as f:
            data = json.load(f)
            return data
    except Exception as e:
        print(f"An error occurred: {e}")
        return "Error"
