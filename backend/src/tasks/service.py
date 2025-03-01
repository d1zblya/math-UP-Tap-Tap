import functools
import random
from typing import Optional

import sympy as sp
from sympy import latex
from sympy.parsing.latex import parse_latex

from fastapi import HTTPException, status
from loguru import logger

from src.tasks.gen import rnd_complication_with_steps
from src.tasks.schemas import (
    FinalExpression,
    TaskComplexity,
    TaskType,
    BaseTaskExample
)


class TaskService:
    @classmethod
    async def get_linear_equation(cls) -> Optional[BaseTaskExample]:
        try:
            linear_equation = await TaskGeneratorService.generate_linear_equations()
        except Exception as e:
            msg = f"Couldn't generate a linear equation, detail ---> {str(e)}"
            logger.error(msg)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=msg
            )
        return linear_equation

    @classmethod
    async def get_quadratic_equation(cls) -> Optional[BaseTaskExample]:
        try:
            quadratic_equation = await TaskGeneratorService.generate_quadratic_equations()
        except Exception as e:
            msg = f"Couldn't generate a quadratic equation, detail ---> {str(e)}"
            logger.error(msg)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=msg
            )
        return quadratic_equation

    @classmethod
    async def get_simple_example(cls) -> Optional[BaseTaskExample]:
        try:
            simple_example = await TaskGeneratorService.generate_simple_example(2)
        except Exception as e:
            msg = f"Couldn't generate a simple example, detail ---> {str(e)}"
            logger.error(msg)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=msg
            )
        return simple_example

    @classmethod
    async def get_easy_examples(cls) -> Optional[FinalExpression]:
        try:
            simple_example = await TaskGeneratorService.generate_simple_example(step=2)
        except Exception as e:
            msg = f"Couldn't generate a easy example, detail ---> {str(e)}"
            logger.error(msg)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=msg
            )
        return FinalExpression(
            complexity=TaskComplexity.EASY,
            type=simple_example.type,
            expression=simple_example.expression,
            expression_latex=simple_example.expression_latex,
            answers=simple_example.answers,
        )

    @classmethod
    async def get_medium_example(cls) -> Optional[FinalExpression]:
        try:
            medium_example = await TaskGeneratorService.generate_medium_example()
        except Exception as e:
            msg = f"Couldn't generate a medium example, detail ---> {str(e)}"
            logger.error(msg)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=msg
            )
        return FinalExpression(
            complexity=TaskComplexity.MEDIUM,
            type=medium_example.type,
            expression=medium_example.expression,
            expression_latex=medium_example.expression_latex,
            answers=medium_example.answers,
        )

    @classmethod
    async def get_hard_example(cls) -> Optional[FinalExpression]:
        try:
            hard_example = await TaskGeneratorService.generate_hard_exmaple()
        except Exception as e:
            msg = f"Couldn't generate a hard example, detail ---> {str(e)}"
            logger.error(msg)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=msg
            )
        return FinalExpression(
            complexity=TaskComplexity.HARD,
            type=hard_example.type,
            expression=hard_example.expression,
            expression_latex=hard_example.expression_latex,
            answers=hard_example.answers,
        )


class TaskGeneratorService:
    x = sp.Symbol("x")

    @classmethod
    async def generate_linear_equations(cls) -> BaseTaskExample:
        a, b = random.randint(1, 100), random.randint(-100, 100)
        x_solution = random.randint(-50, 50)
        c = a * x_solution + b

        linear_equation = sp.Eq(a * cls.x + b, c)
        latex_linear_equation = sp.latex(linear_equation)
        return BaseTaskExample(
            type=TaskType.LINEAR_EQUATION,
            expression=f"{a}*x + {b} = {c}",
            expression_latex=str(latex_linear_equation),
            answers=[x_solution]
        )

    @classmethod
    async def generate_quadratic_equations(cls) -> BaseTaskExample:
        r1, r2, a = random.randint(-50, 50), random.randint(-50, 50), 1

        simplified_quadratic_equation = sp.expand(a * ((cls.x - r1) * (cls.x - r2)))
        quadratic_equation = sp.Eq(simplified_quadratic_equation, 0)
        latex_quadratic_equation = sp.latex(quadratic_equation)
        return BaseTaskExample(
            type=TaskType.QUADRATIC_EQUATION,
            expression=f"{simplified_quadratic_equation} = 0",
            expression_latex=str(latex_quadratic_equation),
            answers=[r1, r2]
        )

    @classmethod
    async def generate_simple_example(cls, step: int) -> BaseTaskExample:
        answer = random.randint(1, 200)

        my_expression = rnd_complication_with_steps(answer, step)
        expression = parse_latex(my_expression)
        return BaseTaskExample(
            type=TaskType.SIMPLE_EXAMPLE,
            expression=my_expression,
            expression_latex=latex(expression),
            answers=[int(round(expression.evalf()))]
        )

    @classmethod
    async def generate_medium_example(cls) -> BaseTaskExample:
        if random.choice(["linear", "simple"]) == "linear":
            return await cls.generate_linear_equations()
        return await cls.generate_simple_example(step=3)

    @classmethod
    async def generate_hard_exmaple(cls) -> BaseTaskExample:
        equation_generators = {
            TaskType.LINEAR_EQUATION: cls.generate_linear_equations,
            TaskType.QUADRATIC_EQUATION: cls.generate_quadratic_equations,
            TaskType.SIMPLE_EXAMPLE: functools.partial(cls.generate_simple_example, 4),
        }

        selected_type = random.choice(list(equation_generators.keys()))
        return await equation_generators[selected_type]()
