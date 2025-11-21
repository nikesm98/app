# Google Apps Script Deployment Guide
## Vehicle Maintenance Logs - CJ Darcl Logistics

This guide will help you deploy the Google Apps Script to connect your application with Google Sheets and Google Drive.

---

## Prerequisites

✅ Google Account (Gmail)  
✅ 10 minutes of time  
✅ Access to https://script.google.com

---

## Step-by-Step Deployment

### **Step 1: Open Google Apps Script**

1. Open your web browser
2. Go to: **https://script.google.com**
3. Sign in with your Google account
4. Click **"New Project"** (top left)

---

### **Step 2: Copy the Script Code**

1. Open the file: `/app/GOOGLE_APPS_SCRIPT.js` (in your project)
2. **Copy ALL the code** from that file
3. Go back to Google Apps Script
4. **Delete** the default code (`function myFunction() {}`)
5. **Paste** the copied code

---

### **Step 3: Save the Project**

1. Click the **disk icon** or press `Ctrl+S` (Windows) / `Cmd+S` (Mac)
2. Name your project: **"Vehicle Maintenance Logs"**
3. Click **"OK"**

---

### **Step 4: Run Setup (One-Time)**

This creates your Google Sheet and Drive folder automatically.

1. In the toolbar, select function: **`setup`** from the dropdown
2. Click the **"Run"** button (▶️ play icon)
3. **Authorization Required** popup will appear:
   - Click **"Review Permissions"**
   - Select your Google account
   - Click **"Advanced"** (if warning appears)
   - Click **"Go to Vehicle Maintenance Logs (unsafe)"**
   - Click **"Allow"**
4. Wait for execution to complete (10-15 seconds)
5. Click **"View" > "Logs"** to see confirmation:
   ```
   ✓ Setup complete!
   ✓ Sheet created: [URL]
   ✓ Drive folder created: [URL]
   ```

---

### **Step 5: Deploy as Web App**

1. Click **"Deploy"** (top right) > **"New deployment"**
2. Click the **gear icon** ⚙️ next to "Select type"
3. Select **"Web app"**
4. Fill in the settings:
   - **Description:** "Vehicle Maintenance API v1"
   - **Execute as:** **"Me"** (your email)
   - **Who has access:** **"Anyone"**
5. Click **"Deploy"**
6. **IMPORTANT:** Copy the **Web App URL** that appears
   - It looks like: `https://script.google.com/macros/s/AKfycbz.../exec`
   - **Save this URL** - you'll need it in the next step!

---

### **Step 6: Provide Web App URL**

📋 **Copy your Web App URL and share it with me**

Example format:
```
https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXXXXXXXXX/exec
```

Once you provide this URL, I will:
1. Configure the backend to use it
2. Complete the integration
3. Test the full flow

---

## What Was Created?

After running setup, you now have:

### 📊 **Google Sheet: "Maintenance Logs"**
- Contains all vehicle maintenance records
- Automatically organized with headers
- Searchable and filterable
- **Find it in:** Google Drive home page

### 📁 **Google Drive Folder: "Vehicle Maintenance Images"**
- Stores all uploaded images (battery, tyres, vehicle photos)
- Organized with unique filenames
- Shareable links for each image
- **Find it in:** Google Drive home page

---

## Sheet Structure

Your Google Sheet has these columns:

| Column | Description |
|--------|-------------|
| A | ID (Auto-increment) |
| B | Timestamp |
| C | Vehicle Number |
| D | Battery Number |
| E | Battery Photo URL |
| F | Tyres Data (JSON) |
| G | Tyre Photos URLs (JSON) |
| H | Vehicle Images URLs (JSON) |

---

## Troubleshooting

### **Error: "Authorization Required"**
- **Solution:** Follow Step 4 carefully, click "Advanced" > "Go to Vehicle Maintenance Logs"

### **Error: "Script function not found: setup"**
- **Solution:** Make sure you pasted the complete code from GOOGLE_APPS_SCRIPT.js

### **Can't find the Google Sheet**
- **Solution:** Check your Google Drive home page, search for "Maintenance Logs"

### **Web App URL not working**
- **Solution:** Make sure you selected "Anyone" for "Who has access" in deployment settings

---

## Testing Your Deployment

After deployment, you can test if it's working:

1. Open your Web App URL in a browser
2. You should see:
   ```json
   {
     "success": true,
     "message": "Vehicle Maintenance Logs API - CJ Darcl Logistics",
     "endpoints": {...}
   }
   ```

If you see this, **your deployment is successful!** ✅

---

## Next Steps

Once you provide the Web App URL:

1. ✅ I'll configure the backend environment variable
2. ✅ Update frontend to use real API endpoints
3. ✅ Test the complete flow
4. ✅ Verify data is being saved to Google Sheets

---

## Important Notes

⚠️ **Security:**
- The Web App is set to "Anyone" access, but only your backend should use it
- Consider adding an API key for production use

💡 **Updates:**
- If you modify the script, you need to create a **new deployment**
- Or use "Manage deployments" > Edit existing deployment

📊 **Data Access:**
- You can view/edit the Sheet directly in Google Sheets
- You can access images directly from the Drive folder
- Data persists permanently until manually deleted

---

## Support

If you encounter any issues during deployment:
1. Check the Logs in Google Apps Script (View > Logs)
2. Verify all permissions were granted
3. Ensure your Google account has Drive and Sheets enabled
4. Share the error message with me for assistance

---

**Ready to proceed? Please share your Web App URL once deployed!** 🚀
