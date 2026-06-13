from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Any

from ..core.dependencies import get_current_active_user
from ..models.user import User
from ..config import settings

router = APIRouter()

@router.get("/available")
async def get_available_plugins(
    current_user: User = Depends(get_current_active_user)
) -> List[str]:
    # In a real system, this would dynamically discover plugins
    # For now, return a static list based on config
    available = []
    if settings.PLUGIN_VOICE_ENABLED: available.append("voice")
    if settings.PLUGIN_CALENDAR_ENABLED: available.append("calendar")
    if settings.PLUGIN_EMAIL_ENABLED: available.append("email")
    if settings.PLUGIN_SYSTEM_ENABLED: available.append("system")
    if settings.PLUGIN_SMARTHOME_ENABLED: available.append("smarthome")
    if settings.PLUGIN_VISION_ENABLED: available.append("vision")
    if settings.PLUGIN_ENTERTAINMENT_ENABLED: available.append("entertainment")
    if settings.PLUGIN_ANALYTICS_ENABLED: available.append("analytics")
    return available

@router.post("/toggle/{plugin_name}")
async def toggle_plugin(
    plugin_name: str,
    enable: bool,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # This would typically require admin privileges or a more robust plugin management system
    # For now, it's a placeholder to demonstrate the concept
    if plugin_name == "voice":
        settings.PLUGIN_VOICE_ENABLED = enable
    elif plugin_name == "calendar":
        settings.PLUGIN_CALENDAR_ENABLED = enable
    elif plugin_name == "email":
        settings.PLUGIN_EMAIL_ENABLED = enable
    elif plugin_name == "system":
        settings.PLUGIN_SYSTEM_ENABLED = enable
    elif plugin_name == "smarthome":
        settings.PLUGIN_SMARTHOME_ENABLED = enable
    elif plugin_name == "vision":
        settings.PLUGIN_VISION_ENABLED = enable
    elif plugin_name == "entertainment":
        settings.PLUGIN_ENTERTAINMENT_ENABLED = enable
    elif plugin_name == "analytics":
        settings.PLUGIN_ANALYTICS_ENABLED = enable
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Plugin not found")
    
    return {"message": f"Plugin {plugin_name} {'enabled' if enable else 'disabled'} successfully"}
