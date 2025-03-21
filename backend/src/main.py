import uvicorn
from fastapi import FastAPI
from starlette.responses import RedirectResponse
from contextlib import asynccontextmanager

from src.core.cache import init_cache

from loguru import logger

from src.core.middleware import setup_middlewares
from src.scheduler import start_scheduler
from src.tasks.router import task_router
from src.theory.router import theory_router
from src.users.router import user_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    start_scheduler()
    redis_client = app.state.redis_client = await init_cache()
    yield
    await app.state.redis_client.close()


app = FastAPI(title="mathUP-Mini-App", version="0.0.2", lifespan=lifespan)

setup_middlewares(app)

app.include_router(user_router)
app.include_router(theory_router)
app.include_router(task_router)


@app.get("/")
async def root():
    return RedirectResponse(url="/docs")


if __name__ == "__main__":
    logger.add("file_main.log", retention="7 days")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
