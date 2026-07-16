from datetime import date, datetime

from beanie import Document
from pydantic import Field

from app.enums.entry_type import EntryType


class Entry(Document):

    owner_id: str

    entry_type: EntryType

    encrypted_content: str

    entry_date: date

    is_favorite: bool = False

    is_archived: bool = False

    created_at: datetime = Field(default_factory=datetime.utcnow)

    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "entries"