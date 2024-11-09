# app/services/openhands_service.py

import os
import subprocess
import shutil

async def process_with_openhands(zip_path: str, workspace_dir: str, instructions: str):
    # Extract ZIP
    extract_path = os.path.join(workspace_dir, "extracted")
    os.makedirs(extract_path, exist_ok=True)
    shutil.unpack_archive(zip_path, extract_path)

    # Run OpenHands CLI
    command = [
        "poetry",
        "run",
        "python",
        "-m",
        "openhands.core.cli",
        "--workspace",
        extract_path,
        "--instructions",
        instructions
    ]
    result = subprocess.run(command, capture_output=True, text=True)

    if result.returncode != 0:
        raise Exception(f"OpenHands Error: {result.stderr}")