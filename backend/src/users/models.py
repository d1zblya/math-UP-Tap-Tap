from sqlalchemy import Column, Integer, String, DateTime, func, BigInteger, ForeignKey

from src.database.session import Base


class UserModel(Base):
    __tablename__ = 'users'

    tg_id = Column(BigInteger, primary_key=True, index=True, unique=True)
    points = Column(Integer, default=0)
    registration_date = Column(DateTime, default=func.now())
    bio = Column(String, default="Описание вашего профиля")


class UserHistoryModel(Base):
    __tablename__ = 'user_history'

    id = Column(Integer, primary_key=True, index=True, unique=True)
    tg_id = Column(BigInteger, ForeignKey('users.tg_id'))
    task = Column(String)
    true_answer = Column(Integer)
    user_answer = Column(Integer)
