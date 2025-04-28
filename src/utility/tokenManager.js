import jwt from "jsonwebtoken";
import crypto from "node:crypto";

class TokenManager {
  static cookiename = "_auth_token";
  static cookie_options = {
    path: "/",
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  };

  static generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  }

  static hashToken(token) {
    return crypto.createHash("sha256").update(token.toString()).digest("hex");
  }

  static verifyToken(tok) {
    try {
      const decoded = jwt.verify(tok, process.env.JWT_SECRET);
      return decoded || false;
    } catch (err) {
      return false;
    }
  }
}

export default TokenManager;
