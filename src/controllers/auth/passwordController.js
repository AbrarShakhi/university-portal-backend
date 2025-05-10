import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import PasswordValidator from "../../utility/passwordValidator.js";
import StudentLogin from "../../../querys/studentLogin.js";

export default class PasswordController {
  static changePasswordStudent = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!req.std || !req.std.id) {
      return res.status(401).json({ message: "Not authorized, please login!" });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if the new password is the same as the current password
    if (currentPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "New password must be different!" });
    }

    const passRes = PasswordValidator.isValidPassword(newPassword);
    if (passRes !== true) {
      return res.status(400).json({ message: passRes });
    }

    //find old password by id
    const stdLogin = await StudentLogin.findById(req.std.id);
    if (!stdLogin || stdLogin.length < 1) {
      return res.status(404).json({ message: "Account is Not Active." });
    }

    const { old_password } = stdLogin[0].password;

    // compare current password with the hashed password in the database
    const isMatch = await bcrypt.compare(currentPassword, old_password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid current password!" });
    }

    // reset password
    if (
      StudentLogin.updateById(stdLogin.id, {
        password: newPassword,
      })
    ) {
      return res
        .status(200)
        .json({ message: "Password changed successfully!" });
    } else {
      return res.status(500).json({ message: "Error changing password!" });
    }
  });
}
