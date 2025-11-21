# Vehicle Maintenance Logs - API Contracts & Integration Plan

## Overview
This document outlines the API contracts, data flow, and integration between Frontend → Backend → Google Apps Script → Google Sheets/Drive.

---

## Data Flow Architecture

```
Frontend (React) 
    ↓ HTTP POST
Backend (FastAPI) 
    ↓ Process images to base64
    ↓ HTTP POST
Google Apps Script 
    ↓ Upload images to Drive
    ↓ Save data with Drive links
Google Sheets (Permanent Storage)
```

---

## Backend API Endpoints

### 1. POST `/api/maintenance/submit`
Submit new maintenance log entry

**Request Body:**
```json
{
  "vehicleNumber": "HR55AZ3114",
  "batteryNumber": "BAT-2024-001",
  "batteryPhoto": "base64_string_or_null",
  "tyres": {
    "front_right": "TYR-FR-001",
    "front_left": "TYR-FL-001",
    ...
  },
  "tyrePhotos": {
    "front_right": "base64_string_or_null",
    ...
  },
  "vehicleImages": {
    "front": "base64_string_or_null",
    "left": "base64_string_or_null",
    "right": "base64_string_or_null",
    "rear": "base64_string_or_null"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Maintenance log submitted successfully",
  "data": {
    "id": "row_number_in_sheet",
    "vehicleNumber": "HR55AZ3114",
    "submittedAt": "2025-01-15T10:30:00Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

---

### 2. GET `/api/maintenance/logs`
Retrieve all maintenance logs

**Query Parameters:**
- `vehicle_number` (optional): Filter by vehicle number

**Response:**
```json
{
  "success": true,
  "count": 25,
  "logs": [
    {
      "id": "1",
      "vehicleNumber": "HR55AZ3114",
      "batteryNumber": "BAT-2024-001",
      "batteryPhotoUrl": "https://drive.google.com/...",
      "tyres": {...},
      "tyrePhotoUrls": {...},
      "vehicleImageUrls": {...},
      "submittedAt": "2025-01-15T10:30:00Z"
    }
  ]
}
```

---

## Google Apps Script Structure

### Script Functions:

1. **doPost(e)** - Main entry point for receiving data from backend
2. **uploadImageToDrive(base64Data, fileName, folderId)** - Upload image and return Drive link
3. **saveToSheet(data)** - Save maintenance data to Google Sheet
4. **doGet(e)** - Retrieve logs (optional, for direct access)

### Google Sheet Structure:

| Column | Description |
|--------|-------------|
| A: ID | Auto-increment row number |
| B: Timestamp | Submission date/time |
| C: Vehicle Number | Vehicle registration number |
| D: Battery Number | Battery identification |
| E: Battery Photo URL | Google Drive link |
| F: Tyres Data | JSON string of tyre numbers |
| G: Tyre Photos URLs | JSON string of Drive links |
| H: Vehicle Images URLs | JSON string of Drive links |

---

## Frontend Changes Required

### Remove Mock Data:
- Remove `mock.js` usage from MaintenanceForm.jsx
- Remove localStorage operations
- Replace with axios API calls

### Update MaintenanceForm.jsx:
```javascript
// OLD (Mock):
saveMaintenanceLog(formData);

// NEW (Real API):
const response = await axios.post(`${API}/maintenance/submit`, formData);
```

### Update Dashboard.jsx:
```javascript
// OLD (Mock):
const logs = getMaintenanceLogs();

// NEW (Real API):
const response = await axios.get(`${API}/maintenance/logs`);
const logs = response.data.logs;
```

---

## Implementation Steps

### Phase 1: Backend Development ✓
1. Create Pydantic models for request/response
2. Build `/api/maintenance/submit` endpoint
3. Build `/api/maintenance/logs` endpoint
4. Add error handling and validation

### Phase 2: Google Apps Script
1. Create script with image upload functionality
2. Configure Google Sheet and Drive folder
3. Deploy as Web App
4. Get Web App URL

### Phase 3: Backend Configuration
1. Add Google Apps Script URL to backend .env
2. Configure backend to forward data to Apps Script

### Phase 4: Frontend Integration
1. Replace mock functions with API calls
2. Update error handling
3. Test end-to-end flow

---

## Environment Variables Needed

### Backend (.env):
```
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/xxxxx/exec
```

---

## Testing Checklist

- [ ] Backend receives form data correctly
- [ ] Images converted to base64 properly
- [ ] Backend forwards to Google Apps Script
- [ ] Images uploaded to Google Drive
- [ ] Data saved to Google Sheets
- [ ] Dashboard retrieves and displays data
- [ ] Search functionality works
- [ ] Form validation working
- [ ] Error messages displayed correctly

---

## Notes

- Images are converted to base64 in frontend (already done)
- Backend validates and forwards to Google Apps Script
- Google Apps Script handles Drive upload and Sheet storage
- All image URLs are shareable Google Drive links
- Maximum image size: 5MB per image
