from .models import UserModel, UserHistoryModel
from .schemas import User, UserCreateDB, UserUpdateDB, UserHistoryDB
from ..database.base_dao import BaseDAO


class UserDAO(BaseDAO[User, UserCreateDB, UserUpdateDB]):
    model = UserModel


class UserHistoryDAO(BaseDAO[User, UserHistoryDB, UserUpdateDB]):
    model = UserHistoryModel
