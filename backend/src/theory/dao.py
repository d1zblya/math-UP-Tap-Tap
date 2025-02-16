from .models import TheoryModel
from .schemas import Theory, TheoryUpdateDB, TheoryCreateDB
from ..database.base_dao import BaseDAO


class TheoryDAO(BaseDAO[Theory, TheoryCreateDB, TheoryUpdateDB]):
    model = TheoryModel
