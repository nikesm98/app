# Clerk Authentication Setup Guide

This guide walks you through setting up Clerk authentication for user tracking in the vehicle maintenance system.

## What's New

Your application now includes:
- **User Login/Logout**: Secure authentication via Clerk
- **Google OAuth Support**: One-click login with Google
- **User Tracking**: Every maintenance log is tagged with the user who submitted it
- **Protected Routes**: Maintenance form requires authentication
- **User Profile Display**: Shows logged-in user name in the header

## Step 1: Create a Clerk Account

1. Go to https://dashboard.clerk.com
2. Sign up for a free account
3. Create a new application

## Step 2: Get Your Clerk Credentials

1. In the Clerk Dashboard, go to **API Keys**
2. Copy your **Publishable Key** (starts with `pk_`)
3. Copy your **Secret Key** (starts with `sk_`)
4. Go to **JWT** and copy the **Signing Key** (for RS256)

## Step 3: Configure Environment Variables

### Frontend (.env)
```
REACT_APP_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
```

### Backend (.env)
```
CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here
CLERK_JWT_KEY=your_jwt_signing_key_here
```

## Step 4: Set Up Google OAuth (Optional but Recommended)

1. In Clerk Dashboard, go to **Social Connections**
2. Click **Google**
3. Create OAuth credentials in Google Cloud Console:
   - Go to https://console.cloud.google.com
   - Create a new project
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs for your app
4. Copy the **Client ID** and **Client Secret** from Google
5. Paste them into Clerk's Google settings

## Step 5: Configure Allowed Redirect URIs in Clerk

In your Clerk Dashboard:
1. Go to **Allowed Redirect URIs**
2. Add your frontend URL (e.g., `http://localhost:3000/*` for local development)

## Step 6: Update Google Apps Script

Add these new fields to your Google Apps Script sheet headers:
```
"User ID",
"User Email"
```

The backend will automatically include these fields in submissions.

## How It Works

### Authentication Flow

1. User visits the app → Sees "Sign In" button
2. User clicks "Sign In" → Redirected to Clerk login page
3. User signs in with email/password or Google → Returns to app
4. User navigates to Maintenance Form
5. Form requires authentication → Redirects if not logged in
6. Form submission includes auth token in headers
7. Backend verifies token with Clerk
8. Log is saved with `userId` and `userEmail`
9. Data sent to Google Sheets with user info

### Frontend Changes

**Home Page**: Sign In button in header
**Maintenance Form**:
- Shows user name in header
- Requires authentication to submit
- Auto-redirects unauthenticated users

**Dashboard**: Shows user info in header

### Backend Changes

**New Endpoint**: `/api/maintenance/submit` (requires JWT token)
- Verifies Clerk token from Authorization header
- Extracts user ID and email
- Includes user info in payload sent to Google Apps Script

**Token Format**:
```
Authorization: Bearer <clerk_jwt_token>
```

## Testing

### Local Development

1. Set up environment variables
2. Run frontend: `npm run start`
3. Run backend: `python server.py`
4. Visit http://localhost:3000
5. Click "Sign In"
6. Test login with test credentials
7. Submit a maintenance log
8. Check database/Google Sheets for user info

### Deployment

When deploying:
1. Add environment variables to your hosting platform
2. Update Clerk Dashboard with production redirect URIs
3. Update CORS settings in backend if needed
4. Update GOOGLE_APPS_SCRIPT_URL to production endpoint

## Architecture Overview

```
User Login
    ↓
Clerk Auth
    ↓
Frontend gets JWT Token
    ↓
Submit Maintenance Form with Token
    ↓
Backend verifies Token with Clerk
    ↓
Extract User Info
    ↓
Save to Database + Send to Google Sheets (with user info)
```

## Troubleshooting

### "Token has expired"
- Tokens expire after a period. The frontend automatically refreshes them.
- If you see this repeatedly, check your Clerk API key configuration.

### "Invalid token"
- Verify CLERK_JWT_KEY in backend .env matches Clerk Dashboard
- Check that the Authorization header is formatted correctly: `Bearer <token>`

### User not showing in header
- Verify REACT_APP_CLERK_PUBLISHABLE_KEY is correct
- Check browser console for Clerk errors
- Clear browser cache and refresh

### Can't submit maintenance log
- Ensure you're logged in (check header)
- Verify backend has Clerk credentials configured
- Check backend logs for JWT verification errors

## Security Notes

- JWT tokens are stored in browser memory (auto-cleared on refresh)
- Clerk handles password security and OAuth securely
- Backend verifies every token before accepting submissions
- User data is never exposed in frontend code
- Database can track submissions by user ID

## Next Steps

1. Deploy backend to production
2. Get production URLs for both frontend and backend
3. Update Clerk redirect URIs for production
4. Test end-to-end in production environment
5. Monitor logs for any authentication issues

## Support

For Clerk-specific issues:
- https://docs.clerk.com
- https://support.clerk.com

For backend authentication issues:
- Check `/backend/auth.py` for JWT verification logic
- Verify environment variables are set correctly
- Check server logs for detailed error messages
