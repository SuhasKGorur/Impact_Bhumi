from typing import Annotated

from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_user
from app.models.user import User


router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/overview")
def dashboard_overview(
    current_user: Annotated[User, Depends(get_current_user)],
):
    return {
        "message": f"Welcome to {current_user.ngo.name}",
        "ngo": {
            "id": current_user.ngo.id,
            "name": current_user.ngo.name,
            "location": current_user.ngo.location,
            "focus_area": current_user.ngo.focus_area,
        },
        "current_user": {
            "name": current_user.full_name,
            "role": current_user.role,
        },
    }
