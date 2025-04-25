import jwt from "jsonwebtoken";
import crypto from "node:crypto";

export const cookiename = "_auth_token";
export const cookie_options = {
  path: "/",
  httpOnly: true,
  // maxAge: 10 * 1000, // 30 days
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  sameSite: "strict", // cross-site access --> allow all third-party cookies
  secure: process.env.NODE_ENV == "production" ? true : false,
};

export function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export function hashToken(token) {
  return crypto.createHash("sha256").update(token.toString()).digest("hex");
}

export function verifyToken(tok) {
  try {
    const decoded = jwt.verify(tok, process.env.JWT_SECRET);
    if (decoded) {
      return decoded;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}
