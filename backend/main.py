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

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            config_data = await websocket.receive_text()
            config = json.loads(config_data)
            print(f"Received config: {config}")

            # default steps for simulation if none provided
            steps = config.get("steps", [
                {"id": "1", "type": "reasoning", "content": "Analyzing request..."},
                {"id": "2", "type": "memory", "content": "Querying database..."},
                {"id": "3", "type": "tool", "content": "Executing search..."},
                {"id": "4", "type": "reasoning", "content": "Finalizing answer..."}
            ])

            # simulate steps
            for step in steps:
                step["status"] = "running"
                await websocket.send_json(step)
                
                await asyncio.sleep(1.0) 
                step["status"] = "completed"
                await websocket.send_json(step)

            # Notify completion
            await websocket.send_json({"type": "complete", "status": "success"})

    except Exception as e:
        print(f"Client disconnected: {e}")
