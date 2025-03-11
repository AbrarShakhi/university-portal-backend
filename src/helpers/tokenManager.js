import jwt from "jsonwebtoken";
import crypto from "node:crypto";

export function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export function hashToken(token) {
  return crypto.createHash("sha256").update(token.toString()).digest("hex");
}
