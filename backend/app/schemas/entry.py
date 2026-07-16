from datetime import date, datetime

from pydantic import BaseModel, Field

from app.enums.entry_type import EntryType


class EntryCreate(BaseModel):

    entry_type: EntryType

    content: str = Field(
        min_length=1,
        max_length=10000,
    )

    entry_date: date

class EntryUpdate(BaseModel):
    content: str = Field(
        ...,
        min_length=1,
        max_length=10000,
    )

class EntryResponse(BaseModel):

    id: str

    entry_type: EntryType

    content: str

    entry_date: date

    is_favorite: bool

    is_archived: bool

    created_at: datetime

    updated_at: datetime