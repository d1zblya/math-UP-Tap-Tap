from fastapi import APIRouter

from src.tasks.schemas import BaseTaskExample, FinalExpression
from src.tasks.service import TaskService

task_router = APIRouter(prefix="/api/tasks", tags=["tasks"])


@task_router.get("/linear-equations", summary="Получение линейного уравнения")
async def get_linear_equations() -> BaseTaskExample:
    return await TaskService.get_linear_equation()


@task_router.get("/quadratic-equations", summary="Получение квадратного уравнения")
async def get_quadratic_equations() -> BaseTaskExample:
    return await TaskService.get_quadratic_equation()


@task_router.get("/simple-examples", summary="Получение простого примера")
async def get_simple_examples() -> BaseTaskExample:
    return await TaskService.get_simple_example()


@task_router.get("/easy-examples", summary="Получение лёгких примеров")
async def get_easy_examples() -> FinalExpression:
    return await TaskService.get_easy_examples()


@task_router.get("/medium-examples", summary="Получение средних примеров")
async def get_medium_examples() -> FinalExpression:
    return await TaskService.get_medium_example()


@task_router.get("/hard-examples", summary="Получение сложных примеров")
async def get_hard_examples() -> FinalExpression:
    return await TaskService.get_hard_example()
