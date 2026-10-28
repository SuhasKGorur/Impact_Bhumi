from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class NGORegister(BaseModel):
    ngo_name: str = Field(min_length=2, max_length=200)
    location: str = Field(min_length=2, max_length=200)
    focus_area: str = Field(min_length=2, max_length=150)

    full_name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    password: str = Field(min_length=8)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class NGOResponse(BaseModel):
    id: int
    name: str
    location: str
    focus_area: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserResponse(BaseModel):
    id: int
    ngo_id: int
    full_name: str
    email: EmailStr
    role: str
    ngo: NGOResponse

    model_config = ConfigDict(from_attributes=True)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
