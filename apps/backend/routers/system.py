from fastapi import APIRouter, Depends, HTTPException, status
from typing import Any
import psutil

from ..core.dependencies import get_current_active_user
from ..models.user import User
from ..config import settings

router = APIRouter()

@router.get("/metrics")
async def get_system_metrics(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if not settings.PLUGIN_SYSTEM_ENABLED:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="System plugin is not enabled")
    
    cpu_usage = psutil.cpu_percent(interval=1)
    memory_info = psutil.virtual_memory()
    disk_info = psutil.disk_usage("/")
    net_io = psutil.net_io_counters()

    return {
        "cpuUsage": cpu_usage,
        "memoryUsage": memory_info.percent,
        "diskUsage": disk_info.percent,
        "networkActivity": {
            "upload": net_io.bytes_sent,
            "download": net_io.bytes_recv,
        },
    }

@router.post("/launch-app")
async def launch_application(
    app_name: str,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if not settings.PLUGIN_SYSTEM_ENABLED:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="System plugin is not enabled")
    
    # Placeholder for actual application launching logic
    # This would typically involve OS-specific commands or IPC with an Electron app
    print(f"Attempting to launch application: {app_name}")
    return {"message": f"Attempted to launch {app_name}"}

@router.get("/screenshot")
async def take_screenshot(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if not settings.PLUGIN_SYSTEM_ENABLED:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="System plugin is not enabled")
    
    # Placeholder for actual screenshot logic
    # This would typically involve OS-specific commands or IPC with an Electron app
    mock_screenshot_url = "https://via.placeholder.com/150"
    return {"screenshot_url": mock_screenshot_url}

@router.get("/clipboard")
async def get_clipboard_content(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if not settings.PLUGIN_SYSTEM_ENABLED:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="System plugin is not enabled")
    
    # Placeholder for actual clipboard content retrieval
    mock_clipboard_content = "Mock clipboard content"
    return {"content": mock_clipboard_content}

@router.post("/clipboard")
async def set_clipboard_content(
    content: str,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if not settings.PLUGIN_SYSTEM_ENABLED:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="System plugin is not enabled")
    
    # Placeholder for actual clipboard content setting
    print(f"Setting clipboard content to: {content}")
    return {"message": "Clipboard content set successfully"}
