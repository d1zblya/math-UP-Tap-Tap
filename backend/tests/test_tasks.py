import os
import sys

import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../")))

from src.main import app

client = TestClient(app)


def test_get_linear_equation():
    response = client.get("/tasks/linear-equation")
    assert response.status_code == 200
    json_data = response.json()

    if json_data:
        assert "equation" in json_data
        assert "equation_latex" in json_data
        assert "roots" in json_data
        assert isinstance(json_data["equation"], str)
        assert isinstance(json_data["equation_latex"], str)
        assert isinstance(json_data["roots"], (list, int))


def test_get_quadratic_equation():
    response = client.get("/tasks/quadratic-equation")
    assert response.status_code == 200
    json_data = response.json()

    if json_data:
        assert "equation" in json_data
        assert "equation_latex" in json_data
        assert "roots" in json_data
        assert isinstance(json_data["equation"], str)
        assert isinstance(json_data["equation_latex"], str)
        assert isinstance(json_data["roots"], list)
        assert all(isinstance(x, (int, float)) for x in json_data["roots"])
