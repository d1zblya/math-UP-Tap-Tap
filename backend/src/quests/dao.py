from src.quests.models import QuestModel
from src.quests.schemas import Quests
from src.database.base_dao import BaseDAO


class QuestDAO(BaseDAO[QuestModel, Quests]):
    model = QuestModel
