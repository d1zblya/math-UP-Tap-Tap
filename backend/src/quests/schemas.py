from pydantic import BaseModel, Field

from src.tasks.schemas import TaskComplexity


class Quests(BaseModel):
    id: int = Field(None)
    title: str = Field(...)
    description: str = Field(...)
    target: int = Field(...)
    reward: int = Field(...)
    task_complexity: TaskComplexity = Field(...)
