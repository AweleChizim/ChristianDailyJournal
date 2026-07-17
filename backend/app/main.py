from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends

from app.api.users import router as users_router
from app.database.database import init_db
from app.api.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

from app.dependencies.auth import get_current_user
from app.models.user import User
from app.api.entries import router as entry_router
from app.api.verse import router as verse_router


@asynccontextmanager
async def lifespan(app: FastAPI):

    print("Connecting to MongoDB...")

    await init_db()

    print("Connected!")

    yield

    print("Application shutting down...")


app = FastAPI(
    title="Christian Daily Journal API",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://christiandailyjournal-ac.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():

    return {
        "message": "API is running."
    }

app.include_router(auth_router)
app.include_router(entry_router)
app.include_router(verse_router)
app.include_router(users_router)

@app.get("/me")
async def me(
    current_user: User = Depends(get_current_user),
):
    return {
        "id": str(current_user.id),
        "email": current_user.email,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
    }