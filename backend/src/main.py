import json

import uvicorn
from fastapi import FastAPI, Request, HTTPException, status
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse
from starlette.responses import JSONResponse

from src.core.cache import init_cache
from src.core.config import settings

from loguru import logger

from src.tasks.router import task_router
from src.theory.router import theory_router
from src.users.router import user_router
from src.users.utils import verify_telegram_init_data

app = FastAPI(title="mathUP-Mini-App", version="0.0.1")


@app.on_event("startup")
async def startup():
    await init_cache()


app.include_router(user_router)
app.include_router(theory_router)
app.include_router(task_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["Set-Cookie", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers",
                   "Content-Type"]
)


@app.middleware("http")
async def data_validation_middleware(request: Request, call_next):
    if request.url.path in ["/docs", "/redoc", "/openapi.json"]:
        return await call_next(request)

    if request.url.path.startswith("/api/users"):
        init_data = request.headers.get("Authorization")

        if not init_data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Authorization header missing")

        user_data = verify_telegram_init_data(init_data)

        user = user_data.get("user")

        request.state.telegram_id = user.get("id")
        request.state.first_name = user.get("first_name", "")

    response = await call_next(request)
    return response


@app.get("/")
async def root():
    return RedirectResponse(url="/docs")


if __name__ == "__main__":
    logger.add("file_main.log", retention="7 days")
    uvicorn.run("main:app")
