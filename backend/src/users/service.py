from datetime import datetime
from typing import Optional, Union

from fastapi import HTTPException, status

from src.database.session import async_session_maker
from src.quests.dao import QuestDAO
from src.quests.schemas import Quests, QuestType
from src.users.dao import UserDAO, UserHistoryDAO, UserQuestDAO
from src.users.schemas import User, UserHistory, CheckUserQuests, UserQuests

from loguru import logger


class UserService:
    @classmethod
    async def get_or_create_user(cls, user: User) -> User:
        async with async_session_maker() as session:
            user_exist = await UserDAO.find_one_or_none(session, tg_id=user.tg_id)
            if user_exist is None:
                new_user = await UserDAO.add(
                    session,
                    User(
                        tg_id=user.tg_id,
                        first_name=user.first_name,
                    )
                )
                await session.commit()
                return new_user
            return user_exist

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
            msg = "Users not found"
            logger.error(msg)
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=msg)

        return users

    @classmethod
    async def get_user_history(cls, tg_id: int) -> Optional[list[UserHistory]]:
        async with async_session_maker() as session:
            user_history = await UserHistoryDAO.find_all(session, tg_id=tg_id)
        if user_history is None:
            msg = "User history not found"
            logger.error(msg)
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=msg)
        return user_history

    @classmethod
    async def create_record_in_user_history(cls, user_history: UserHistory) -> int:
        async with async_session_maker() as session:
            user = await UserDAO.find_one_or_none(session, tg_id=user_history.tg_id)
            if user is None:
                msg = "User not found"
                logger.error(msg)
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=msg)

            if user_history.user_answer == user_history.true_answer:
                user.correctly_solved_examples += 1
                user.points += user_history.points

            user.solved_examples += 1

            await session.commit()

            await UserHistoryDAO.add(session, user_history)
            user_points = user.points
            return user_points

    @classmethod
    async def check_user_quests(cls, tg_id: int, data_for_check_user_quests: CheckUserQuests) -> None:
        async with async_session_maker() as session:
            user_quests: list[UserQuests] = await UserQuestDAO.find_all(
                session,
                tg_id=tg_id,
                is_completed=False
            )

            for user_quest in user_quests:
                quest: Quests = await QuestDAO.find_one_or_none(session, id=user_quest.quest_id)

                if data_for_check_user_quests.task_complexity != quest.task_complexity:
                    continue

                if data_for_check_user_quests.quest_type == QuestType.SIMPLE_EXAMPLE:
                    if data_for_check_user_quests.user_answer == data_for_check_user_quests.true_answer:
                        user_quest.count_result += 1

                elif data_for_check_user_quests.quest_type == QuestType.STREAK_EXAMPLE:
                    if data_for_check_user_quests.true_answer == data_for_check_user_quests.user_answer:
                        user_quest.count_result += 1
                    else:
                        user_quest.count_result = 0
                        await session.commit()  # Ошиблись – сброс счётчика
                        continue

                if user_quest.count_result >= quest.target:
                    user = await UserDAO.find_one_or_none(session, tg_id=tg_id)
                    user.points += quest.reward
                    user.completed_quests += 1
                    user_quest.is_completed = True

                await session.commit()

    @classmethod
    async def get_user_assigned_quests(cls, tg_id: int) -> Union[list[UserQuests], UserQuests]:
        async with async_session_maker() as session:
            try:
                user_quests: list[UserQuests] = await UserQuestDAO.find_all(session, tg_id=tg_id)
            except Exception as e:
                msg = f"Cannot find user quests"
                logger.error(msg)
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=msg)
            user_assigned_quests = [user_quest for user_quest in user_quests if
                                    user_quest.date_assigned.date() >= datetime.now().date() and
                                    user_quest.is_completed == False]

            return user_assigned_quests

    @classmethod
    async def add_new_user_quest(cls, tg_id: int, quest_id: int) -> None:
        async with async_session_maker() as session:
            try:
                await UserQuestDAO.add(
                    session,
                    UserQuests(
                        tg_id=tg_id,
                        quest_id=quest_id,
                        is_completed=False,
                        date_assigned=datetime.now(),
                        count_result=0,
                    )
                )
                await session.commit()
            except Exception as e:
                msg = f"Cannot add new user quest ---> {str(e)}"
                logger.error(msg)
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=msg)
