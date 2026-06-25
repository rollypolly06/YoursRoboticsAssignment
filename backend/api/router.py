from fastapi import APIRouter, UploadFile, File
from pathlib import Path
import shutil
from .handler import parse_robots, parse_vending, parse_footfall, parse_interactions

router = APIRouter()

@router.post("/data")
async def upload_data(files: list[UploadFile] = File(...)):
    UPLOAD_DIR = Path("uploads")
    UPLOAD_DIR.mkdir(exist_ok=True)

    saved_filenames = []

    # Loop through the list of received files
    for file in files:
        # Create the full destination path using the original filename
        file_path = UPLOAD_DIR / file.filename        
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        saved_filenames.append(file.filename)

    # Return a success response to the frontend
    return {
        "data": { "status": "Upload successful" }
    }

@router.get("/robots")
async def get_robots():
    robots = await parse_robots()
    return { "data": robots }

@router.get("/vending")
async def get_vending():
    vending = await parse_vending()
    return { "data": vending }

@router.get("/footfall")
async def get_footfall():
    footfall = await parse_footfall()
    return { "data": footfall }

@router.get("/interactions")
async def get_interactions():
    interactions = await parse_interactions()
    return { "data": interactions }
