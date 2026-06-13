from fastapi import APIRouter, Depends, HTTPException, status
from typing import Any

from ..core.dependencies import get_current_active_user
from ..models.user import User
from ..ai.proactive import start_proactive_engine, stop_proactive_engine

router = APIRouter()

@router.post("/start-proactive-engine")
async def start_engine(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # In a real application, this might be an admin-only endpoint or triggered by system startup
    start_proactive_engine()
    return {"message": "Proactive engine started"}

@router.post("/stop-proactive-engine")
async def stop_engine(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # In a real application, this might be an admin-only endpoint or triggered by system shutdown
    stop_proactive_engine()
    return {"message": "Proactive engine stopped"}

# Additional event-related endpoints can be added here, e.g., for webhooks or custom triggers
