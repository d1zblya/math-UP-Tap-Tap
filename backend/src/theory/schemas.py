from typing import Optional

from pydantic import BaseModel, Field


class TheoryBase(BaseModel):
    title: Optional[str] = Field(None)
    description: Optional[str] = Field(None)
    content: Optional[str] = Field(None)


# class TheoryCreate(TheoryBase):
#     tg_id: int


class TheoryUpdate(TheoryBase):
    tg_id: int
    username: Optional[str]
    bio: Optional[str]


class Theory(TheoryBase):
    title: str
    description: str
    content: str

    class Config:
        from_attributes = True


class TheoryCreateDB(TheoryBase):
    tg_id: int


class TheoryUpdateDB(TheoryBase):
    tg_id: int
    username: Optional[str]
    bio: Optional[str]

