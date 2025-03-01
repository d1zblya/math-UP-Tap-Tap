from random import randint, random, choice

import re


def simplify_fractions(expression: str) -> str:
    """Заменяет все числа вида 24.0, 943.0, 1.0 на 24, 943, 1"""
    return re.sub(r'(\d+)\.0\b', r'\1', expression)


def rounding_nums(*args: float, acc: int = 2) -> list[str]:
    """Округляет числа до заданной величины"""
    rounded_nums = []
    for arg in args:
        num = round(arg, acc)
        rounded_nums.append(str(num) if num > 0 else f'({num})')
    return rounded_nums


def difficult_sum(num: float) -> str:
    """Усложнение суммой"""
    rnd = [randint(1, 100), round(random() * 10, 2), round(random() * 100, 2)]
    a = choice(rnd)
    b = num - a
    a, b = rounding_nums(a, b, acc=2)
    return f'({a} + {b})'


def difficult_sub(num: float) -> str:
    """Усложнение вычитанием"""
    rnd = [randint(1, 100), round(random() * 10, 2), round(random() * 100, 2)]
    a = choice(rnd)
    b = a - num
    a, b = rounding_nums(a, b, acc=2)
    return f'({a} - {b})'


def difficult_div(num: float) -> str:
    """Усложнение делением"""
    int_part = int(num)
    frac_part = num - int_part

    b = randint(2, 30)
    a = int_part * b

    fraction_expr = '\\frac{' + str(a) + '}{' + str(b) + '}'
    if frac_part:
        return f"({fraction_expr} + {round(frac_part, 2)})"
    return fraction_expr


def difficult_mul(num: float) -> str:
    """Усложнение умножением"""
    int_part = int(num)
    frac_part = num - int_part

    b = choice([2, 4, 5, 8, 10, 25, 50, 100, 200])
    a = int_part / b

    mul_expr = f"{a} * {b}"
    if frac_part:
        return f"({mul_expr} + {round(frac_part, 2)})"
    return mul_expr


# Список функций усложнения выражений
funcs = [difficult_sum, difficult_div, difficult_mul, difficult_sub]


def separation_of_nums(expression: str) -> list[tuple[int, int]]:
    """Нахождение индексов чисел в строке"""
    exp = list(expression)
    nums = '1234567890.'
    for i in range(len(exp)):
        # A - цифра, B - буква *A A B A B A A*
        if exp[i] in nums:
            exp[i] = 'A'
        else:
            exp[i] = 'B'
    begin = []
    end = []
    for i in range(len(exp) - 1):
        syb = exp[i] + exp[i + 1]
        if syb == 'AB':
            end.append(i)
        elif syb == 'BA':
            begin.append(i)
    if expression[-1] in nums:
        end.append(len(exp) - 1)
    if expression[0] in nums:
        begin = [-1] + begin
    return [(x + 1, y + 1) for x, y in zip(begin, end)]


def complication(num: float) -> str:
    """Применение рандомной функции"""
    return choice(funcs)(num)


def rnd_complication(expression: str) -> str:
    """Усложнение выражения"""
    x, y = choice(separation_of_nums(expression))
    expression = expression[:x] + complication(float(expression[x:y])) + expression[y:]
    return expression


def rnd_complication_with_steps(answer: float, steps: int) -> str:
    """Усложнение выражения по шагам"""
    answer = str(answer)
    for _ in range(steps):
        answer = rnd_complication(answer)
    return simplify_fractions(answer)
