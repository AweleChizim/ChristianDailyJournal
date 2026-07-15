from fastapi import HTTPException, status

from app.models.user import User

from app.repositories.user_repository import UserRepository

from app.schemas.user import UserCreate, UserLogin

from app.auth.hashing import hash_password, verify_password

from app.auth.jwt_handler import create_access_token


class AuthService:

    @staticmethod
    async def signup(user: UserCreate):

        existing_user = await UserRepository.get_by_email(
            user.email
        )

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already exists."
            )

        new_user = User(
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            password_hash=hash_password(user.password)
        )

        await UserRepository.create(new_user)

        return {
            "message": "Account created successfully.",
            "user": {
                "id": str(new_user.id),
                "first_name": new_user.first_name,
                "last_name": new_user.last_name,
                "email": new_user.email
            }
        }

    @staticmethod
    async def login(user: UserLogin):

        existing_user = await UserRepository.get_by_email(
            user.email
        )

        if existing_user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password."
            )

        if not verify_password(
            user.password,
            existing_user.password_hash
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password."
            )

        token = create_access_token(
            {
                "sub": str(existing_user.id),
                "email": existing_user.email
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": str(existing_user.id),
                "first_name": existing_user.first_name,
                "last_name": existing_user.last_name,
                "email": existing_user.email
            }
        }