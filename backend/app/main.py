from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
import time

app = FastAPI()

class InferenceRequest(BaseModel):
    model_id: str
    task: str
    input_text: str

@app.post("/run_model")
def run_model(req: InferenceRequest):
    try:
        start = time.time()
        pipe = pipeline(task=req.task, model=req.model_id)
        output = pipe(req.input_text)
        end = time.time()

        return {
            "model_id": req.model_id,
            "task": req.task,
            "input": req.input_text,
            "output": output,
            "latency_seconds": round(end - start, 3),
            "estimated_memory_mb": 512
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

