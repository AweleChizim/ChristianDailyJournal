from fastapi import APIRouter, Depends, Query, status
from datetime import date
from app.enums.entry_type import EntryType
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.entry import EntryCreate, EntryResponse, EntryUpdate
from app.services.entry_service import EntryService

router = APIRouter(
    prefix="/entries",
    tags=["Entries"],
)

@router.post(
    "",
    response_model=EntryResponse,
)
async def create_entry(
    entry: EntryCreate,
    current_user: User = Depends(
        get_current_user
    ),
):
    return await EntryService.create_entry(
        entry,
        current_user,
    )

@router.get(
    "",
    response_model=list[EntryResponse],
)
async def get_entries(
    type: EntryType = Query(...),
    date: date | None = Query(None),
    current_user: User = Depends(
        get_current_user
    ),
):

    return await EntryService.get_entries(
        current_user=current_user,
        entry_type=type,
        entry_date=date,
    )

@router.get(
    "/{entry_id}",
    response_model=EntryResponse,
)
async def get_entry(
    entry_id: str,
    current_user: User = Depends(
        get_current_user
    ),
):

    return await EntryService.get_entry(
        entry_id,
        current_user,
    )

@router.patch(
    "/{entry_id}",
    response_model=EntryResponse,
)
async def update_entry(
    entry_id: str,
    update: EntryUpdate,
    current_user: User = Depends(
        get_current_user
    ),
):

    return await EntryService.update_entry(
        entry_id,
        update,
        current_user,
    )

@router.delete(
    "/{entry_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_entry(
    entry_id: str,
    current_user: User = Depends(
        get_current_user
    ),
):

    await EntryService.delete_entry(
        entry_id,
        current_user,
    )