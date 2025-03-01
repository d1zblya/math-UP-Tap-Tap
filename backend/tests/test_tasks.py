import os
import sys

import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../")))

from src.main import app

client = TestClient(app)

BASE_TASK_KEYS = {"type", "expression", "expression_latex", "answers"}
FINAL_EXPRESSION_KEYS = BASE_TASK_KEYS | {"complexity"}

ENDPOINTS = [
    ("/api/tasks/linear-equations", BASE_TASK_KEYS),
    ("/api/tasks/quadratic-equations", BASE_TASK_KEYS),
    ("/api/tasks/simple-examples", BASE_TASK_KEYS),
    ("/api/tasks/easy-examples", FINAL_EXPRESSION_KEYS),
    ("/api/tasks/medium-examples", FINAL_EXPRESSION_KEYS),
    ("/api/tasks/hard-examples", FINAL_EXPRESSION_KEYS),
]


@pytest.mark.parametrize("endpoint,expected_keys", ENDPOINTS)
def test_task_service_endpoints(endpoint, expected_keys):
    """Универсальный тест для всех эндпоинтов TaskService"""
    response = client.get(endpoint)
    assert response.status_code == 200, f"Ошибка {response.status_code}, ответ: {response.text}"

    json_data = response.json()
    assert isinstance(json_data, dict) and json_data, "Ответ API должен быть непустым словарем"

    assert expected_keys.issubset(json_data.keys()), f"Нет ожидаемых ключей {expected_keys}, ответ: {json_data}"

    assert isinstance(json_data["expression"], str)
    assert isinstance(json_data["expression_latex"], str)
    assert isinstance(json_data["answers"], list) and all(isinstance(x, (int, float)) for x in json_data["answers"])

    if "complexity" in json_data:
        assert json_data["complexity"] in {"Easy", "Medium", "Hard"}, \
            f"Некорректная сложность: {json_data['complexity']}"
