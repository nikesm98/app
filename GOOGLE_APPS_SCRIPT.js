// Code.gs
// Vehicle Maintenance Backend - Google Apps Script (single-file backend)
//
// Run setup() once manually to create sheets and folder.
//
// Endpoints:
//  - POST  (body JSON) -> submit maintenance: { action: "submit", ... }
//  - POST  (body JSON) -> save status check: { action: "status", client_name: "..." }
//  - GET   ?action=get_logs[&vehicle_number=XXX] -> list logs
//  - GET   ?action=health -> simple health check

const SHEET_NAME = "Maintenance Logs";
const STATUS_SHEET_NAME = "Status Checks";
const DRIVE_FOLDER_NAME = "Vehicle Maintenance Images";
const MAX_BASE64_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB per file (adjust as needed)

/* ------------------ Utilities ------------------ */

function _jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateDriveFolder() {
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

function getOrCreateSheetByName(name, headers) {
  const files = DriveApp.getFilesByName(name);
  if (files.hasNext()) {
    return SpreadsheetApp.open(files.next()).getSheets()[0];
  }
  const ss = SpreadsheetApp.create(name);
  const sheet = ss.getSheets()[0];
  if (headers && headers.length) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function formatJsonForSheet(jsonInput) {
  try {
    const obj = (typeof jsonInput === "string") ? JSON.parse(jsonInput || "{}") : jsonInput;
    if (!obj || Object.keys(obj).length === 0) return "";
    return Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join("\n");
  } catch (err) {
    return jsonInput || "";
  }
}

function convertReadableToJson(str) {
  if (!str || str.trim() === "") return "{}";
  const obj = {};
  const lines = str.split("\n");
  for (let line of lines) {
    const parts = line.split(":");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join(":").trim();
      obj[key] = val;
    }
  }
  return JSON.stringify(obj);
}

function validateBase64Size(dataUri) {
  if (!dataUri) return true;
  const m = dataUri.match(/^data:.+;base64,(.+)$/);
  if (!m) return false;
  const b64 = m[1];
  // Rough size check: each 4 base64 chars = 3 bytes
  const approxBytes = Math.ceil((b64.length * 3) / 4);
  return approxBytes <= MAX_BASE64_SIZE_BYTES;
}

function uploadBase64ToDrive(base64Data, fileName, folder) {
  try {
    const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      throw new Error("Invalid base64 format");
    }
    const mimeType = matches[1];
    const base64 = matches[2];
    // size check
    const b = Utilities.base64Decode(base64);
    const blob = Utilities.newBlob(b, mimeType, fileName);
    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (error) {
    Logger.log("uploadBase64ToDrive error: " + error.toString());
    return "";
  }
}

/* ------------------ Setup ------------------ */

function setup() {
  try {
    const sheet = getOrCreateSheetByName(SHEET_NAME, [
      "ID",
      "Timestamp",
      "Vehicle Number",
      "Battery 1 Number",
      "Battery 1 Photo URL",
      "Battery 2 Number",
      "Battery 2 Photo URL",
      "Tyres Data",
      "Tyre Photos URLs",
      "Vehicle Images URLs"
    ]);
    const statusSheet = getOrCreateSheetByName(STATUS_SHEET_NAME, [
      "ID",
      "Client Name",
      "Timestamp"
    ]);
    const folder = getOrCreateDriveFolder();
    Logger.log("Setup complete. Sheet: " + sheet.getParent().getUrl() + " Folder: " + folder.getUrl());
    return { success: true, sheetUrl: sheet.getParent().getUrl(), folderUrl: folder.getUrl() };
  } catch (err) {
    Logger.log("Setup error: " + err.toString());
    return { success: false, error: err.toString() };
  }
}

/* ------------------ Web entry points ------------------ */

function doGet(e) {
  try {
    const action = (e.parameter && e.parameter.action) ? e.parameter.action : "info";

    if (action === "get_logs") {
      const vehicleNumber = e.parameter.vehicle_number || null;
      return getMaintenanceLogs(vehicleNumber);
    }

    if (action === "health") {
      return _jsonResponse({ success: true, message: "ok", timestamp: new Date().toISOString() });
    }

    // Default info
    return _jsonResponse({
      success: true,
      message: "Vehicle Maintenance Logs API - Apps Script",
      endpoints: {
        submit: "POST body JSON { action: 'submit', ... }",
        status: "POST body JSON { action: 'status', client_name: '...' }",
        get_logs: "GET ?action=get_logs"
      }
    });

  } catch (err) {
    Logger.log("doGet error: " + err.toString());
    return _jsonResponse({ success: false, error: err.toString() });
  }
}

function doPost(e) {
  try {
    const raw = e.postData && e.postData.contents ? e.postData.contents : "{}";
    const data = JSON.parse(raw);
    const action = data.action || "";

    if (action === "submit") {
      return submitMaintenanceLog(data);
    } else if (action === "status") {
      return saveStatusCheck(data);
    } else {
      return _jsonResponse({ success: false, error: "Invalid action" });
    }
  } catch (err) {
    Logger.log("doPost error: " + err.toString());
    return _jsonResponse({ success: false, error: err.toString() });
  }
}

/* ------------------ Core: submit / get logs / status ------------------ */

function submitMaintenanceLog(data) {
  try {
    if (!data.vehicleNumber || data.vehicleNumber.toString().trim() === "") {
      return _jsonResponse({ success: false, error: "vehicleNumber is required" });
    }

    // load folder now
    const sheet = getOrCreateSheetByName(SHEET_NAME);
    const folder = getOrCreateDriveFolder();

    const timestamp = new Date().toISOString();
    const id = Utilities.getUuid();

    // Battery 1
    let battery1PhotoUrl = "";
    if (data.battery1Photo && data.battery1Photo.startsWith("data:image")) {
      battery1PhotoUrl = uploadBase64ToDrive(
        data.battery1Photo,
        `battery1_${data.vehicleNumber}_${Date.now()}`,
        folder
      );
    }

    // Battery 2
    let battery2PhotoUrl = "";
    if (data.battery2Photo && data.battery2Photo.startsWith("data:image")) {
      battery2PhotoUrl = uploadBase64ToDrive(
        data.battery2Photo,
        `battery2_${data.vehicleNumber}_${Date.now()}`,
        folder
      );
    }

    // Tyre photo decoding
    let tyrePhotosData = typeof data.tyrePhotos === "string"
      ? JSON.parse(data.tyrePhotos || "{}")
      : (data.tyrePhotos || {});
    const tyrePhotoUrls = {};
    for (const pos in tyrePhotosData) {
      const base64 = tyrePhotosData[pos];
      if (base64 && base64.startsWith("data:image")) {
        tyrePhotoUrls[pos] = uploadBase64ToDrive(
          base64,
          `tyre_${pos}_${data.vehicleNumber}_${Date.now()}`,
          folder
        );
      }
    }

    // Vehicle images decoding
    let vehicleImagesData = typeof data.vehicleImages === "string"
      ? JSON.parse(data.vehicleImages || "{}")
      : (data.vehicleImages || {});
    const vehicleImageUrls = {};
    for (const view in vehicleImagesData) {
      const base64 = vehicleImagesData[view];
      if (base64 && base64.startsWith("data:image")) {
        vehicleImageUrls[view] = uploadBase64ToDrive(
          base64,
          `vehicle_${view}_${data.vehicleNumber}_${Date.now()}`,
          folder
        );
      }
    }

    const row = [
      id,
      timestamp,
      data.vehicleNumber,
      data.battery1Number || "",
      battery1PhotoUrl,
      data.battery2Number || "",
      battery2PhotoUrl,
      formatJsonForSheet(data.tyres || {}),
      formatJsonForSheet(tyrePhotoUrls),
      formatJsonForSheet(vehicleImageUrls),
    ];

    sheet.appendRow(row);

    return _jsonResponse({
      success: true,
      message: "Maintenance log saved successfully",
      data: { id, vehicleNumber: data.vehicleNumber, submittedAt: timestamp }
    });

  } catch (err) {
    Logger.log("submitMaintenanceLog error: " + err.toString());
    return _jsonResponse({ success: false, error: err.toString() });
  }
}


function getMaintenanceLogs(vehicleNumber) {
  try {
    const sheet = getOrCreateSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return _jsonResponse({ success: true, count: 0, logs: [] });
    }

    const logs = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (vehicleNumber && row[2] !== vehicleNumber) continue;
      const log = {
        id: row[0],
        submittedAt: row[1],
        vehicleNumber: row[2],
        battery1Number: row[3] || null,
        battery1PhotoUrl: row[4] || null,
        battery2Number: row[5] || null,
        battery2PhotoUrl: row[6] || null,
        tyres: JSON.parse(convertReadableToJson(row[7])),
        tyrePhotoUrls: JSON.parse(convertReadableToJson(row[8])),
        vehicleImageUrls: JSON.parse(convertReadableToJson(row[9]))
      };
      logs.push(log);
    }

    logs.sort(function(a,b){ return new Date(b.submittedAt) - new Date(a.submittedAt); });

    return _jsonResponse({ success: true, count: logs.length, logs: logs });

  } catch (err) {
    Logger.log("getMaintenanceLogs error: " + err.toString());
    return _jsonResponse({ success: false, error: err.toString() });
  }
}

function saveStatusCheck(data) {
  try {
    const clientName = data.client_name || data.clientName || "unknown";
    if (!clientName) return _jsonResponse({ success: false, error: "client_name is required" });

    const sheet = getOrCreateSheetByName(STATUS_SHEET_NAME);
    const id = Utilities.getUuid();
    const timestamp = new Date().toISOString();
    sheet.appendRow([id, clientName, timestamp]);
    return _jsonResponse({ success: true, id: id, clientName: clientName, timestamp: timestamp });
  } catch (err) {
    Logger.log("saveStatusCheck error: " + err.toString());
    return _jsonResponse({ success: false, error: err.toString() });
  }
}
