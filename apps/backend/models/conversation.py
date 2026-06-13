from sqlalchemy import Column, String, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from .base import Base, TimestampMixin

class Conversation(TimestampMixin, Base):
    __tablename__ = "conversations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    session_id = Column(String, index=True, nullable=False) # For tracking conversation sessions
    message_history = Column(Text, nullable=False, default="[]") # JSON string of messages

    owner = relationship("User", back_populates="conversations")
