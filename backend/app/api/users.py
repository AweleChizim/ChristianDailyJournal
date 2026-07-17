from fastapi import APIRouter, Depends

from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.user import UserDelete, UserResponse
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

@router.get(
    "/me",
    response_model=UserResponse,
)
async def get_me(
    current_user: User = Depends(
        get_current_user
    ),
):
    return UserResponse(
        id=str(current_user.id),
        first_name=current_user.first_name,
        last_name=current_user.last_name,
        email=current_user.email,
        provider=current_user.provider
    )

@router.delete(
    "/me",
    status_code=204,
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