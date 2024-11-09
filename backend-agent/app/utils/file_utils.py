# app/utils/file_utils.py

import aiohttp
import aiofiles
import os
import zipfile
import shutil
from fastapi.responses import FileResponse
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

async def download_zip(url: str, dest_path: str):
    """
    Downloads a zip file from the specified URL to the destination path.
    """
    
    # Ensure url and dest_path are strings
    if not isinstance(url, str):
        logger.error(f"URL is not a string: {url}")
        raise ValueError("URL must be a string")
    if not isinstance(dest_path, str):
        logger.error(f"Destination path is not a string: {dest_path}")
        raise ValueError("Destination path must be a string")
    
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status != 200:
                logger.error(f"Failed to download file from {url}, status code: {response.status}")
                raise Exception(f"Failed to download file from {url}")
            try:
                async with aiofiles.open(dest_path, mode='wb') as f:
                    await f.write(await response.read())
                logger.debug(f"Successfully downloaded the file to {dest_path}")
            except Exception as e:
                logger.error(f"Error writing to file {dest_path}: {e}")
                raise

async def extract_zip(zip_path: str, extract_to: str):
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_to)

async def create_zip(folder_path: str, zip_path: str):
    with zipfile.ZipFile(zip_path, 'w') as zip_ref:
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, folder_path)
                zip_ref.write(file_path, arcname)
