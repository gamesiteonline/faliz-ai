from langchain_core.tools import tool
from typing import Dict, Any

from ..config import settings

@tool
async def get_system_metrics_tool() -> Dict[str, Any]:
    """Retrieves current system performance metrics including CPU, memory, disk usage, and network activity.
    This tool is useful for monitoring the health and performance of the system.
    """
    if not settings.PLUGIN_SYSTEM_ENABLED:
        return {"error": "System plugin is not enabled."}
    
    # Placeholder for actual system metrics retrieval logic
    # In a real application, this would call the /system/metrics endpoint or use psutil directly
    return {
        "cpuUsage": 25.5,
        "memoryUsage": 60.2,
        "diskUsage": 45.1,
        "networkActivity": {
            "upload": 1024000,
            "download": 5120000,
        },
    }

@tool
async def launch_application_tool(app_name: str) -> str:
    """Launches a specified application on the operating system.
    Args:
        app_name (str): The name of the application to launch (e.g., "Chrome", "VS Code").
    """
    if not settings.PLUGIN_SYSTEM_ENABLED:
        return "System plugin is not enabled."
    
    # Placeholder for actual application launching logic
    print(f"Launching application: {app_name}")
    return f"Attempted to launch {app_name}."

@tool
async def take_screenshot_tool() -> str:
    """Takes a screenshot of the current display and returns a URL to the image.
    This tool is useful for capturing visual information from the user's screen.
    """
    if not settings.PLUGIN_SYSTEM_ENABLED:
        return "System plugin is not enabled."
    
    # Placeholder for actual screenshot logic
    return "https://via.placeholder.com/1920x1080?text=Screenshot"

@tool
async def get_clipboard_content_tool() -> str:
    """Retrieves the current content of the system clipboard.
    This tool is useful for accessing text or other data copied by the user.
    """
    if not settings.PLUGIN_SYSTEM_ENABLED:
        return "System plugin is not enabled."
    
    # Placeholder for actual clipboard content retrieval
    return "Mock clipboard content from system."

@tool
async def set_clipboard_content_tool(content: str) -> str:
    """Sets the content of the system clipboard to the provided text.
    Args:
        content (str): The text content to set on the clipboard.
    """
    if not settings.PLUGIN_SYSTEM_ENABLED:
        return "System plugin is not enabled."
    
    # Placeholder for actual clipboard content setting
    print(f"Setting clipboard content to: {content}")
    return "Clipboard content set successfully."

def get_system_tools():
    return [get_system_metrics_tool, launch_application_tool, take_screenshot_tool, get_clipboard_content_tool, set_clipboard_content_tool]
