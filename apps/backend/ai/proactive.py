from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime
import asyncio
import structlog

from ..config import settings
from ..core.redis import get_redis_client
from ..models.user import User
from ..core.database import AsyncSessionLocal
from ..schemas.chat import SSEMessage

logger = structlog.get_logger(__name__)
scheduler = AsyncIOScheduler()

async def analyze_user_patterns(user_id: str):
    """Analyzes user patterns and generates proactive suggestions."""
    logger.info("Analyzing user patterns", user_id=user_id)
    # This is a placeholder. In a real implementation, this would:
    # 1. Fetch user data (calendar, tasks, conversation history) from DB/vector store.
    # 2. Use an LLM to identify patterns and generate suggestions.
    # 3. Store suggestions in a database or cache.
    
    # Simulate a suggestion
    suggestion = f"Faliz noticed you have a busy day tomorrow. Would you like me to block some focus time? (User: {user_id})"
    
    # Publish suggestion via Redis Pub/Sub for SSE
    redis_client = get_redis_client()
    sse_message = SSEMessage(type="proactive_suggestion", payload={"suggestion": suggestion, "user_id": user_id})
    await redis_client.publish(f"user_sse_{user_id}", sse_message.model_dump_json())
    logger.info("Published proactive suggestion", user_id=user_id, suggestion=suggestion)

async def schedule_proactive_analysis():
    """Schedules proactive analysis for all active users."""
    logger.info("Scheduling proactive analysis for all users.")
    async with AsyncSessionLocal() as session:
        users = await session.execute(User.select().where(User.is_active == True))
        for user in users.scalars().all():
            # Schedule for a specific time, e.g., every morning at 6 AM
            scheduler.add_job(
                analyze_user_patterns,
                CronTrigger(hour=6, minute=0),
                args=[str(user.id)],
                id=f"proactive_analysis_{user.id}",
                replace_existing=True
            )
            logger.info("Scheduled proactive analysis for user", user_id=str(user.id))

def start_proactive_engine():
    """Starts the APScheduler for proactive suggestions."""
    if not scheduler.running:
        scheduler.start()
        logger.info("Proactive engine started.")
        # Schedule initial run to populate jobs for existing users
        asyncio.create_task(schedule_proactive_analysis())

def stop_proactive_engine():
    """Stops the APScheduler."""
    if scheduler.running:
        scheduler.shutdown()
        logger.info("Proactive engine stopped.")
