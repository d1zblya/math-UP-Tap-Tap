from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey, Boolean, Enum
from sqlalchemy.orm import relationship

from src.database.session import Base
from src.tasks.schemas import TaskComplexity


class UserModel(Base):
    __tablename__ = 'users'

    tg_id = Column(Integer, primary_key=True, index=True, unique=True)
    first_name = Column(String(100), nullable=False)
    points = Column(Integer, nullable=False, server_default="0")
    registration_date = Column(DateTime, server_default=func.now())
    solved_examples = Column(Integer, nullable=False, server_default="0")
    correctly_solved_examples = Column(Integer, nullable=False, server_default="0")
    completed_quests = Column(Integer, nullable=False, server_default="0")
    bio = Column(String(256), default="Описание вашего профиля")


class UserHistoryModel(Base):
    __tablename__ = 'user_history'

    id = Column(Integer, primary_key=True, index=True, unique=True)
    tg_id = Column(Integer, ForeignKey('users.tg_id'), nullable=False)
    task = Column(String, nullable=False)
    true_answer = Column(Integer, nullable=False)
    user_answer = Column(Integer, nullable=False)
    points = Column(Integer, nullable=False)
    task_complexity = Column(Enum(TaskComplexity), nullable=False)


class UserQuestModel(Base):
    __tablename__ = 'user_quests'

    id = Column(Integer, primary_key=True)
    tg_id = Column(Integer, ForeignKey('users.tg_id'), nullable=False)
    quest_id = Column(Integer, ForeignKey('quests.id'), nullable=False)
    is_completed = Column(Boolean, server_default="False")
    date_assigned = Column(DateTime, server_default=func.now())
    count_result = Column(Integer, server_default="0")
