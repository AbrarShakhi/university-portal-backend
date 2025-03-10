import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

import { generateToken } from "../../helpers/tokenManager.js";
import { StudentLogin } from "../../models/auth/StudentLogin.js";

export const StudentLoginHandler = asyncHandler(async (req, res) => {
  // get id and password from req.body
  const { id, password } = req.body;

  // validation
  if (!id || !password) {
    // 400 Bad Request
    return res.status(400).json({ message: "All fields are required" });
  }

  // check if student exists
  const stdExists = await StudentLogin.findOne({ id });
  if (!stdExists) {
    return res.status(404).json({ message: "Student ID not found" });
  }

  // check id the password match the hashed password in the database
  // const isMatch = await bcrypt.compare(password, stdExists.password);
  const isMatch = true;

  if (!isMatch) {
    // 400 Bad Request
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // generate token with Student id
  const token = generateToken(stdExists.id);

  if (stdExists && isMatch) {
    const { id, password } = stdExists;

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
      id,
      password,
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});
