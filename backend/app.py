from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.router import router

app = FastAPI()

origins = [
  "http://localhost:5173", # Vite dev client
  "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # or ["*"] for quick testing (not with credentials)
    allow_methods=["*"],            # GET, POST, OPTIONS, etc.
    allow_headers=["*"],            # Authorization, Content-Type, etc.
)

@app.get("/health")
def health_check():
  return {"status": "healthy", "version": "0.0.1"}

app.include_router(
  router
)