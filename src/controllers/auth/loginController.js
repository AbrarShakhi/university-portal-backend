import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import CookieManager from "./../../utility/cookieManager.js";
import Student from "./../../querys/student.js";
import StudentLogin from "./../../querys/studentLogin.js";

export default class LoginController {
  static loginStudent() {
    return asyncHandler(async (req, res) => {
      const { id, password } = req.body;

      if (!id || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const stdExists = await Student.findById(id);
      if (!stdExists || stdExists.length < 1) {
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

      const isMatch = await bcrypt.compare(password, stdLogin[0].password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const _auth_token = CookieManager.generateToken(id);

      const { first_name, last_name, email } = stdExists[0];

      res.cookie(
        CookieManager.cookiename,
        _auth_token,
        CookieManager.cookie_options,
      );

      res.status(200).json({
        first_name,
        last_name,
        id,
        email,
        _auth_token,
      });
    });
  }

  static logoutStudent() {
    return asyncHandler(async (req, res) => {
      res.clearCookie("token", CookieManager.cookie_options);

      return res.status(200).json({ message: "Logged out" });
    });
  }
}
