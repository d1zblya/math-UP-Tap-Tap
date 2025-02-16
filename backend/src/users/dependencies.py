from typing import Optional

from fastapi import Request

from src.users.schemas import User
from src.users.service import UserService


async def get_current_user(request: Request) -> Optional[User]:
    body = await request.json()
    tg_id = body["tg_id"]

    return await UserService.get_user(tg_id)

