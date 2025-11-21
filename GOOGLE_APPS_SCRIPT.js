/**
 * Vehicle Maintenance Logs - Google Apps Script
 * 
 * This script handles:
 * 1. Receiving maintenance data from the backend API
 * 2. Uploading images to Google Drive
 * 3. Saving data to Google Sheets with Drive links
 * 4. Retrieving logs for the dashboard
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 
 * 1. Open Google Apps Script: https://script.google.com
 * 2. Click "New Project"
 * 3. Copy this entire file content and paste it
 * 4. Save the project (name it "Vehicle Maintenance Logs")
 * 5. Run setup() function once to create Sheet and Drive folder
 * 6. Deploy as Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Select "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click "Deploy"
 * 7. Copy the Web App URL and provide it to configure the backend
 * 
 */

// Configuration
const SHEET_NAME = "Maintenance Logs";
const DRIVE_FOLDER_NAME = "Vehicle Maintenance Images";

/**
 * Initialize Google Sheet and Drive folder
 * Run this function ONCE after creating the script
 */
function setup() {
  try {
    // Create or get spreadsheet
    let sheet = getOrCreateSheet();
    
    // Create headers if sheet is new
    if (sheet.getLastRow() === 0) {
      const headers = [
        "ID",
        "Timestamp",
        "Vehicle Number",
        "Battery Number",
        "Battery Photo URL",
        "Tyres Data (JSON)",
        "Tyre Photos URLs (JSON)",
        "Vehicle Images URLs (JSON)"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    
    // Create Drive folder
    const folder = getOrCreateDriveFolder();
    
    Logger.log("✓ Setup complete!");
    Logger.log("✓ Sheet created: " + sheet.getParent().getUrl());
    Logger.log("✓ Drive folder created: " + folder.getUrl());
    
    return {
      success: true,
      sheetUrl: sheet.getParent().getUrl(),
      folderUrl: folder.getUrl()
    };
  } catch (error) {
    Logger.log("✗ Setup error: " + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Handle POST requests from backend
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === "submit") {
      return submitMaintenanceLog(data);
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: "Invalid action" })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("doPost error: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (retrieve logs)
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === "get_logs") {
      const vehicleNumber = e.parameter.vehicle_number || null;
      return getMaintenanceLogs(vehicleNumber);
    }
    
    // Default: return API info
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Vehicle Maintenance Logs API - CJ Darcl Logistics",
        endpoints: {
          submit: "POST with action=submit",
          get_logs: "GET with action=get_logs"
        }
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("doGet error: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Submit maintenance log entry
 */
function submitMaintenanceLog(data) {
  try {
    const sheet = getOrCreateSheet();
    const folder = getOrCreateDriveFolder();
    const timestamp = new Date().toISOString();
    const rowId = sheet.getLastRow();
    
    // Upload battery photo if provided
    let batteryPhotoUrl = "";
    if (data.batteryPhoto && data.batteryPhoto.startsWith("data:image")) {
      batteryPhotoUrl = uploadBase64ToDrive(
        data.batteryPhoto,
        `battery_${data.vehicleNumber}_${Date.now()}`,
        folder
      );
    }
    
    // Upload tyre photos
    const tyrePhotosData = JSON.parse(data.tyrePhotos || "{}");
    const tyrePhotoUrls = {};
    for (const [position, base64] of Object.entries(tyrePhotosData)) {
      if (base64 && base64.startsWith("data:image")) {
        tyrePhotoUrls[position] = uploadBase64ToDrive(
          base64,
          `tyre_${position}_${data.vehicleNumber}_${Date.now()}`,
          folder
        );
      }
    }
    
    // Upload vehicle images
    const vehicleImagesData = JSON.parse(data.vehicleImages || "{}");
    const vehicleImageUrls = {};
    for (const [view, base64] of Object.entries(vehicleImagesData)) {
      if (base64 && base64.startsWith("data:image")) {
        vehicleImageUrls[view] = uploadBase64ToDrive(
          base64,
          `vehicle_${view}_${data.vehicleNumber}_${Date.now()}`,
          folder
        );
      }
    }
    
    // Append row to sheet
    const row = [
      rowId,
      timestamp,
      data.vehicleNumber,
      data.batteryNumber || "",
      batteryPhotoUrl,
      data.tyres || "{}",
      JSON.stringify(tyrePhotoUrls),
      JSON.stringify(vehicleImageUrls)
    ];
    
    sheet.appendRow(row);
    
    const result = {
      success: true,
      message: "Maintenance log saved successfully",
      data: {
        id: rowId.toString(),
        vehicleNumber: data.vehicleNumber,
        submittedAt: timestamp
      }
    };
    
    return ContentService.createTextOutput(
      JSON.stringify(result)
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("submitMaintenanceLog error: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Retrieve maintenance logs
 */
function getMaintenanceLogs(vehicleNumber) {
  try {
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: true, count: 0, logs: [] })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    const logs = [];
    
    // Skip header row
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Filter by vehicle number if provided
      if (vehicleNumber && row[2] !== vehicleNumber) {
        continue;
      }
      
      const log = {
        id: row[0].toString(),
        vehicleNumber: row[2],
        batteryNumber: row[3] || null,
        batteryPhotoUrl: row[4] || null,
        tyres: JSON.parse(row[5] || "{}"),
        tyrePhotoUrls: JSON.parse(row[6] || "{}"),
        vehicleImageUrls: JSON.parse(row[7] || "{}"),
        submittedAt: row[1]
      };
      
      logs.push(log);
    }
    
    // Sort by timestamp descending (newest first)
    logs.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true, 
        count: logs.length, 
        logs: logs 
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("getMaintenanceLogs error: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Upload base64 image to Google Drive
 */
function uploadBase64ToDrive(base64Data, fileName, folder) {
  try {
    // Extract mime type and data
    const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      throw new Error("Invalid base64 format");
    }
    
    const mimeType = matches[1];
    const base64 = matches[2];
    
    // Convert base64 to blob
    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64),
      mimeType,
      fileName
    );
    
    // Upload to Drive
    const file = folder.createFile(blob);
    
    // Make file accessible to anyone with link
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // Return shareable link
    return file.getUrl();
    
  } catch (error) {
    Logger.log("uploadBase64ToDrive error: " + error.toString());
    return "";
  }
}

/**
 * Get or create Google Sheet
 */
function getOrCreateSheet() {
  const spreadsheets = DriveApp.getFilesByName(SHEET_NAME);
  
  if (spreadsheets.hasNext()) {
    const spreadsheet = SpreadsheetApp.open(spreadsheets.next());
    return spreadsheet.getSheets()[0];
  }
  
  // Create new spreadsheet
  const spreadsheet = SpreadsheetApp.create(SHEET_NAME);
  return spreadsheet.getSheets()[0];
}

/**
 * Get or create Drive folder
 */
function getOrCreateDriveFolder() {
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  
  if (folders.hasNext()) {
    return folders.next();
  }
  
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}
