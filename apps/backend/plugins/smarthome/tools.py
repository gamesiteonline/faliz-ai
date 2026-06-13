from langchain_core.tools import tool
from typing import Dict, Any

from ..config import settings

@tool
async def get_device_status_tool(device_name: str) -> Dict[str, Any]:
    """Retrieves the current status of a specified smart home device.
    Args:
        device_name (str): The name or ID of the smart home device (e.g., "living room light", "thermostat").
    """
    if not settings.PLUGIN_SMARTHOME_ENABLED:
        return {"error": "Smart Home plugin is not enabled."}
    
    # Placeholder for actual smart home integration (e.g., Home Assistant API)
    if device_name.lower() == "living room light":
        return {"device": device_name, "status": "on", "brightness": 80}
    elif device_name.lower() == "thermostat":
        return {"device": device_name, "status": "on", "temperature": 22, "unit": "celsius"}
    else:
        return {"device": device_name, "status": "unknown"}

@tool
async def set_device_state_tool(device_name: str, state: str, value: Any = None) -> str:
    """Sets the state of a specified smart home device.
    Args:
        device_name (str): The name or ID of the smart home device.
        state (str): The desired state (e.g., "on", "off", "set_temperature").
        value (Any, optional): An optional value for the state (e.g., temperature for "set_temperature").
    """
    if not settings.PLUGIN_SMARTHOME_ENABLED:
        return "Smart Home plugin is not enabled."
    
    # Placeholder for actual smart home integration
    print(f"Setting {device_name} to state {state} with value {value}")
    return f"Device {device_name} state set to {state}."

def get_smarthome_tools():
    return [get_device_status_tool, set_device_state_tool]
