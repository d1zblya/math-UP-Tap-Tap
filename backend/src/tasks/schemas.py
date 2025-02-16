from pydantic import BaseModel


class TaskLinearEquation(BaseModel):
    equation: str
    equation_latex: str
    roots: list


class TaskQuadraticEquation(BaseModel):
    equation: str
    equation_latex: str
    roots: list
