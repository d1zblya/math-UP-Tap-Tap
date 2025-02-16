from typing import Optional

from fastapi import HTTPException, status

from src.tasks.schemas import TaskLinearEquation, TaskQuadraticEquation
from src.tasks.utils import generate_linear_equations, generate_quadratic_equations

from loguru import logger


class TaskService:
    @classmethod
    async def get_linear_equation(cls) -> Optional[TaskLinearEquation]:
        try:
            linear_equation = await generate_linear_equations()
        except Exception as e:
            msg = f"Couldn't generate a linear equation, detail ---> {str(e)}"
            logger.error(msg)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=msg
            )
        return linear_equation

    @classmethod
    async def get_quadratic_equation(cls) -> Optional[TaskQuadraticEquation]:
        try:
            quadratic_equation = await generate_quadratic_equations()
        except Exception as e:
            msg = f"Couldn't generate a quadratic equation, detail ---> {str(e)}"
            logger.error(msg)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=msg
            )
        return quadratic_equation
