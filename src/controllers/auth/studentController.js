import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

import { generateToken } from "../../helpers/tokenManager.js";
import Student from "../../models/querys/student.js";
import StudentLogin from "../../models/querys/studentLogin.js";

export async function activate(req, res) {
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

export async function login(req, res) {
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
    email,
    token,
  });
}

export async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  });

  return res.status(200).json({ message: "Logged out" });
}
