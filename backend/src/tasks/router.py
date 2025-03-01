from fastapi import APIRouter

from src.tasks.schemas import BaseTaskExample, FinalExpression
from src.tasks.service import TaskService

task_router = APIRouter(prefix="/api/tasks", tags=["tasks"])


@task_router.get("/linear-equations")
async def get_linear_equations() -> BaseTaskExample:
    return await TaskService.get_linear_equation()


@task_router.get("/quadratic-equations")
async def get_quadratic_equations() -> BaseTaskExample:
    return await TaskService.get_quadratic_equation()


@task_router.get("/simple-examples")
async def get_simple_examples() -> BaseTaskExample:
    return await TaskService.get_simple_example()


@task_router.get("/easy-examples")
async def get_easy_examples() -> FinalExpression:
    return await TaskService.get_easy_examples()


@task_router.get("/medium-examples")
async def get_medium_examples() -> FinalExpression:
    return await TaskService.get_medium_example()


@task_router.get("/hard-examples")
async def get_hard_examples() -> FinalExpression:
    return await TaskService.get_hard_example()
