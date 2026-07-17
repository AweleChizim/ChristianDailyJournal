from fastapi import APIRouter
from app.schemas.verse import VerseResponse
from app.services.verse_service import VerseService

router = APIRouter(
    prefix="/verse",
    tags=["Verse"],
)

@router.get(
    "/today",
    response_model=VerseResponse,
)
async def today():

    verse = await VerseService.get_today()

    return VerseResponse(
        theme=verse.theme,
        reference=verse.reference,
        text=verse.text,
    )