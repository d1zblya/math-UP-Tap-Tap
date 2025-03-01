from pydantic import BaseModel
from enum import Enum


class TaskType(Enum):
    LINEAR_EQUATION = "LinearEquation"
    QUADRATIC_EQUATION = "QuadraticEquation"
    SIMPLE_EXAMPLE = "SimpleExample"


class TaskComplexity(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"


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
