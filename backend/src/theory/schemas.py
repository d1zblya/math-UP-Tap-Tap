from typing import Optional

from pydantic import BaseModel, Field


class TheoryBase(BaseModel):
    title: Optional[str] = Field(None)
    description: Optional[str] = Field(None)
    content: Optional[str] = Field(None)


class Theory(TheoryBase):
    title: str
    description: str
    content: str

    class Config:
        from_attributes = True

