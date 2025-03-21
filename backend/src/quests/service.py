from typing import Union

from fastapi import HTTPException, status

from src.database.session import async_session_maker
from src.quests.dao import QuestDAO

from loguru import logger

from src.quests.schemas import Quests


class QuestService:
    @classmethod
    async def get_all_quests(cls) -> Union[list[Quests], Quests, None]:
        async with async_session_maker() as session:
            quests = await QuestDAO.find_all(session)
            if quests is None:
                msg = "Quests not found"
                logger.error(msg)
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=msg)
            return quests

