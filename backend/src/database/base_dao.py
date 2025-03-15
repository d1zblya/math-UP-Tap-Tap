from typing import TypeVar, Generic, Optional, Union, Dict, Any

from loguru import logger
from pydantic import BaseModel
from sqlalchemy import select, insert, delete, update
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from src.database.session import Base

ModelType = TypeVar("ModelType", bound=Base)
SchemaType = TypeVar("SchemaType", bound=BaseModel)


class BaseDAO(Generic[ModelType, SchemaType]):
    model = None

    @classmethod
    async def find_one_or_none(cls, session: AsyncSession, *filter, **filter_by) -> Optional[ModelType]:
        query = select(cls.model).filter(*filter).filter_by(**filter_by)
        result = await session.execute(query)
        return result.scalars().one_or_none()

    @classmethod
    async def find_all(
            cls,
            session: AsyncSession,
            *filter,
            offset: Optional[int] = None,
            limit: Optional[int] = None,
            **filter_by
    ) -> list[ModelType]:
        query = (
            select(cls.model)
            .filter(*filter)
            .filter_by(**filter_by)
            .offset(offset)
            .limit(limit)
        )
        result = await session.execute(query)
        return result.scalars().all()

    @classmethod
    async def add(
            cls,
            session: AsyncSession,
            obj_in: Union[SchemaType, Dict[str, Any]]
    ) -> Optional[ModelType]:
        if isinstance(obj_in, dict):
            create_data = obj_in
        else:
            create_data = obj_in.model_dump(exclude_unset=True)
        try:
            query = insert(cls.model).values(
                **create_data).returning(cls.model)
            result = await session.execute(query)
            return result.scalars().first()
        except (SQLAlchemyError, Exception) as e:
            if isinstance(e, SQLAlchemyError):
                msg = "Database Exc: Cannot insert data into table"
            elif isinstance(e, Exception):
                msg = "Unknown Exc: Cannot insert data into table"
            logger.error(msg)
            raise e

        return None

    @classmethod
    async def delete(cls, session: AsyncSession, *filter, **filter_by) -> None:
        query = delete(cls.model).filter(*filter).filter_by(**filter_by)
        await session.execute(query)

    @classmethod
    async def update(
            cls,
            session: AsyncSession,
            *where,
            obj_in: Union[SchemaType, Dict[str, Any]],
    ) -> Optional[ModelType]:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)

        query = (
            update(cls.model).
            # where(cls.model.id == id).
            where(*where).
            values(**update_data).
            returning(cls.model)
        )
        result = await session.execute(query)
        return result.scalars().one()
