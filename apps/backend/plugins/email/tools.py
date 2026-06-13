from langchain_core.tools import tool
from typing import List, Dict, Any

from ..config import settings

@tool
async def send_email_tool(recipient: str, subject: str, body: str) -> str:
    """Sends an email to the specified recipient with the given subject and body.
    Args:
        recipient (str): The email address of the recipient.
        subject (str): The subject line of the email.
        body (str): The main content of the email.
    """
    if not settings.PLUGIN_EMAIL_ENABLED:
        return "Email plugin is not enabled."
    
    # Placeholder for actual email sending logic (e.g., Gmail API integration)
    print(f"Sending email to {recipient} with subject {subject}")
    return f"Email to {recipient} with subject \'{subject}\' sent successfully."

@tool
async def get_inbox_summary_tool(max_results: int = 5) -> List[Dict[str, Any]]:
    """Retrieves a summary of recent emails from the inbox.
    Args:
        max_results (int, optional): The maximum number of email summaries to retrieve. Defaults to 5.
    """
    if not settings.PLUGIN_EMAIL_ENABLED:
        return "Email plugin is not enabled."
    
    # Placeholder for actual email retrieval logic
    mock_emails = [
        {"id": "e1", "sender": "alice@example.com", "subject": "Meeting Reminder", "snippet": "Don't forget our meeting tomorrow..."},
        {"id": "e2", "sender": "bob@example.com", "subject": "Project Update", "snippet": "The project is progressing well..."},
    ]
    return mock_emails[:max_results]

@tool
async def get_email_content_tool(email_id: str) -> Dict[str, Any]:
    """Retrieves the full content of a specific email by its ID.
    Args:
        email_id (str): The ID of the email to retrieve.
    """
    if not settings.PLUGIN_EMAIL_ENABLED:
        return "Email plugin is not enabled."
    
    # Placeholder for actual email content retrieval logic
    mock_email_content = {
        "id": email_id,
        "sender": "alice@example.com",
        "subject": "Meeting Reminder",
        "body": "Hi Faliz, just a friendly reminder about our meeting tomorrow at 10 AM. Please come prepared to discuss the Q3 report.",
        "timestamp": "2024-06-13T09:00:00Z",
        "read": False,
    }
    return mock_email_content

def get_email_tools():
    return [send_email_tool, get_inbox_summary_tool, get_email_content_tool]
