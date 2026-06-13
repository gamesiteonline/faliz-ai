from langchain_core.tools import tool
from typing import Dict, Any

from ..config import settings

@tool
async def get_current_location_tool() -> Dict[str, Any]:
    """Retrieves the current geographical location of the user or system.
    This tool is useful for location-aware services.
    """
    # Placeholder for actual location retrieval logic (e.g., IP geolocation, GPS)
    return {
        "latitude": 34.052235,
        "longitude": -118.243683,
        "address": "Los Angeles, CA",
    }

@tool
async def get_directions_tool(origin: str, destination: str) -> str:
    """Provides directions from an origin to a destination.
    Args:
        origin (str): The starting point for directions.
        destination (str): The destination for directions.
    """
    if not settings.GOOGLE_MAPS_API_KEY:
        return "Google Maps API key is not configured."
    
    # Placeholder for actual directions API call (e.g., Google Maps Directions API)
    return f"Directions from {origin} to {destination}: Take the scenic route and enjoy the journey!"

@tool
async def search_nearby_places_tool(query: str, location: str = None, radius: int = 5000) -> List[Dict[str, Any]]:
    """Searches for nearby places of interest based on a query and an optional location.
    Args:
        query (str): The type of place to search for (e.g., "restaurants", "coffee shops").
        location (str, optional): The central location for the search (e.g., "Eiffel Tower"). If not provided, uses current location.
        radius (int, optional): The search radius in meters. Defaults to 5000.
    """
    if not settings.GOOGLE_MAPS_API_KEY:
        return {"error": "Google Maps API key is not configured."}
    
    # Placeholder for actual nearby places API call (e.g., Google Places API)
    mock_places = [
        {"name": "Faliz Cafe", "address": "123 AI Street", "rating": 4.5},
        {"name": "Quantum Bistro", "address": "456 Tech Avenue", "rating": 4.0},
    ]
    return mock_places

def get_location_tools():
    return [get_current_location_tool, get_directions_tool, search_nearby_places_tool]
