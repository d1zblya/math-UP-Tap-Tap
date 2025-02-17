import logging

from dotenv import load_dotenv
from pydantic import AnyHttpUrl, validator
from typing import List, Union
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()


class DBSettings(BaseSettings):
    POSTGRES_SERVER: str
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str = ""
    POSTGRES_DB: str = ""

    @property
    def DATABASE_URL(self):
        return (f"postgresql+asyncpg://"
                f"{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@"
                f"{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}")


class LoggingSettings(BaseSettings):
    LOGGING_LEVEL: int = logging.INFO


class Settings(BaseSettings):
    BOT_TOKEN: str

    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8

    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",
        "http://localhost:8001",
        "http://localhost:8000"
    ]

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    db: DBSettings = DBSettings()
    logging: LoggingSettings = LoggingSettings()

    model_config = SettingsConfigDict(env_file=".env", extra="allow")


settings = Settings()
