import uvicorn
from fastapi import FastAPI, Request, HTTPException, status
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse, JSONResponse
from contextlib import asynccontextmanager

from src.core.cache import init_cache
from src.core.config import settings

from loguru import logger

from src.tasks.router import task_router
from src.theory.router import theory_router
from src.users.router import user_router
from src.users.utils import verify_telegram_init_data


@asynccontextmanager
async def lifespan(_: FastAPI):
    await init_cache()
    yield


app = FastAPI(title="mathUP-Mini-App", version="0.0.1", lifespan=lifespan)

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

        if init_data is None:
            msg = "Authorization header missing"
            logger.error(msg)
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "error": {
                        "message": msg,
                        "code": status.HTTP_400_BAD_REQUEST,
                        "method": request.method,
                        "path": str(request.url),
                    }
                }
            )

        user_data = verify_telegram_init_data(init_data)

        user = user_data.get("user")

        request.state.telegram_id = user.get("id")
        request.state.first_name = user.get("first_name", "")

    response = await call_next(request)
    return response


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "message": exc.detail,
                "code": exc.status_code,
                "method": request.method,
                "path": str(request.url),
            }
        }
    )


@app.get("/")
async def root():
    return RedirectResponse(url="/docs")


if __name__ == "__main__":
    logger.add("file_main.log", retention="7 days")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
