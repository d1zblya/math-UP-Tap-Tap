from datetime import datetime

from typing import Optional

from pydantic import BaseModel, Field


class UserBase(BaseModel):
    tg_id: Optional[int] = Field(None)
    points: Optional[int] = Field(None)
    bio: Optional[str] = Field(None)


class UserCreate(UserBase):
    tg_id: int


class UserUpdate(UserBase):
    tg_id: int
    bio: Optional[str]


class User(UserBase):
    tg_id: int
    points: int
    registration_date: datetime
    avatar_url: str
    bio: str

    class Config:
        from_attributes = True


class UserCreateDB(UserBase):
    tg_id: int


class UserUpdateDB(UserBase):
    tg_id: int
    bio: str


class UserHistoryBase(BaseModel):
    tg_id: Optional[int] = Field(None)
    task: Optional[str] = Field(None)
    true_answer: Optional[int] = Field(None)
    user_answer: Optional[int] = Field(None)


class UserHistory(UserHistoryBase):
    tg_id: int
    task: str
    true_answer: int
    user_answer: int


class UserHistoryCreate(UserHistoryBase):
    tg_id: Optional[int] = Field(None)
    task: str
    true_answer: int
    user_answer: int


class UserHistoryDB(UserHistoryBase):
    tg_id: int
