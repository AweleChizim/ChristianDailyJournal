from datetime import date

from fastapi import HTTPException

from app.enums.entry_type import EntryType
from app.mappers.entry_mapper import EntryMapper
from app.encryption.encryption_service import EncryptionService
from app.models.entry import Entry
from app.models.user import User
from app.repositories.entry_repository import EntryRepository
from app.schemas.entry import EntryCreate, EntryResponse, EntryUpdate

class EntryService:

    @staticmethod
    async def create_entry(
        entry_data: EntryCreate,
        current_user: User,
    ) -> EntryResponse:

        encrypted = EncryptionService.encrypt(
            entry_data.content
        )

        entry = Entry(
            owner_id=str(current_user.id),
            entry_type=entry_data.entry_type,
            encrypted_content=encrypted,
            entry_date=date.today(),
        )

        saved = await EntryRepository.create(entry)

        return EntryMapper.to_response(saved)
    
    @staticmethod
    async def get_entries(
        current_user: User,
        entry_type: EntryType,
        entry_date: date | None = None,
    ):

        entries = await EntryRepository.get_user_entries(
            owner_id=str(current_user.id),
            entry_type=entry_type,
            entry_date=entry_date,
        )

        return [
            EntryMapper.to_response(entry)
            for entry in entries
        ]
    
    @staticmethod
    async def get_entry(
        entry_id: str,
        current_user: User,
    ):

        entry = await EntryRepository.get_user_entry(
            entry_id,
            str(current_user.id),
        )

        if entry is None:
            raise HTTPException(
                status_code=404,
                detail="Entry not found.",
            )

        return EntryMapper.to_response(entry)
    
    @staticmethod
    async def update_entry(
        entry_id: str,
        update_data: EntryUpdate,
        current_user: User,
    ):

        entry = await EntryRepository.get_user_entry(
            entry_id,
            str(current_user.id),
        )

        if entry is None:
            raise HTTPException(
                status_code=404,
                detail="Entry not found.",
            )

        entry.encrypted_content = EncryptionService.encrypt(
            update_data.content
        )

        updated = await EntryRepository.update(entry)

        return EntryMapper.to_response(updated)
    
    @staticmethod
    async def delete_entry(
        entry_id: str,
        current_user: User,
    ):

        entry = await EntryRepository.get_user_entry(
            entry_id,
            str(current_user.id),
        )

        if entry is None:
            raise HTTPException(
                status_code=404,
                detail="Entry not found.",
            )

        await EntryRepository.delete(entry)