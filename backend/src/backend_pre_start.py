import asyncio
import logging

from tenacity import after_log, before_log, retry, stop_after_attempt, wait_fixed
from sqlalchemy import text

from src.database.session import async_session_maker

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

max_tries = 60 * 5  # 5 минут
wait_seconds = 1


@retry(
    stop=stop_after_attempt(max_tries),
    wait=wait_fixed(wait_seconds),
    before=before_log(logger, logging.INFO),
    after=after_log(logger, logging.WARN),
)
async def init() -> None:
    try:
        async with async_session_maker() as session:
            await session.execute(text("SELECT 1"))
    except Exception as e:
        logger.error(e)
        raise e


def main() -> None:
    logger.info("Initializing service")
    asyncio.run(init())
    logger.info("Service finished initializing")


if __name__ == "__main__":
    main()
