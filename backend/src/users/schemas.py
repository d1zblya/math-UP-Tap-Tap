from datetime import datetime, timezone
from pydantic import BaseModel, Field, ConfigDict

from src.quests.schemas import QuestType
from src.tasks.schemas import TaskComplexity


class User(BaseModel):
    tg_id: int = Field(..., gt=0)
    first_name: str = Field(..., min_length=1, max_length=100)
    solved_examples: int = Field(None, ge=0, description="Решенных примеров")
    correctly_solved_examples: int = Field(None, ge=0, description="Правильно решенных примеров")
    completed_quests: int = Field(None, ge=0, description="Завершенных квестов")
    points: int = Field(
        default=0,
        ge=0,
        description="Баллы пользователя. Значение по умолчанию — 0"
    )
    registration_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    bio: str = Field(default="Описание вашего профиля", max_length=256)

    model_config = ConfigDict(from_attributes=True)


class UserHistory(BaseModel):
    tg_id: int = Field(..., gt=0)
    task_complexity: TaskComplexity = Field(...)
    task: str = Field(..., min_length=1)
    points: int = Field(..., ge=0)
    true_answer: int = Field(...)
    user_answer: int = Field(...)


class UserQuests(BaseModel):
    tg_id: int = Field(..., gt=0)
    quest_id: int = Field(..., gt=0)
    is_completed: bool = Field(default=False)
    date_assigned: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    count_result: int = Field(
        default=0,
        ge=0,
        description="Счетчик увеличивается по мере выполнения заданий"
    )


class CheckUserQuests(BaseModel):
    quest_type: QuestType = Field(...)
    task_complexity: TaskComplexity = Field(...)
    true_answer: int = Field(...)
    user_answer: int = Field(...)
