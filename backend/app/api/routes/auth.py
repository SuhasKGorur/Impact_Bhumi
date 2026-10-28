from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.models.ngo import NGO
from app.models.user import User
from app.schemas.auth import (
    LoginRequest,
    NGORegister,
    TokenResponse,
    UserResponse,
)


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    data: NGORegister,
    db: Annotated[Session, Depends(get_db)],
):
    email = str(data.email).lower()

    existing = db.scalar(
        select(User).where(User.email == email),
    )

    if existing is not None:
        raise HTTPException(
            status_code=409,
            detail="This email is already registered.",
        )

    if len(data.password.encode("utf-8")) > 72:
        raise HTTPException(
            status_code=422,
            detail="Password must be at most 72 UTF-8 bytes.",
        )

    try:
        ngo = NGO(
            name=data.ngo_name.strip(),
            location=data.location.strip(),
            focus_area=data.focus_area.strip(),
        )

        db.add(ngo)
        db.flush()

        user = User(
            ngo_id=ngo.id,
            full_name=data.full_name.strip(),
            email=email,
            hashed_password=hash_password(data.password),
            role="admin",
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=409,
            detail="Registration conflicts with an existing account.",
        )


@router.post("/login", response_model=TokenResponse)
def login(
    data: LoginRequest,
    db: Annotated[Session, Depends(get_db)],
):
    email = str(data.email).lower()

    user = db.scalar(
        select(User).where(User.email == email),
    )

    if (
        user is None
        or not verify_password(data.password, user.hashed_password)
        or not user.is_active
        or not user.ngo.is_active
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    return TokenResponse(
        access_token=create_access_token(user.id),
    )


@router.get("/me", response_model=UserResponse)
def get_my_profile(
    current_user: Annotated[User, Depends(get_current_user)],
):
    return current_user
