from fastapi import APIRouter, Request
from fastapi_cache.decorator import cache

from src.users.schemas import UserCreate, User, UserHistory, UserHistoryCreate
from src.users.service import UserService

user_router = APIRouter(prefix="/api/users", tags=["user"])


@user_router.get("/me")
@cache(expire=30)
async def get_current_user(
        request: Request,
) -> User:
    telegram_id = request.state.telegram_id
    first_name = request.state.first_name

    user = await UserService.get_or_create_user(UserCreate(tg_id=telegram_id, first_name=first_name))
    return user


@user_router.get("/{tg_id}/history")
@cache(expire=15)
async def get_user_history(tg_id: int) -> list[UserHistory]:
    return await UserService.get_user_history(tg_id)


@user_router.post("/{tg_id}/history")
async def create_record_in_user_history(user_history: UserHistoryCreate) -> None:
    await UserService.create_record_in_user_history(user_history)
