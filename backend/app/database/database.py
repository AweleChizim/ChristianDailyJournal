from motor.motor_asyncio import AsyncIOMotorClient

from beanie import init_beanie

from app.core.config import settings

from app.models.user import User
from app.models.entry import Entry
from app.models.daily_verse import DailyVerse
import certifi
from motor.motor_asyncio import AsyncIOMotorClient



async def init_db():

    client = AsyncIOMotorClient(
        settings.MONGODB_URL,
        tls=True,
        tlsCAFile=certifi.where()
    )

    database = client[
        settings.DATABASE_NAME
    ]

    await init_beanie(
        database=database, 
        document_models=[
            User,
            Entry,
            DailyVerse,
        ]
    )