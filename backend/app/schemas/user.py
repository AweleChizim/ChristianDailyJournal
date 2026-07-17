from typing import Literal

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    provider: Literal["local", "google"]


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserPublic(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: EmailStr
    provider: Literal["local", "google"]


class SignupResponse(BaseModel):
    message: str
    user: UserPublic


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserPublic


class UserResponse(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    provider: Literal["local", "google"]

class UserDelete(BaseModel):
    password: str