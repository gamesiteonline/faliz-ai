from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from starlette.types import ASGIApp
import uuid
import time
import logging
import structlog

# Configure structlog
structlog.configure(
    processors=[
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.dev.ConsoleRenderer()
    ],
    logger_factory=structlog.stdlib.LoggerFactory(),
    wrapper_class=structlog.stdlib.BoundLogger,
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger(__name__)

def setup_logging(app):
    # This will ensure that structlog captures logs from uvicorn and other libraries
    logging.basicConfig(level=logging.INFO, handlers=[logging.StreamHandler()])

class RequestIDMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp):
        super().__init__(app)

    async def dispatch(self, request: Request, call_next):
        request_id = str(uuid.uuid4())
        request.state.request_id = request_id
        response = await call_next(request)
        response.headers["X-Request-ID"] = request_id
        return response

class LoggingMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp):
        super().__init__(app)

    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        request_id = request.state.request_id if hasattr(request.state, "request_id") else "N/A"

        with logger.bind(request_id=request_id, method=request.method, path=request.url.path):
            logger.info("Request started")
            response = await call_next(request)
            process_time = time.time() - start_time
            logger.info("Request finished", status_code=response.status_code, process_time=f"{process_time:.4f}s")
            return response

def add_request_id_middleware(app):
    app.add_middleware(RequestIDMiddleware)
    app.add_middleware(LoggingMiddleware)
