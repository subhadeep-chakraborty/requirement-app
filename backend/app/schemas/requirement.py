from pydantic import BaseModel
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