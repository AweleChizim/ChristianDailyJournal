from app.encryption.encryption_service import EncryptionService
from app.models.entry import Entry
from app.schemas.entry import EntryResponse


class EntryMapper:

    @staticmethod
    def to_response(entry: Entry) -> EntryResponse:
        return EntryResponse(
            id=str(entry.id),
            entry_type=entry.entry_type,
            content=EncryptionService.decrypt(
                entry.encrypted_content
            ),
            entry_date=entry.entry_date,
            is_favorite=entry.is_favorite,
            is_archived=entry.is_archived,
            created_at=entry.created_at,
            updated_at=entry.updated_at,
        )