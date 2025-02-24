from fastapi import APIRouter, Depends, Response, status, Request, HTTPException

from src.users.models import UserModel
from src.users.schemas import UserCreate, User, UserUpdate, UserHistory, UserHistoryCreate
from src.users.service import UserService
from src.users.utils import verify_telegram_init_data

auth_router = APIRouter(prefix="/auth", tags=["auth"])
user_router = APIRouter(prefix="/users", tags=["user"])


@auth_router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
        user: UserCreate
) -> None:
    await UserService.register_new_user(user)


@user_router.get("/me")
async def get_current_user(
        request: Request,
) -> User:
    init_data = request.headers.get("Authorization")
    if not init_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Authorization header missing")

    user_data = verify_telegram_init_data(init_data)
    telegram_id = int(user_data["user"]["id"])

    user = await UserService.get_user(telegram_id)
    if not user:
        user = UserCreate(
                tg_id=telegram_id,
                first_name=user_data["user"]["first_name"],
            )
        await UserService.register_new_user(user)
        return await UserService.get_user(telegram_id)
    return user


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
async def get_user_history(tg_id: int) -> list[UserHistory]:
    return await UserService.get_user_history(tg_id)


@user_router.post("/{tg_id}/history")
async def create_record_in_user_history(user_history: UserHistoryCreate):
    await UserService.create_record_in_user_history(user_history)
