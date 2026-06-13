from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

class CalendarEventBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    location: Optional[str] = None
    all_day: Optional[bool] = False

class CalendarEventCreate(CalendarEventBase):
    pass

class CalendarEventUpdate(CalendarEventBase):
    title: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

class CalendarEventOut(CalendarEventBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
