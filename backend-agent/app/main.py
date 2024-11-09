# app/main.py

from fastapi import FastAPI
from app.routes import modify
import os
# app/main.py
import logging
from dotenv import load_dotenv

load_dotenv()
logging.basicConfig(level=logging.DEBUG)


app = FastAPI(
    title="AI Web Developer Backend",
    description="API for modifying websites using OpenHands",
    version="1.0.0",
)

# Include the modify route
app.include_router(modify.router, prefix="/api")

@app.get("/health", tags=["Health Check"])
def health_check():
    return {"status": "API is running."}
