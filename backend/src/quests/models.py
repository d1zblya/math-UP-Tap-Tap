from sqlalchemy import Column, Integer, String, DateTime, func, BigInteger, ForeignKey, Enum, CheckConstraint

from src.database.session import Base
from src.tasks.schemas import TaskComplexity


class QuestModel(Base):
    __tablename__ = 'quests'

    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    description = Column(String(500), nullable=False)
    target = Column(Integer, nullable=False)
    reward = Column(Integer, nullable=False)
    task_complexity = Column(Enum(TaskComplexity), nullable=False)

