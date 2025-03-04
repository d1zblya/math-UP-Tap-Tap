from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
import redis.asyncio as redis
from src.core.config import settings
from fastapi import Request, Response


def request_key_builder(
        func, namespace: str = "", *args, request: Request = None, response: Response = None, **kwargs
) -> str:
    return f"{namespace}:{request.method.lower()}:{request.url.path}"


async def init_cache():
    redis_client = redis.Redis(
        host=settings.redis.REDIS_HOST,
        port=settings.redis.REDIS_PORT,
        db=settings.redis.REDIS_DB,
    )
    FastAPICache.init(RedisBackend(redis_client), key_builder=request_key_builder)
    return redis_client
