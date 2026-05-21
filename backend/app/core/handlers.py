from fastapi import Request
from fastapi.responses import JSONResponse
from app.core.exceptions import AppException
from app.core.logger import logger


async def app_exception_handler(request: Request, exc: AppException):
    logger.warning(f"{request.method} {request.url} -> {exc.message}")

    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message},
    )


async def generic_exception_handler(request: Request, exc: Exception):
    logger.error(f"{request.method} {request.url} -> {str(exc)}")

    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error"},
    )