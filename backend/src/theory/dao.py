from src.database.base_dao import BaseDAO
from src.theory.models import TheoryModel
from src.theory.schemas import Theory, TheoryCreateDB, TheoryUpdateDB


class TheoryDAO(BaseDAO[Theory, TheoryCreateDB, TheoryUpdateDB]):
    model = TheoryModel
