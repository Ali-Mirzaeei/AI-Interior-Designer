from pydantic import BaseModel
from typing import Optional

class DesignRequest(BaseModel):
    description: str
    style: Optional[str] = None

class DesignResponse(BaseModel):
    success: bool
    generated_image: str
    message: Optional[str] = None
    original_filename: Optional[str] = None
    image_size: Optional[str] = None
    requested_style: Optional[str] = None
    processing_time: Optional[str] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    details: Optional[str] = None