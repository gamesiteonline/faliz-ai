from langchain_core.tools import tool
from datetime import datetime
from typing import List, Dict, Any

from ..config import settings

@tool
async def create_calendar_event_tool(title: str, start_time: str, end_time: str, description: str = None, location: str = None) -> str:
    """Creates a new calendar event. 
    Args:
        title (str): The title of the event.
        start_time (str): The start time of the event in ISO 8601 format (e.g., '2024-06-13T10:00:00Z').
        end_time (str): The end time of the event in ISO 8601 format (e.g., '2024-06-13T11:00:00Z').
        description (str, optional): A description for the event. Defaults to None.
        location (str, optional): The location of the event. Defaults to None.
    """
    if not settings.PLUGIN_CALENDAR_ENABLED:
        return "Calendar plugin is not enabled."
    
    # Placeholder for actual calendar event creation logic (e.g., Google Calendar API)
    print(f"Creating calendar event: {title} from {start_time} to {end_time}")
    return f"Calendar event '{title}' created successfully."

@tool
async def get_upcoming_events_tool(max_results: int = 5) -> List[Dict[str, Any]]:
    """Retrieves a list of upcoming calendar events. 
    Args:
        max_results (int, optional): The maximum number of events to retrieve. Defaults to 5.
    """
    if not settings.PLUGIN_CALENDAR_ENABLED:
        return "Calendar plugin is not enabled."
    
    # Placeholder for actual event retrieval logic
    mock_events = [
        {"title": "Team Sync", "start_time": "2024-06-14T09:00:00Z", "end_time": "2024-06-14T09:30:00Z", "location": "Zoom"},
        {"title": "Project Review", "start_time": "2024-06-14T11:00:00Z", "end_time": "2024-06-14T12:00:00Z", "location": "Office"},
    ]
    return mock_events[:max_results]

def get_calendar_tools():
    return [create_calendar_event_tool, get_upcoming_events_tool]
