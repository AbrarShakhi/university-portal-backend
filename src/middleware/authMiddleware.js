import asyncHandler from "express-async-handler";

import Student from "../models/student.js";
import CookieManager from "../utility/cookieManager.js";
import StudentLogin from "../models/studentLogin.js";

export default class AuthMiddleware {
  static protect() {
    return asyncHandler(async (req, res, next) => {
      try {
        const decoded = CookieManager.verifyCookie(
          req.cookies[CookieManager.cookiename],
        );
        if (decoded === false) {
          return res
            .status(401)
            .json({ message: "Not authorized, please login!" });
        }
        const { id } = decoded;

        const stdExists = await Student.findById(id);
        if (!stdExists && stdExists.length < 1) {
          return res.status(404).json({ message: "Invalid student ID" });
        }

        const stdLogin = await StudentLogin.findById(id);
        if (!stdLogin || stdLogin.length < 1) {
          return res
            .status(401)
            .json({ message: "Your ID is not active yet. Active it first." });
        }

        if (stdExists[0].is_dismissed) {
          return res.status(401).json({ message: "Your ID is dismissed!" });
        }

        req.std = stdExists[0];
        next();
      } catch (error) {
        return res
          .status(401)
          .json({ message: "Not authorized, token failed!" });
      }
    });
  }
}
