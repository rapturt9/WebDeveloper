# backend-agent/app/routes/modify.py

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel, HttpUrl
import uuid
import os
import shutil
import aiofiles
import aiohttp
from app.services.openhands_service import process_with_openhands

class ModifyRequest(BaseModel):
    instructions: str
    file: str  # Changed from HttpUrl to str

router = APIRouter()

@router.post("/modify", summary="Modify Uploaded ZIP File")
async def modify_zip(request: ModifyRequest):
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
                    raise HTTPException(status_code=400, detail="Failed to download ZIP file.")
                content = await resp.read()
                async with aiofiles.open(zip_path, 'wb') as out_file:
                    await out_file.write(content)

        # Process with OpenHands
        await process_with_openhands(zip_path, workspace_dir, request.instructions)

        # Create modified ZIP
        shutil.make_archive(modified_zip_path.replace('.zip', ''), 'zip', workspace_dir)

        return FileResponse(
            path=modified_zip_path,
            filename="modified.zip",
            media_type="application/zip"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        shutil.rmtree(workspace_dir, ignore_errors=True)