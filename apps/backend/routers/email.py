from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Any

from ..core.dependencies import get_current_active_user
from ..models.user import User
from ..config import settings

router = APIRouter()

@router.get("/inbox")
async def get_inbox(
    current_user: User = Depends(get_current_active_user)
) -> List[Any]:
    if not settings.PLUGIN_EMAIL_ENABLED:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Email plugin is not enabled")
    
    # Placeholder for actual email fetching logic (e.g., Gmail API integration)
    mock_emails = [
        {
            "id": "e1",
            "sender": "john.doe@example.com",
            "subject": "Project Update: Week 3",
            "body_snippet": "Hi Faliz, here is the weekly project update...",
            "timestamp": "2024-06-12T10:00:00Z",
            "read": False,
        },
        {
            "id": "e2",
            "sender": "newsletter@techdaily.com",
            "subject": "Your Daily Tech Digest",
            "body_snippet": "Catch up on the latest in AI and tech...",
            "timestamp": "2024-06-12T09:30:00Z",
            "read": True,
        },
    ]
    return mock_emails

@router.get("/{email_id}")
async def get_email_content(
    email_id: str,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if not settings.PLUGIN_EMAIL_ENABLED:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Email plugin is not enabled")
    
    # Placeholder for fetching specific email content
    mock_email_content = {
        "id": email_id,
        "sender": "john.doe@example.com",
        "subject": "Project Update: Week 3",
        "body": "Hi Faliz, here is the weekly project update. Please review the attached document. This is the full body of the email.",
        "timestamp": "2024-06-12T10:00:00Z",
        "read": True,
    }
    return mock_email_content

@router.post("/send")
async def send_email(
    recipient: str,
    subject: str,
    body: str,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if not settings.PLUGIN_EMAIL_ENABLED:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Email plugin is not enabled")
    
    # Placeholder for sending email logic (e.g., Gmail API integration)
    print(f"Sending email to {recipient} with subject {subject} and body {body}")
    return {"message": "Email sent successfully", "recipient": recipient, "subject": subject}
