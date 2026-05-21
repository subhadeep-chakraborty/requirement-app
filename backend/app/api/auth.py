from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text, select

from app.schemas.auth import UserCreate, UserLogin
from app.db.session import get_db
from app.utils.security import hash_password, verify_password, create_access_token
from app.core.exceptions import AuthenticationError, BadRequestError
from app.core.logger import logger
from app.db.models.user import User

router = APIRouter(prefix="/auth", tags=["Auth"])


# -----------------------
# SIGNUP
# -----------------------
@router.post("/signup")
async def signup(user: UserCreate, db: AsyncSession = Depends(get_db)):
    logger.info(f"Signup attempt for {user.email}")

    # Check existing user
    result = await db.execute(
        select(User).where(User.email == user.email)
    )
    existing = result.scalar_one_or_none()

    if existing:
        logger.warning(f"Signup failed - email exists: {user.email}")
        raise BadRequestError("Email already registered")

    # Hash password
    hashed_pw = hash_password(user.password)

    # Create user
    new_user = User(
        email=user.email,
        password_hash=hashed_pw,
        is_active=True
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    logger.info(f"User created: {user.email}")

    return {"message": "User created successfully"}


# -----------------------
# LOGIN
# -----------------------
@router.post("/login")
async def login(user: UserLogin, db: AsyncSession = Depends(get_db)):
    logger.info(f"Login attempt for {user.email}")

    # Fetch user
    result = await db.execute(
        select(User).where(User.email == user.email)
    )
    db_user = result.scalar_one_or_none()

    if not db_user:
        raise AuthenticationError("User not found")

    # Verify password
    if not verify_password(user.password, db_user.password_hash):
        raise AuthenticationError("Invalid password")

   
    token = create_access_token({"sub": str(db_user.id)})

    return {
        "access_token": token,
        "token_type": "bearer"
    }