# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
from routes import router
from dotenv import load_dotenv
import os


# Database Configuration



load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create all tables in the database
Base.metadata.create_all(bind=engine)


# FastAPI App Setup


app = FastAPI(title="Placement Portal API")

# Allow frontend or external clients to call your API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this later for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your route definitions
app.include_router(router)


# Dependency for DB session


# You can use this dependency in your route functions when you start DB integration
from fastapi import Depends

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Root endpoint for testing
@app.get("/")
def home():
    return {"message": "Placement Portal API is running "}
