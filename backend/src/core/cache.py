from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
import redis.asyncio as redis
from src.core.config import settings


async def init_cache():
    redis_client = redis.Redis(
        host=settings.redis.REDIS_HOST,
        port=settings.redis.REDIS_PORT,
        db=settings.redis.REDIS_DB
    )
    FastAPICache.init(RedisBackend(redis_client), prefix="fastapi-cache")
