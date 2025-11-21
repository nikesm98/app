from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import requests
import os
import logging
from datetime import datetime
import json

from models.maintenance import (
    MaintenanceSubmission,
    MaintenanceResponse,
    MaintenanceLog,
    MaintenanceLogsResponse
)

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/maintenance", tags=["maintenance"])

# Google Apps Script URL will be configured via environment variable
GOOGLE_APPS_SCRIPT_URL = os.environ.get('GOOGLE_APPS_SCRIPT_URL', '')

@router.post("/submit", response_model=MaintenanceResponse)
async def submit_maintenance_log(submission: MaintenanceSubmission):
    """
    Submit a new maintenance log entry.
    Forwards data to Google Apps Script which handles Drive upload and Sheet storage.
    """
    try:
        # Validate vehicle number is provided
        if not submission.vehicleNumber:
            raise HTTPException(status_code=400, detail="Vehicle number is required")
        
        # Prepare data for Google Apps Script
        payload = {
            "action": "submit",
            "vehicleNumber": submission.vehicleNumber,
            "batteryNumber": submission.batteryNumber or "",
            "batteryPhoto": submission.batteryPhoto or "",
            "tyres": json.dumps(submission.tyres or {}),
            "tyrePhotos": json.dumps(submission.tyrePhotos or {}),
            "vehicleImages": json.dumps(submission.vehicleImages or {}),
            "timestamp": datetime.utcnow().isoformat()
        }
        
        # Check if Google Apps Script URL is configured
        if not GOOGLE_APPS_SCRIPT_URL:
            logger.warning("Google Apps Script URL not configured, using mock response")
            return MaintenanceResponse(
                success=True,
                message="Maintenance log submitted successfully (mock mode - configure GOOGLE_APPS_SCRIPT_URL)",
                data={
                    "id": str(datetime.now().timestamp()),
                    "vehicleNumber": submission.vehicleNumber,
                    "submittedAt": payload["timestamp"]
                }
            )
        
        # Forward to Google Apps Script
        response = requests.post(
            GOOGLE_APPS_SCRIPT_URL,
            json=payload,
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            return MaintenanceResponse(
                success=True,
                message="Maintenance log submitted successfully",
                data=result
            )
        else:
            logger.error(f"Google Apps Script error: {response.status_code} - {response.text}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to save to Google Sheets: {response.text}"
            )
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to connect to Google Sheets: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
        )

@router.get("/logs", response_model=MaintenanceLogsResponse)
async def get_maintenance_logs(vehicle_number: Optional[str] = Query(None, description="Filter by vehicle number")):
    """
    Retrieve all maintenance logs from Google Sheets.
    Optionally filter by vehicle number.
    """
    try:
        # Check if Google Apps Script URL is configured
        if not GOOGLE_APPS_SCRIPT_URL:
            logger.warning("Google Apps Script URL not configured, returning empty logs")
            return MaintenanceLogsResponse(
                success=True,
                count=0,
                logs=[]
            )
        
        # Prepare query parameters
        params = {"action": "get_logs"}
        if vehicle_number:
            params["vehicle_number"] = vehicle_number
        
        # Request logs from Google Apps Script
        response = requests.get(
            GOOGLE_APPS_SCRIPT_URL,
            params=params,
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            logs = [MaintenanceLog(**log) for log in result.get("logs", [])]
            return MaintenanceLogsResponse(
                success=True,
                count=len(logs),
                logs=logs
            )
        else:
            logger.error(f"Google Apps Script error: {response.status_code} - {response.text}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to retrieve logs from Google Sheets: {response.text}"
            )
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to connect to Google Sheets: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
        )
