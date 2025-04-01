import bcrypt from "bcrypt";

import { generateToken, verifyToken } from "../../helpers/tokenManager.js";
import Student from "../../models/querys/student.js";
import StudentLogin from "../../models/querys/studentLogin.js";

export async function loginStudent(req, res) {
  // get id and password from req.body
  const { id, password } = req.body;

  // validation
  if (!id || !password) {
    // 400 Bad Request
    return res.status(400).json({ message: "All fields are required" });
  }

  // check if student exists
  const stdExists = await StudentLogin.findById(id);
  if (!stdExists) {
    return res.status(404).json({ message: "Invalid student ID" });
  }
  if (!stdExists.is_active) {
    return res
      .status(401)
      .json({ message: "Your ID is not active yet. Active it first." });
  }
  if (stdExists.is_dismissed) {
    return res.status(401).json({ message: "Your ID is dismissed!" });
  }

  // check if the password matches the hashed password in the database
  const isMatch = await bcrypt.compare(password, stdExists.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // generate token with Student id
  const token = generateToken(id);

  const { first_name, last_name, email } = await Student.findById(id);

  // set the token in the cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "none", // cross-site access --> allow all third-party cookies
    secure: true,
  });

  // send back the Student and token in the response to the client
  res.status(200).json({
    first_name,
    last_name,
    id,
    email,
    token,
  });
}

export async function logoutStudent(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  });

  return res.status(200).json({ message: "Logged out" });
}

export async function loginStatusStudent(req, res) {
  if (verifyToken(req.cookies.token)) {
    return res.status(200).json(true);
  } else {
    return res.status(401).json(false);
  }
}
