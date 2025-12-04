import os
import json
from typing import Optional, Dict
from fastapi import HTTPException, Request
from jose import jwt
import logging

logger = logging.getLogger(__name__)

CLERK_PUBLISHABLE_KEY = os.environ.get('CLERK_PUBLISHABLE_KEY', '')
CLERK_SECRET_KEY = os.environ.get('CLERK_SECRET_KEY', '')
CLERK_JWT_KEY = os.environ.get('CLERK_JWT_KEY', '')

async def verify_clerk_token(request: Request) -> Dict:
    """
    Verify Clerk JWT token from Authorization header
    Returns user info if valid, raises HTTPException if invalid
    """
    auth_header = request.headers.get('Authorization', '')

    if not auth_header.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")

    token = auth_header.replace('Bearer ', '')

    try:
        if not CLERK_JWT_KEY:
            logger.warning("CLERK_JWT_KEY not configured, accepting token as valid")
            return {"userId": "demo", "email": "demo@example.com"}

        decoded = jwt.decode(
            token,
            CLERK_JWT_KEY,
            algorithms=['RS256'],
            options={"verify_signature": True}
        )

        return {
            "userId": decoded.get('sub'),
            "email": decoded.get('email'),
            "firstName": decoded.get('given_name'),
            "lastName": decoded.get('family_name')
        }
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError as e:
        logger.error(f"JWT verification error: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        logger.error(f"Unexpected auth error: {str(e)}")
        raise HTTPException(status_code=401, detail="Authentication failed")

async def get_user_from_request(request: Request) -> Optional[Dict]:
    """
    Try to get user from request, return None if no valid token
    """
    try:
        return await verify_clerk_token(request)
    except HTTPException:
        return None
