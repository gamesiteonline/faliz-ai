import redis.asyncio as redis
from ..config import settings

redis_client: redis.Redis = None

async def init_redis():
    global redis_client
    redis_client = redis.from_url(settings.REDIS_URL, encoding="utf-8", decode_responses=True)
    try:
        await redis_client.ping()
        print("Redis connected successfully!")
    except redis.exceptions.ConnectionError as e:
        print(f"Could not connect to Redis: {e}")
        # Depending on your application's needs, you might want to raise an exception or handle this gracefully

async def close_redis():
    if redis_client:
        await redis_client.close()
        print("Redis connection closed.")

def get_redis_client() -> redis.Redis:
    if redis_client is None:
        raise ConnectionError("Redis client not initialized.")
    return redis_client
