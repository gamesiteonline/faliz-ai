from pydantic import BaseModel
from typing import List, Literal, Any

class ChatMessage(BaseModel):
    role: Literal["user", "faliz", "tool"]
    content: str
    timestamp: str

class ChatResponse(BaseModel):
    response: str
    history: List[ChatMessage]

class SSEMessage(BaseModel):
    type: str
    payload: Any
