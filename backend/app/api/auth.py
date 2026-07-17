from fastapi import APIRouter, Depends, status
from app.dependencies.auth import get_current_user

from app.models.user import User
from app.schemas.user import (
    UserCreate,
    UserLogin,
    SignupResponse,
    LoginResponse,
    UserDelete,
)

from app.services.auth_service import AuthService
from app.schemas.google_auth import GoogleLoginRequest

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

@router.post("/google", response_model=LoginResponse)
async def google_login(
    request: GoogleLoginRequest,
):

    return await AuthService.google_login(
        request.credential,
    )

@router.delete(
    "/me",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_account(
    request: UserDelete,
    current_user: User = Depends(
        get_current_user,
    ),
):

    await AuthService.delete_account(
        current_user,
        request.password,
    )

@router.post(
    "/google/delete",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def google_delete(
    request: GoogleLoginRequest,
    current_user: User = Depends(
        get_current_user,
    ),
):

    await AuthService.google_delete(
        current_user=current_user,
        credential=request.credential,
    )