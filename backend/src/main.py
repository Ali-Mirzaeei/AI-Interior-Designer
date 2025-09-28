# backend/src/main.py
from dotenv import load_dotenv
load_dotenv()  # باید قبل از ایمپورت‌های دیگه باشه

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from src.routes import generate

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starting AI Interior Design API")
    yield
    print("⛔ Shutting down API")

app = FastAPI(
    title="AI Interior Design API",
    description="API for generating interior design mockups using AI",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🚀 اینجا route ها رو mount کن
app.include_router(generate.router)

@app.get("/")
async def root():
    return {"message": "AI Interior Design API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
