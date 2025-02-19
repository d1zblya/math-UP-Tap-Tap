import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse

from src.core.cache import init_cache
from src.core.config import settings

from loguru import logger

from src.tasks.router import task_router
from src.theory.router import theory_router
from src.users.router import auth_router, user_router

# from src.utils import validate_mini_app_data

app = FastAPI(title="mathUP-Mini-App", version="0.0.1")


@app.on_event("startup")
async def startup():
    await init_cache()


#
# @app.middleware("http")
# async def data_validation_middleware(request: Request, call_next):
#     if request.method in ["POST", "PUT"]:
#         body = await request.json()
#         initData = body.get("initData")
#
#         if not initData:
#             return JSONResponse(status_code=401, content="UNAUTHORIZED")
#
#         is_valid, data = validate_mini_app_data(initData)
#
#         if not is_valid:
#             return JSONResponse(status_code=401, content="UNAUTHORIZED")
#
#         user = json.loads(data.get("user"))
#
#         user_id = user.get("id")
#         username = user.get("username", "")
#         # first_name = user.get("first_name", "")
#
#         if not user_id:
#             return JSONResponse(status_code=401, content="UNAUTHORIZED")
#
#         body["tg_id"] = user_id
#         body["username"] = username
#         # body["first_name"] = first_name
#
#         request._body = json.dumps(body).encode("utf-8")
#
#     response = await call_next(request)
#     return response


app.include_router(auth_router)
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


# @app.get("/")
# async def root():
#     return RedirectResponse(url="/docs")


# if __name__ == "__main__":
#     logger.add("file_main.log", retention="7 days")
#     uvicorn.run("main:app")
