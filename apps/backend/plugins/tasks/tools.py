from langchain_core.tools import tool
from typing import List, Dict, Any

from ..config import settings

@tool
async def create_task_tool(title: str, description: str = None, due_date: str = None, priority: str = "medium") -> str:
    """Creates a new task. 
    Args:
        title (str): The title of the task.
        description (str, optional): A description for the task. Defaults to None.
        due_date (str, optional): The due date of the task in ISO 8601 format (e.g., '2024-06-13T17:00:00Z'). Defaults to None.
        priority (str, optional): The priority of the task ('low', 'medium', 'high'). Defaults to 'medium'.
    """
    if not settings.PLUGIN_CALENDAR_ENABLED: # Assuming tasks are part of calendar/productivity plugin
        return "Tasks plugin is not enabled."
    
    # Placeholder for actual task creation logic
    print(f"Creating task: {title}")
    return f"Task '{title}' created successfully."

@tool
async def get_tasks_tool(status: str = None, priority: str = None, max_results: int = 5) -> List[Dict[str, Any]]:
    """Retrieves a list of tasks, optionally filtered by status or priority. 
    Args:
        status (str, optional): Filter tasks by status ('pending', 'in-progress', 'completed'). Defaults to None.
        priority (str, optional): Filter tasks by priority ('low', 'medium', 'high'). Defaults to None.
        max_results (int, optional): The maximum number of tasks to retrieve. Defaults to 5.
    """
    if not settings.PLUGIN_CALENDAR_ENABLED: # Assuming tasks are part of calendar/productivity plugin
        return "Tasks plugin is not enabled."
    
    # Placeholder for actual task retrieval logic
    mock_tasks = [
        {"title": "Prepare Q3 Report", "due_date": "2024-06-15T17:00:00Z", "status": "in-progress", "priority": "high"},
        {"title": "Schedule Team Meeting", "due_date": "2024-06-14T10:00:00Z", "status": "pending", "priority": "medium"},
    ]
    
    filtered_tasks = mock_tasks
    if status:
        filtered_tasks = [task for task in filtered_tasks if task["status"] == status]
    if priority:
        filtered_tasks = [task for task in filtered_tasks if task["priority"] == priority]
        
    return filtered_tasks[:max_results]

def get_tasks_tools():
    return [create_task_tool, get_tasks_tool]
