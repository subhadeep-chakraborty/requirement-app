# app/core/dependencies.py

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.session import get_db
from app.db.models.user import User
from app.utils.security import verify_token
from app.core.exceptions import AuthenticationError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
):
    # Decode JWT
    payload = verify_token(token)

    if not payload:
        raise AuthenticationError("Invalid token")

    user_id = payload.get("sub")

    if not user_id:
        raise AuthenticationError("Invalid token payload")

    
    result = await db.execute(
        select(User).where(User.id == int(user_id))
    )
    user = result.scalar_one_or_none()

    if not user:
        raise AuthenticationError("User not found")

    return user