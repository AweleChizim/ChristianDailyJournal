from typing import Literal

from beanie import Document
from pydantic import EmailStr


class User(Document):
    first_name: str
    last_name: str
    email: EmailStr
    password_hash: str | None = None
    provider: Literal["local", "google"] = "local"

    class Settings:
        name = "users"