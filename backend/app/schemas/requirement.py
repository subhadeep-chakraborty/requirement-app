from pydantic import BaseModel, field_validator  # ✅ ADDED
from typing import Optional
from enum import Enum  


class RequirementStatus(str, Enum):
    open = "open"
    processed = "processed"
    obsolete = "obsolete"


class RequirementCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: RequirementStatus   


    @field_validator("title")
    @classmethod
    def validate_title(cls, v):
        if not v or not v.strip():
            raise ValueError("Title is required")  
        return v.strip()


class RequirementResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: RequirementStatus  


class RequirementOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: RequirementStatus   

    class Config:
        from_attributes = True