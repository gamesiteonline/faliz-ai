from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from typing import List
import json

from ..core.dependencies import get_current_active_user
from ..schemas.chat import ChatMessage, ChatResponse, SSEMessage
from ..models.user import User
from ..ai.brain import faliz_brain
from ..core.redis import get_redis_client
from ..ai.streaming import create_sse_response

router = APIRouter()

@router.post("/message", response_model=ChatResponse)
async def send_chat_message(
    message: str,
    current_user: User = Depends(get_current_active_user),
    session_id: str = "default_session" # In a real app, this would come from frontend or be generated
):
    response_content = await faliz_brain.process_message(message, session_id)
    # In a real app, you would retrieve the full chat history from the database
    # For now, we'll return a simplified response
    return ChatResponse(response=response_content, history=[])

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, current_user: User = Depends(get_current_active_user)):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            # Process websocket message, e.g., for real-time voice input or chat
            await websocket.send_text(f"Message text was: {data}")
    except WebSocketDisconnect:
        print("WebSocket disconnected")

@router.get("/stream")
async def sse_stream(current_user: User = Depends(get_current_active_user)):
    user_id = str(current_user.id)
    redis_client = get_redis_client()
    pubsub = redis_client.pubsub()
    await pubsub.subscribe(f"user_sse_{user_id}")

    async def event_generator():
        async for message in pubsub.listen():
            if message["type"] == "message":
                data = message["data"]
                yield data

    return create_sse_response(event_generator()))
