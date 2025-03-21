from src.database.base_dao import BaseDAO
from src.users.models import UserModel, UserHistoryModel, UserQuestModel
from src.users.schemas import User, UserHistory, UserQuests


class UserDAO(BaseDAO[UserModel, User]):
    model = UserModel


class UserHistoryDAO(BaseDAO[UserHistoryModel, UserHistory]):
    model = UserHistoryModel


class UserQuestDAO(BaseDAO[UserQuestModel, UserQuests]):
    model = UserQuestModel
