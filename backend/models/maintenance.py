from pydantic import BaseModel, Field
from typing import Optional, Dict, List
from datetime import datetime

class MaintenanceSubmission(BaseModel):
    vehicleNumber: str = Field(..., min_length=1, description="Vehicle registration number")
    batteryNumber: Optional[str] = None
    batteryPhoto: Optional[str] = None
    tyres: Optional[Dict[str, str]] = Field(default_factory=dict)
    tyrePhotos: Optional[Dict[str, str]] = Field(default_factory=dict)
    vehicleImages: Optional[Dict[str, str]] = Field(default_factory=dict)

class MaintenanceResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Dict] = None
    error: Optional[str] = None

class MaintenanceLog(BaseModel):
    id: str
    vehicleNumber: str
    battery1Number: Optional[str] = None
    battery1PhotoUrl: Optional[str] = None
    battery2Number: Optional[str] = None
    battery2PhotoUrl: Optional[str] = None
    tyres: Optional[Dict[str, str]] = Field(default_factory=dict)
    tyrePhotoUrls: Optional[Dict[str, str]] = Field(default_factory=dict)
    vehicleImageUrls: Optional[Dict[str, str]] = Field(default_factory=dict)
    submittedAt: str

class MaintenanceLogsResponse(BaseModel):
    success: bool
    count: int
    logs: List[MaintenanceLog]
