from datetime import date
import random

import httpx

from app.repositories.verse_repository import VerseRepository
from app.services.verse_themes import VERSE_THEMES


class VerseService:

    @staticmethod
    async def get_today():

        verse = await VerseRepository.get_today()

        if verse:
            return verse

        theme = random.choice(list(VERSE_THEMES.keys()))
        reference = random.choice(VERSE_THEMES[theme])

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://bible-api.com/{reference}"
            )

            response.raise_for_status()

            data = response.json()

        verse = await VerseRepository.create(
            verse_date=date.today(),
            theme=theme,
            reference=data["reference"],
            text=data["text"].strip(),
        )

        return verse