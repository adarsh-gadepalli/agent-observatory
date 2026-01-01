from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import json
import asyncio
import random

app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "Agent Orchestrator Running"}
