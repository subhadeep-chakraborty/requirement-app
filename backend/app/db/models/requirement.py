from sqlalchemy import Column, BigInteger, Text, TIMESTAMP, CheckConstraint
from sqlalchemy.sql import func
from app.db.base import Base

class Requirement(Base):
    __tablename__ = "requirements"
    __table_args__ = (
        CheckConstraint(
            "status IN ('open','processed','obsolete')",
            name="status_check"
        ),
        {"schema": "app"}
    )

    id = Column(BigInteger, primary_key=True, index=True)
    title = Column(Text, nullable=False)
    description = Column(Text)
    status = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())