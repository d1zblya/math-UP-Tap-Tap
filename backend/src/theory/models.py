from sqlalchemy import Column, Integer, String

from ..database.session import Base


class TheoryModel(Base):
    __tablename__ = 'theory'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String(256))
    content = Column(String)

