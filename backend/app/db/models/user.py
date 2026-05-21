from sqlalchemy import Column, BigInteger, Text, Boolean, TIMESTAMP
from sqlalchemy.sql import func
from app.db.base import Base

class User(Base):
    __tablename__ = "users"
    __table_args__ = {"schema": "auth"}

    id = Column(BigInteger, primary_key=True, index=True)
    email = Column(Text, unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())