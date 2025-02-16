from typing import Optional

from fastapi import APIRouter

from src.tasks.schemas import TaskLinearEquation, TaskQuadraticEquation
from src.tasks.service import TaskService

task_router = APIRouter(prefix="/tasks", tags=["tasks"])


@task_router.get("/linear-equation")
async def get_linear_equation() -> Optional[TaskLinearEquation]:
    return await TaskService.get_linear_equation()


@task_router.get("/quadratic-equation")
async def get_quadratic_equation() -> Optional[TaskQuadraticEquation]:
    return await TaskService.get_quadratic_equation()
