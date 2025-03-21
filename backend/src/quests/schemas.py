from enum import Enum

from pydantic import BaseModel, Field

from src.tasks.schemas import TaskComplexity


class QuestType(Enum):
    SIMPLE_EXAMPLE = "SIMPLE_EXAMPLE"
    STREAK_EXAMPLE = "STREAK_EXAMPLE"


class Quests(BaseModel):
    id: int = Field(None)
    title: str = Field(...)
    description: str = Field(...)
    target: int = Field(...)
    reward: int = Field(...)
    task_complexity: TaskComplexity = Field(...)
