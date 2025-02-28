from src.database.base_dao import BaseDAO
from src.users.models import UserModel, UserHistoryModel
from src.users.schemas import User, UserHistoryCreate, UserCreate, UserUpdate


class UserDAO(BaseDAO[User, UserCreate, UserUpdate]):
    model = UserModel


class UserHistoryDAO(BaseDAO[User, UserHistoryCreate, None]):
    model = UserHistoryModel
