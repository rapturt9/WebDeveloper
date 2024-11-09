import logging
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()
logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

# Include your routes
from app.routes.modify import router as modify_router
app.include_router(modify_router)