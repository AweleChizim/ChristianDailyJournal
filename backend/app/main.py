from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database.database import init_db
from app.api.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

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
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)


@app.get("/")
async def root():

    return {
        "message": "API is running."
    }