# backend-agent/app/services/OpenHands/main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.services.openhands_service import process_with_openhands

class ProcessRequest(BaseModel):
    zip_path: str
    workspace_dir: str
    instructions: str

app = FastAPI(
    title="OpenHands API",
    description="API for interacting with OpenHands services",
    version="1.0.0",
)

@app.post("/process", summary="Process with OpenHands")
async def process(request: ProcessRequest):
    try:
        await process_with_openhands(request.zip_path, request.workspace_dir, request.instructions)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))