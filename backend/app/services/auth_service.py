from fastapi import HTTPException, status
from app.enums.entry_type import EntryType
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate, UserLogin
from app.auth.hashing import hash_password, verify_password
from app.auth.jwt_handler import create_access_token
from app.services.google_auth_service import GoogleAuthService
from app.repositories.entry_repository import EntryRepository


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
            password_hash=hash_password(user.password),
            provider="local",
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

        if existing_user.password_hash is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="This account uses Google Sign-In.",
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
                "email": existing_user.email,
                "provider": existing_user.provider
            }
        }
    
    @staticmethod
    async def google_login(
        credential: str,
    ):

        payload = GoogleAuthService.verify_token(
            credential,
        )

        if not payload.get("email_verified"):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Google email is not verified.",
            )

        email = payload["email"]

        first_name = payload.get(
            "given_name",
            "",
        )

        last_name = payload.get(
            "family_name",
            "",
        )

        existing_user = await UserRepository.get_by_email(
            email,
        )

        if existing_user is None:

            existing_user = User(
                first_name=first_name,
                last_name=last_name,
                email=email,
                password_hash=None,
                provider="google",
            )

            await UserRepository.create(
                existing_user,
            )

        token = create_access_token(
            {
                "sub": str(existing_user.id),
                "email": existing_user.email,
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": str(existing_user.id),
                "first_name": existing_user.first_name,
                "last_name": existing_user.last_name,
                "email": existing_user.email,
                "provider":  existing_user.provider
            },
        }
    
    @staticmethod
    async def delete_account(
        current_user: User,
        password: str,
    ):

        if current_user.password_hash is None:

            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Google accounts must be deleted using Google verification.",
            )

        if not verify_password(
            password,
            current_user.password_hash,
        ):

            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect password.",
            )

        await EntryRepository.delete_all_by_owner(
            str(current_user.id),
        )

        await UserRepository.delete(
            current_user,
        )

    @staticmethod
    async def google_delete(
        current_user: User,
        credential: str,
    ):

        payload = GoogleAuthService.verify_token(
            credential,
        )

        if not payload.get("email_verified"):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Google email is not verified.",
            )

        if payload["email"] != current_user.email:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Google account does not match the signed-in user.",
            )
        
        await EntryRepository.delete_all_by_owner(
            str(current_user.id),
        )

        await UserRepository.delete(current_user)