import jwt from "jsonwebtoken";

export type Role = "user" | "kitchen";

export type JwtPayload = {
  id: string;
  role: Role;
  email?: string;
  userId?: string;
  kitchenId?: string;
  [key: string]: any; // to allow dynamic payload
};

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in your .env file");
}

// Create JWT Token with 7-day expiry
export const createJwtToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

// Verify JWT Token and return payload (throws if invalid)
export const verifyJwtToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
