from pydantic import BaseModel
from enum import Enum


class TaskType(Enum):
    LINEAR_EQUATION = "LINEAR_EQUATION"
    QUADRATIC_EQUATION = "QUADRATIC_EQUATION"
    SIMPLE_EXAMPLE = "SIMPLE_EXAMPLE"


class TaskComplexity(Enum):
    EASY = "EASY"
    MEDIUM = "MEDIUM"
    HARD = "HARD"


class BaseTaskExample(BaseModel):
    type: TaskType
    expression: str
    expression_latex: str
    answers: list[int]


class FinalExpression(BaseModel):
    complexity: TaskComplexity
    type: TaskType
    expression: str
    expression_latex: str
    answers: list[int]
