import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
export function signJwt(payload: string) {
  return jwt.sign(payload, JWT_SECRET);
}

export function validateToken<T>(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as T;
  } catch (err) {
    throw new Error("Failed to authenticate the token");
  }
}

export interface AuthTokenPayload {
  uid: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  verified: boolean;
  profile_photo_slug: string | null;
  user_plan: string;
  createdAt: string; // Assuming it's always in ISO 8601 format
  updatedAt: string; // Assuming it's always in ISO 8601 format
  iat: number;
}
