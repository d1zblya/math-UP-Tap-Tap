from typing import Optional

from fastapi import HTTPException, status

from src.database.session import async_session_maker
from src.theory.dao import TheoryDAO
from src.theory.schemas import Theory

from loguru import logger


class TheoryService:
    @classmethod
    async def get_theory(cls, *filter, **filter_by) -> Optional[Theory]:
        async with async_session_maker() as session:
            theory = await TheoryDAO.find_one_or_none(session, *filter, **filter_by)
        if theory is None:
            msg = "TheoryPage not found"
            logger.error(msg)
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=msg
            )
        return theory

    @classmethod
    async def get_all_theories(cls, *filter, **filter_by) -> Optional[list[Theory]]:
        async with async_session_maker() as session:
            theories = await TheoryDAO.find_all(session, *filter, **filter_by)
        if theories is None:
            msg = "Not a single theory has been found"
            logger.error(msg)
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=msg
            )
        return [
            Theory(
                title=theory.title,
                description=theory.description,
                content=theory.content
            )
            for theory in theories
        ]

