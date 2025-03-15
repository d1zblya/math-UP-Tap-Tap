from src.database.base_dao import BaseDAO
from src.theory.models import TheoryModel
from src.theory.schemas import Theory


class TheoryDAO(BaseDAO[TheoryModel, Theory]):
    model = TheoryModel
