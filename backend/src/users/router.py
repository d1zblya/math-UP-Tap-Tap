from fastapi import APIRouter, Depends, status, Request, HTTPException

from src.users.models import UserModel
from src.users.schemas import UserCreate, User, UserUpdate, UserHistory, UserHistoryCreate
from src.users.service import UserService

user_router = APIRouter(prefix="/api/users", tags=["user"])


@user_router.get("/me")
async def get_current_user(
        request: Request,
) -> User:
    telegram_id = request.state.telegram_id
    first_name = request.state.first_name

    user = await UserService.get_or_create_user(UserCreate(tg_id=telegram_id, first_name=first_name))
    return user


@user_router.put("/me")
async def update_current_user(
        user: UserUpdate,
        current_user: UserModel = Depends(get_current_user)
) -> User:
    return await UserService.update_user(current_user.tg_id, user)


@user_router.get("/{tg_id}/history")
async def get_user_history(tg_id: int) -> list[UserHistory]:
    return await UserService.get_user_history(tg_id)


@user_router.post("/{tg_id}/history")
async def create_record_in_user_history(user_history: UserHistoryCreate):
    await UserService.create_record_in_user_history(user_history)
