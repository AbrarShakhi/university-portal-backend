import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

import { generateToken } from "../../helpers/tokenManager.js";
import { StudentLogin } from "../../models/auth/studentLogin.js";

export async function studentActivateHandler(req, res) {
  const { id, password } = req.body;

  // validation
  if (!id || !password) {
    // 400 Bad Request
    return res.status(400).json({ message: "All fields are required" });
  }

  // check password length
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  // check if Student id not found
  const stdExists = await StudentLogin.findById(id);

  if (!stdExists) {
    return res.status(404).json({ message: "Student ID not found" });
  }

  /**
   * @todo: Need to do verify with phone
   */

  // Update with hashed password
  const db_result = await StudentLogin.updateById(id, {
    password,
    is_active: true,
  });

  if (!db_result) {
    return res.status(400).json({ message: "Unable to active account" });
  }

  // generate token with user id
  const token = generateToken(id);

  // set the token in the cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "none", // cross-site access --> allow all third-party cookies
    secure: true,
  });

  // 201 Created
  res.status(201).json({
    id,
  });
}

export async function studentLoginHandler(req, res) {
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
    return res.status(404).json({ message: "Student ID not found" });
  }

  if (!stdExists.is_active) {
    return res
      .status(400)
      .json({ message: "Your ID is not active yet. Active it first." });
  }

  // check if the password matches the hashed password in the database
  const isMatch = await bcrypt.compare(password, stdExists.password);

  if (!isMatch) {
    // 400 Bad Request
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // generate token with Student id
  const token = generateToken(id);

  if (stdExists && isMatch) {
    const { id, is_active } = stdExists;

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
      is_active,
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
}

export async function logoutHandler(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  });

  return res.status(200).json({ message: "User logged out" });
}
