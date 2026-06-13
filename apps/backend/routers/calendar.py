from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from uuid import UUID

from ..core.database import get_db
from ..core.dependencies import get_current_active_user
from ..models.user import User
from ..models.calendar import CalendarEvent
from ..schemas.calendar import CalendarEventCreate, CalendarEventUpdate, CalendarEventOut

router = APIRouter()

@router.post("/", response_model=CalendarEventOut, status_code=status.HTTP_201_CREATED)
async def create_calendar_event(
    event_in: CalendarEventCreate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    new_event = CalendarEvent(**event_in.model_dump(), user_id=current_user.id)
    db.add(new_event)
    await db.commit()
    await db.refresh(new_event)
    return new_event

@router.get("/", response_model=List[CalendarEventOut])
async def get_calendar_events(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    events = await db.execute(CalendarEvent.select().where(CalendarEvent.user_id == current_user.id))
    return events.scalars().all()

@router.get("/{event_id}", response_model=CalendarEventOut)
async def get_calendar_event_by_id(
    event_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    event = await db.execute(CalendarEvent.select().where(CalendarEvent.id == event_id, CalendarEvent.user_id == current_user.id))
    event = event.scalar_one_or_none()
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Calendar event not found")
    return event

@router.put("/{event_id}", response_model=CalendarEventOut)
async def update_calendar_event(
    event_id: UUID,
    event_in: CalendarEventUpdate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    event = await db.execute(CalendarEvent.select().where(CalendarEvent.id == event_id, CalendarEvent.user_id == current_user.id))
    event = event.scalar_one_or_none()
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Calendar event not found")
    
    for field, value in event_in.model_dump(exclude_unset=True).items():
        setattr(event, field, value)
    
    await db.commit()
    await db.refresh(event)
    return event

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_calendar_event(
    event_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    event = await db.execute(CalendarEvent.select().where(CalendarEvent.id == event_id, CalendarEvent.user_id == current_user.id))
    event = event.scalar_one_or_none()
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Calendar event not found")
    
    await db.delete(event)
    await db.commit()
    return {"message": "Calendar event deleted successfully"}
