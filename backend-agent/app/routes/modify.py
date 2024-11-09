# backend-agent/app/routes/modify.py

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
import uuid
import os
import shutil
import aiofiles
import aiohttp
import logging
from app.services.openhands_service import process_with_openhands

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class ModifyRequest(BaseModel):
    instructions: str
    file: str  # Changed from HttpUrl to str

router = APIRouter()

@router.post("/modify", summary="Modify Uploaded ZIP File")
async def modify_zip(request: ModifyRequest):
    logger.info(f"Received request to modify ZIP file from {request.file}")
    request_id = str(uuid.uuid4())
    workspace_dir = os.path.join(os.getenv("OPENHANDS_WORKSPACE", "/opt/workspace"), request_id)
    os.makedirs(workspace_dir, exist_ok=True)

    zip_path = os.path.join(workspace_dir, "original.zip")
    modified_zip_path = os.path.join(workspace_dir, "modified.zip")

    try:
        # Download the ZIP file from the URL
        async with aiohttp.ClientSession() as session:
            async with session.get(str(request.file)) as resp:
                if resp.status != 200:
                    logger.error(f"Failed to download ZIP file. Status code: {resp.status}")
                    raise HTTPException(status_code=400, detail="Failed to download ZIP file.")
                content = await resp.read()
                async with aiofiles.open(zip_path, 'wb') as out_file:
                    await out_file.write(content)

        logger.info(f"Downloaded file to {zip_path}")
        
        # Process with OpenHands directly
        logger.debug("Starting OpenHands processing...")
        result = await process_with_openhands(zip_path, workspace_dir, request.instructions)
        logger.debug(f"OpenHands processing result: {result}")

        if result.get("status") != "success":
            error = result.get("error", "Unknown error")
            logger.error(f"OpenHands processing failed: {error}")
            raise HTTPException(status_code=500, detail=f"OpenHands processing failed: {error}")

        # Create modified ZIP
        shutil.make_archive(modified_zip_path.replace('.zip', ''), 'zip', workspace_dir)
        logger.info(f"Created modified ZIP at {modified_zip_path}")

        return FileResponse(
            path=modified_zip_path,
            filename="modified.zip",
            media_type="application/zip"
        )

    except Exception as e:
        logger.exception("An error occurred while modifying the ZIP file.")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        shutil.rmtree(workspace_dir, ignore_errors=True)
        logger.debug(f"Cleaned up workspace directory: {workspace_dir}")