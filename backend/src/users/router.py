from typing import Optional

from fastapi import APIRouter, Depends, Response, status

from src.users.models import UserModel
from src.users.schemas import UserCreate, User, UserUpdate, UserHistory, UserHistoryCreate
from .dependencies import get_current_user
from .service import UserService

auth_router = APIRouter(prefix="/auth", tags=["auth"])
user_router = APIRouter(prefix="/users", tags=["user"])


@auth_router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
        user: UserCreate
):
    await UserService.register_new_user(user)


@user_router.get("/me")
async def get_current_user(
        current_user: UserModel = Depends(get_current_user)
) -> User:
    return await UserService.get_user(current_user.tg_id)


@user_router.put("/me")
async def update_current_user(
        user: UserUpdate,
        current_user: UserModel = Depends(get_current_user)
) -> User:
    return await UserService.update_user(current_user.tg_id, user)


@user_router.delete("/me")
async def delete_current_user(
        current_user: UserModel = Depends(get_current_user)
):
    await UserService.delete_user(current_user.tg_id)
    return {"message": "User status is not active already"}


@user_router.get("/{tg_id}/history")
async def get_user_history(tg_id: int) -> Optional[list[UserHistory]]:
    return await UserService.get_user_history(tg_id)


@user_router.post("/{tg_id}/history")
async def create_record_in_user_history(tg_id: int, user_history: UserHistoryCreate):
    await UserService.create_record_in_user_history(
        tg_id=tg_id, user_history=user_history
    )
