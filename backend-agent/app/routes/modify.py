# app/routes/modify.py

from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from fastapi.responses import FileResponse
import uuid
import os
import shutil
import aiofiles
from app.services.openhands_service import process_with_openhands

router = APIRouter()

@router.post("/modify", summary="Modify Uploaded ZIP File")
async def modify_zip(
    instructions: str = Form(...),
    file: UploadFile = File(...)
):
    request_id = str(uuid.uuid4())
    workspace_dir = os.path.join(os.getenv("OPENHANDS_WORKSPACE", "/opt/workspace"), request_id)
    os.makedirs(workspace_dir, exist_ok=True)

    zip_path = os.path.join(workspace_dir, "original.zip")
    modified_zip_path = os.path.join(workspace_dir, "modified.zip")

    try:
        # Save uploaded ZIP
        async with aiofiles.open(zip_path, 'wb') as out_file:
            content = await file.read()
            await out_file.write(content)

        # Process with OpenHands
        await process_with_openhands(zip_path, workspace_dir, instructions)

        # Create modified ZIP
        shutil.make_archive(modified_zip_path.replace('.zip', ''), 'zip', workspace_dir)

        return FileResponse(
            path=modified_zip_path,
            filename="modified.zip",
            media_type="application/zip"
        )

    except Exception:
        raise HTTPException(status_code=500, detail="Modification failed")
    finally:
        shutil.rmtree(workspace_dir, ignore_errors=True)