from fastapi import APIRouter, Depends, status
from typing import Any

router = APIRouter()

@router.get("/ping", status_code=status.HTTP_200_OK)
async def ping() -> Any:
    return {"message": "pong"}

@router.get("/status", status_code=status.HTTP_200_OK)
async def get_status() -> Any:
    # In a real application, this would check database connections, external services, etc.
    return {"status": "healthy", "version": "1.0.0"}
