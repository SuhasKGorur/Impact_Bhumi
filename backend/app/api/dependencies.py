from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import read_user_id_from_token
from app.models.user import User


bearer_scheme = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: Annotated[
        HTTPAuthorizationCredentials | None,
        Depends(bearer_scheme),
    ],
    db: Annotated[Session, Depends(get_db)],
) -> User:
    error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Authentication required or token invalid.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if credentials is None:
        raise error

    user_id = read_user_id_from_token(credentials.credentials)

    if user_id is None:
        raise error

    user = db.get(User, user_id)

    if user is None or not user.is_active or not user.ngo.is_active:
        raise error

    return user
