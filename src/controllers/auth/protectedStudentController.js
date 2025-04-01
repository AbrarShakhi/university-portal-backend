import bcrypt from "bcrypt";

import { isValidPassword } from "../../helpers/passwordValidator.js";
import StudentLogin from "../../models/querys/studentLogin.js";

export async function changePasswordStudent(req, res) {
  const { currentPassword, newPassword } = req.body;
  if (!req.std || !req.std.id) {
    return res.status(401).json({ message: "Not authorized, please login!" });
  }

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check if the new password is the same as the current password
  if (currentPassword === newPassword) {
    return res.status(400).json({ message: "New password must be different!" });
  }

  const passRes = isValidPassword(newPassword);
  if (passRes !== true) {
    return res.status(400).json({ message: passRes });
  }

  //find user by id
  const std = await StudentLogin.findById(req.std.id);
  if (!std) {
    return res.status(404).json({ message: "Student not found!" });
  }

  // compare current password with the hashed password in the database
  const isMatch = await bcrypt.compare(currentPassword, std.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid current password!" });
  }

  // reset password
  if (
    StudentLogin.updateById(std.id, {
      password: newPassword,
      is_active: true,
    })
  ) {
    return res.status(200).json({ message: "Password changed successfully!" });
  } else {
    return res.status(500).json({ message: "Error changing password!" });
  }
}
