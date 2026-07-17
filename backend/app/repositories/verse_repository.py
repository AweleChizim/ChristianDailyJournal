from datetime import date

from app.models.daily_verse import DailyVerse


class VerseRepository:

    @staticmethod
    async def get_today():
        return await DailyVerse.find_one(
            DailyVerse.verse_date == date.today()
        )

    @staticmethod
    async def create(
        verse_date,
        theme,
        reference,
        text,
    ):
        verse = DailyVerse(
            verse_date=verse_date,
            theme=theme,
            reference=reference,
            text=text,
        )

        await verse.insert()

        return verse