from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uvicorn

from .core.database import init_db, close_db
from .core.redis import init_redis, close_redis
from .core.middleware import add_request_id_middleware, setup_logging
from .core.exceptions import FalizException, faliz_exception_handler
from .routers import auth, chat, tasks, calendar, voice, email, system, plugins, memory, events, health
from .config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    await init_redis()
    print("FALIZ AI Backend starting up...")
    yield
    # Shutdown
    await close_db()
    await close_redis()
    print("FALIZ AI Backend shutting down.")

app = FastAPI(
    title="FALIZ AI Backend",
    version=settings.APP_VERSION,
    description="API for the FALIZ AI personal operating system",
    lifespan=lifespan,
)

# Setup logging
setup_logging(app)

# Add Request ID Middleware
add_request_id_middleware(app)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception Handlers
app.add_exception_handler(FalizException, faliz_exception_handler)
app.add_exception_handler(HTTPException, faliz_exception_handler)

# Include Routers
app.include_router(health.router, prefix="/health", tags=["Health"])
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])
app.include_router(calendar.router, prefix="/calendar", tags=["Calendar"])
app.include_router(voice.router, prefix="/voice", tags=["Voice"])
app.include_router(email.router, prefix="/email", tags=["Email"])
app.include_router(system.router, prefix="/system", tags=["System"])
app.include_router(plugins.router, prefix="/plugins", tags=["Plugins"])
app.include_router(memory.router, prefix="/memory", tags=["Memory"])
app.include_router(events.router, prefix="/events", tags=["Events"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
