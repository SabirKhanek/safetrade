import { Request } from 'express';
import { Cookies } from 'common';

export function extractJwtFromRequest(req: Request): string | null {
  // Check for JWT in Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token) {
      return token;
    }
  }

  // Check for JWT in cookies
  const token = req.cookies[Cookies.SystemAuthCookie];
  if (token) {
    return token;
  }

  // If JWT is not found in either place, return null
  return null;
}
