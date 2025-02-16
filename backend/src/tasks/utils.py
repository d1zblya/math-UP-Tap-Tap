import sympy as sp
import random

from src.tasks.schemas import TaskLinearEquation, TaskQuadraticEquation

x = sp.Symbol("x")


async def generate_linear_equations() -> TaskLinearEquation:
    a, b = random.randint(1, 100), random.randint(-100, 100)
    x_solution = random.randint(-50, 50)
    c = a * x_solution + b

    linear_equation = sp.Eq(a * x + b, c)
    latex_linear_equation = sp.latex(linear_equation)
    return TaskLinearEquation(
        equation=f"{a}*x + {b} = {c}",
        equation_latex=str(latex_linear_equation),
        roots=[x_solution]
    )


async def generate_quadratic_equations() -> TaskQuadraticEquation:
    r1, r2, a = random.randint(-50, 50), random.randint(-50, 50), 1  # random.randint(-3, 3)

    simplified_quadratic_equation = sp.expand(a * ((x - r1) * (x - r2)))
    quadratic_equation = sp.Eq(simplified_quadratic_equation, 0)
    latex_quadratic_equation = sp.latex(quadratic_equation)
    return TaskQuadraticEquation(
        equation=f"{simplified_quadratic_equation} = 0",
        equation_latex=str(latex_quadratic_equation),
        roots=[r1, r2]
    )
