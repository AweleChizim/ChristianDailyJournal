from datetime import date, datetime

from beanie import Document
from pydantic import Field


class DailyVerse(Document):
    verse_date: date
    theme: str
    reference: str
    text: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "daily_verses"