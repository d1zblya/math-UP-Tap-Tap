from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request, status
from loguru import logger
from src.core.config import settings
from starlette.responses import JSONResponse

from src.users.utils import verify_telegram_init_data


def setup_middlewares(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allow_headers=["Set-Cookie", "Authorization", "Access-Control-Allow-Origin",
                       "Access-Control-Allow-Headers", "Content-Type"]
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
