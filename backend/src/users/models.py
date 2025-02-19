from sqlalchemy import Column, Integer, String, DateTime, func, BigInteger, ForeignKey

from src.database.session import Base


class UserModel(Base):
    __tablename__ = 'users'

    tg_id = Column(BigInteger, primary_key=True, index=True, unique=True)
    first_name = Column(String(100), nullable=False)
    points = Column(Integer, server_default="0")
    registration_date = Column(DateTime, server_default=func.now())
    bio = Column(String(256), default="Описание вашего профиля")


class UserHistoryModel(Base):
    __tablename__ = 'user_history'

    id = Column(Integer, primary_key=True, index=True, unique=True)
    tg_id = Column(BigInteger, ForeignKey('users.tg_id'))
    task = Column(String)
    true_answer = Column(Integer)
    user_answer = Column(Integer)
