from fastapi import HTTPException, status
from fastapi.responses import JSONResponse
from typing import Any

class FalizException(HTTPException):
    def __init__(
        self,
        status_code: int = status.HTTP_400_BAD_REQUEST,
        detail: Any = None,
        message: str = "An error occurred",
        error_code: str = "FALIZ_ERROR",
    ):
        super().__init__(status_code=status_code, detail=detail)
        self.message = message
        self.error_code = error_code

async def faliz_exception_handler(request, exc: FalizException | HTTPException):
    if isinstance(exc, FalizException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": exc.error_code,
                "message": exc.message,
                "detail": exc.detail,
                "request_id": request.state.request_id if hasattr(request.state, "request_id") else None,
            },
        )
    elif isinstance(exc, HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": "HTTP_EXCEPTION",
                "message": exc.detail,
                "detail": exc.detail,
                "request_id": request.state.request_id if hasattr(request.state, "request_id") else None,
            },
        )
    else:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "error": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected error occurred.",
                "detail": str(exc),
                "request_id": request.state.request_id if hasattr(request.state, "request_id") else None,
            },
        )
