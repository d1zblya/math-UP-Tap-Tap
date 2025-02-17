from src.database.base_dao import BaseDAO
from src.users.models import UserModel, UserHistoryModel
from src.users.schemas import User, UserCreateDB, UserUpdateDB, UserHistoryDB


class UserDAO(BaseDAO[User, UserCreateDB, UserUpdateDB]):
    model = UserModel


class UserHistoryDAO(BaseDAO[User, UserHistoryDB, UserUpdateDB]):
    model = UserHistoryModel
