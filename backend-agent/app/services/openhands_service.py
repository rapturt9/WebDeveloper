# backend-agent/app/services/openhands_service.py

import os
import subprocess
import asyncio
import logging

logger = logging.getLogger(__name__)

async def process_with_openhands(zip_path: str, workspace_dir: str, instructions: str):
    try:
        # Set environment variables if needed
        os.environ["WORKSPACE_BASE"] = workspace_dir
        os.environ["LLM_MODEL"] = os.getenv("LLM_MODEL")
        os.environ["LLM_API_KEY"] = os.getenv("LLM_API_KEY")

        # Prepare command for OpenHands CLI using --task
        command = [
            "python",
            "-m",
            "openhands.core.cli",
            "--task",
            instructions
        ]

        logger.debug(f"Running OpenHands command: {' '.join(command)}")
        logger.debug(f"Working directory: {workspace_dir}")

        # Execute OpenHands CLI command
        process = await asyncio.create_subprocess_exec(
            *command,
            cwd=workspace_dir,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )

        stdout, stderr = await process.communicate()

        if process.returncode != 0:
            logger.error(f"OpenHands CLI failed with return code {process.returncode}")
            logger.error(f"Stderr: {stderr.decode().strip()}")
            return {"status": "failure", "error": stderr.decode().strip()}

        logger.debug(f"OpenHands CLI stdout: {stdout.decode().strip()}")

        return {"status": "success"}

    except Exception as e:
        logger.exception("Exception occurred while processing with OpenHands.")
        return {"status": "failure", "error": str(e)}