from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from app.db.session import get_db
from app.schemas.requirement import RequirementCreate, RequirementOut
from app.core.logger import logger
from app.core.dependencies import get_current_user
from app.core.exceptions import AppException
from app.db.models.user import User


router = APIRouter(
    prefix="/requirements",
    tags=["requirements"]
)


@router.get("/", response_model=list[RequirementOut])
async def get_requirements(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        logger.info(f"User {current_user.email} fetching requirements")

        query = text("""
            SELECT id, title, description, status
            FROM app.requirements
            WHERE user_id = :user_id 
            ORDER BY id ASC
        """)

        result = await db.execute(query, {"user_id": current_user.id})
        rows = result.fetchall()

        data = [
            RequirementOut(
                id=r.id,
                title=r.title,
                description=r.description,
                status=r.status
            )
            for r in rows
        ]

        logger.info(f"Fetched {len(data)} requirements")

        return data

    except Exception as e:
        logger.error(f"Error fetching requirements: {str(e)}")
        raise AppException("Failed to fetch requirements", 500)



@router.post("/", response_model=RequirementOut)
async def create_requirement(
    req: RequirementCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        logger.info(f"User {current_user.email} creating requirement: {req.title}")

        query = text("""
            INSERT INTO app.requirements (title, description, status, user_id)  -- ✅ CHANGED
            VALUES (:title, :description, :status, :user_id)                    -- ✅ CHANGED
            RETURNING id, title, description, status
        """)

        result = await db.execute(query, {
            "title": req.title,
            "description": req.description,
            "status": req.status,
            "user_id": current_user.id 
        })

        row = result.fetchone()

        await db.commit()

        logger.info(f"Requirement created with id: {row.id}")

        return RequirementOut(
            id=row.id,
            title=row.title,
            description=row.description,
            status=row.status
        )

    except Exception as e:
        await db.rollback()
        logger.error(f"Error creating requirement: {str(e)}")
        raise AppException("Failed to create requirement", 500)