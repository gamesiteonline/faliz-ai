from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Any

from ..core.dependencies import get_current_active_user
from ..models.user import User
from ..ai.brain import faliz_brain

router = APIRouter()

@router.get("/context")
async def get_memory_context(
    query: str,
    current_user: User = Depends(get_current_active_user),
    k: int = 3
) -> List[str]:
    """Retrieve relevant context from long-term memory based on a query."""
    context = await faliz_brain.get_relevant_context(query, str(current_user.id), k)
    return context

@router.post("/recall")
async def recall_information(
    query: str,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """Recall specific information from user's memory."""
    # This would involve a more sophisticated retrieval from vector store or other memory systems
    # For now, it's a placeholder that uses the context retrieval
    context = await faliz_brain.get_relevant_context(query, str(current_user.id), k=1)
    if context:
        return {"recalled_information": context[0]}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Information not found in memory")
