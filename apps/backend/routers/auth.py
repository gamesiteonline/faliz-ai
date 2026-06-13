from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.database import get_db
from ..core.security import verify_password, create_access_token
from ..core.exceptions import FalizException
from ..schemas.auth import Token, UserCreate, UserOut
from ..models.user import User

router = APIRouter()

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def register_user(
    user_in: UserCreate,
    db: AsyncSession = Depends(get_db)
) -> Any:
    user = await db.execute(User.select().where(User.email == user_in.email))
    if user.scalar_one_or_none():
        raise FalizException(
            status_code=status.HTTP_400_BAD_REQUEST,
            message="User with this email already exists",
            error_code="EMAIL_ALREADY_EXISTS"
        )
    
    # Hash password (assuming security.py has get_password_hash)
    from ..core.security import get_password_hash
    hashed_password = get_password_hash(user_in.password)
    
    new_user = User(email=user_in.email, hashed_password=hashed_password, full_name=user_in.full_name)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
) -> Any:
    user = await db.execute(User.select().where(User.email == form_data.username))
    user = user.scalar_one_or_none()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise FalizException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            message="Incorrect email or password",
            error_code="INVALID_CREDENTIALS",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=30) # Example expiry
    access_token = create_access_token(
        subject=user.id,
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
