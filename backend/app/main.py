from fastapi import FastAPI
from app.core.logger import setup_logging
from app.api import auth
from app.core.handlers import app_exception_handler, generic_exception_handler
from app.core.exceptions import AppException
from app.api import requirements
from fastapi.middleware.cors import CORSMiddleware

setup_logging()

app = FastAPI()

app.add_exception_handler(AppException, app_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(requirements.router)
app.include_router(auth.router)