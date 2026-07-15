from fastapi import APIRouter

from app.schemas.user import (
    UserCreate,
    UserLogin,
    SignupResponse,
    LoginResponse,
)

from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/signup", response_model=SignupResponse, status_code=201)
async def signup(user: UserCreate):
    return await AuthService.signup(user)


@router.post("/login", response_model=LoginResponse)
async def login(user: UserLogin):
    return await AuthService.login(user)