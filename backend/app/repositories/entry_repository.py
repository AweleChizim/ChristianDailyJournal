from datetime import date
from typing import Optional
from beanie import PydanticObjectId
from pymongo import DESCENDING

from app.enums.entry_type import EntryType
from app.models.entry import Entry


class EntryRepository:

    @staticmethod
    async def create(entry: Entry) -> Entry:
        await entry.insert()
        return entry

    @staticmethod
    async def get_by_id(entry_id: str) -> Optional[Entry]:
        return await Entry.get(entry_id)

    @staticmethod
    async def get_user_entries(
        owner_id: str,
        entry_type: EntryType,
        entry_date: Optional[date] = None,
    ) -> list[Entry]:

        query = {
            "owner_id": owner_id,
            "entry_type": entry_type,
        }

        if entry_date:
            query["entry_date"] = entry_date

        return await (
            Entry.find(query)
            .sort([
                ("entry_date", DESCENDING),
                ("created_at", DESCENDING),
            ]) # type: ignore
            .to_list()
        )

    @staticmethod
    async def get_user_entry(
        entry_id: str,
        owner_id: str,
    ) -> Entry | None:

        return await Entry.find_one(
            Entry.id == PydanticObjectId(entry_id),
            Entry.owner_id == owner_id,
        )

    @staticmethod
    async def update(entry: Entry) -> Entry:
        await entry.save()
        return entry

    @staticmethod
    async def delete(entry: Entry):
        await entry.delete()

    @staticmethod
    async def delete_all_by_owner(
        owner_id: str,
    ):

        await Entry.find(
            Entry.owner_id == owner_id,
        ).delete()