from typing import Optional

from fastapi import HTTPException, status

from src.database.session import async_session_maker
from src.users.dao import UserDAO, UserHistoryDAO
from src.users.models import UserModel
from src.users.schemas import UserCreate, UserCreateDB, User, UserUpdate, UserUpdateDB, UserHistory, UserHistoryDB, \
    UserHistoryCreate


class UserService:
    @classmethod
    async def register_new_user(cls, user: UserCreate) -> None:
        async with async_session_maker() as session:
            user_exist = await UserDAO.find_one_or_none(session, tg_id=user.tg_id)
            if user_exist:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT, detail="User already exists")

            await UserDAO.add(session, UserCreateDB(tg_id=user.tg_id, first_name=user.first_name))
            await session.commit()

    @classmethod
    async def get_user(cls, tg_id: int) -> User:
        async with async_session_maker() as session:
            db_user = await UserDAO.find_one_or_none(session, tg_id=tg_id)
        if db_user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return db_user

    @classmethod
    async def update_user(cls, tg_id: int, user: UserUpdate) -> User:
        async with async_session_maker() as session:
            db_user = await UserDAO.find_one_or_none(session, UserModel.tg_id == tg_id)
            if db_user is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

            user_in = UserUpdateDB(**user.model_dump())

            user_update = await UserDAO.update(
                session,
                UserModel.tg_id == tg_id,
                obj_in=user_in)
            await session.commit()
            return user_update

    @classmethod
    async def delete_user(cls, tg_id: int) -> None:
        async with async_session_maker() as session:
            db_user = await UserDAO.find_one_or_none(session, tg_id=tg_id)
            if db_user is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
            await UserDAO.delete(
                session,
                UserModel.tg_id == tg_id,
            )
            await session.commit()

    @classmethod
    async def get_users_list(
            cls,
            *filter,
            offset: Optional[int] = None,
            limit: Optional[int] = None,
            **filter_by
    ) -> Optional[list[User]]:
        async with async_session_maker() as session:
            users = await UserDAO.find_all(session, *filter, offset=offset, limit=limit, **filter_by)
        if users is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Users not found")
        # return users
        return [
            User(
                tg_id=db_user.tg_id,
                username=db_user.username,
                registration_date=db_user.registration_date,
                avatar_url=db_user.avatar_url,
                bio=db_user.bio,
            ) for db_user in users
        ]

    @classmethod
    async def get_user_history(cls, tg_id: int) -> Optional[list[UserHistory]]:
        async with async_session_maker() as session:
            user_history = await UserHistoryDAO.find_all(session, tg_id=tg_id)
        if user_history is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User history not found"
            )
        return user_history

    @classmethod
    async def create_record_in_user_history(cls, user_history: UserHistoryCreate) -> None:
        async with async_session_maker() as session:
            await UserHistoryDAO.add(
                session,
                UserHistoryDB(
                    tg_id=user_history.tg_id,
                    task=user_history.task,
                    true_answer=user_history.true_answer,
                    user_answer=user_history.user_answer,
                )
            )
            await session.commit()


