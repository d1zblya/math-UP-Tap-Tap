from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

from src.core.config import settings

connection_uri = settings.db.DATABASE_URL
if connection_uri.startswith("postgres://"):
    connection_uri = connection_uri.replace("postgres://", "postgresql://", 1)

engine = create_async_engine(
    connection_uri,
)
async_session_maker = async_sessionmaker(engine, autocommit=False, expire_on_commit=False)


class Base(DeclarativeBase):
    pass
