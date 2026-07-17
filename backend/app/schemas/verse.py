from pydantic import BaseModel


class VerseResponse(BaseModel):
    theme: str
    reference: str
    text: str