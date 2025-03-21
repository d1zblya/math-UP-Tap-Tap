from typing import Type, Union

from fastapi import APIRouter, Request
from fastapi_cache.decorator import cache

from src.users.schemas import User, UserHistory, CheckUserQuests, UserQuests
from src.users.service import UserService

user_router = APIRouter(prefix="/api/users", tags=["user"])


@user_router.get("/me")
async def get_current_user(
        request: Request,
) -> User:
    telegram_id = request.state.telegram_id
    first_name = request.state.first_name

    user = await UserService.get_or_create_user(User(tg_id=telegram_id, first_name=first_name))
    return user


@user_router.get("/{tg_id}/history")
@cache(expire=30)
async def get_user_history(tg_id: int) -> list[UserHistory]:
    return await UserService.get_user_history(tg_id)


@user_router.post("/{tg_id}/history")
async def create_record_in_user_history(user_history: UserHistory) -> int:
    return await UserService.create_record_in_user_history(user_history)


@user_router.post("/{tg_id}/quests/check")
async def check_user_quests(tg_id: int, data_for_check_user_quests: CheckUserQuests) -> None:
    await UserService.check_user_quests(
        tg_id=tg_id,
        data_for_check_user_quests=data_for_check_user_quests,
    )


@user_router.get("/{tg_id}/quests")
async def get_user_quests(tg_id: int) -> Union[list[UserQuests], UserQuests]:
    return await UserService.get_user_assigned_quests(tg_id)
