from langchain_core.tools import tool
from typing import Dict, Any

from ..config import settings

@tool
async def get_current_weather_tool(location: str) -> Dict[str, Any]:
    """Retrieves the current weather conditions for a specified location.
    Args:
        location (str): The city or region for which to get the weather.
    """
    if not settings.OPENWEATHER_API_KEY:
        return {"error": "OpenWeather API key is not configured."}
    
    # Placeholder for actual weather API call
    # In a real application, this would call OpenWeatherMap or similar service
    return {
        "location": location,
        "temperature": 25,
        "unit": "celsius",
        "condition": "Partly Cloudy",
        "humidity": 60,
        "wind_speed": 10,
    }

@tool
async def get_weather_forecast_tool(location: str, days: int = 3) -> Dict[str, Any]:
    """Retrieves the weather forecast for a specified location for the next few days.
    Args:
        location (str): The city or region for which to get the weather forecast.
        days (int, optional): The number of days for the forecast (1-7). Defaults to 3.
    """
    if not settings.OPENWEATHER_API_KEY:
        return {"error": "OpenWeather API key is not configured."}
    
    # Placeholder for actual weather API call
    mock_forecast = [
        {"date": "2024-06-14", "max_temp": 28, "min_temp": 18, "condition": "Sunny"},
        {"date": "2024-06-15", "max_temp": 26, "min_temp": 17, "condition": "Cloudy"},
        {"date": "2024-06-16", "max_temp": 24, "min_temp": 16, "condition": "Rainy"},
    ]
    return {"location": location, "forecast": mock_forecast[:days]}

def get_weather_tools():
    return [get_current_weather_tool, get_weather_forecast_tool]
