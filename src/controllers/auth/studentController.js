import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import { generateToken, verifyToken } from "../../helpers/tokenManager.js";
import Student from "../../models/querys/student.js";
import StudentLogin from "../../models/querys/studentLogin.js";
import sendEmail from "../../helpers/sendEmail.js";
import generateOtp from "../../helpers/optGenerater.js";

const cookie_options = {
  path: "/",
  httpOnly: true,
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  sameSite: "strict", // cross-site access --> allow all third-party cookies
  secure: process.env.NODE_ENV == "production" ? true : false,
};

export const loginStudent = asyncHandler(async (req, res) => {
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

  const isMatch = await bcrypt.compare(password, stdExists[0].password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = generateToken(id);

  const { first_name, last_name, email } = stdExists[0];

  res.cookie("token", token, cookie_options);

  res.status(200).json({
    first_name,
    last_name,
    id,
    email,
    token,
  });
});

export const logoutStudent = asyncHandler(async (req, res) => {
  res.clearCookie("token", cookie_options);

  return res.status(200).json({ message: "Logged out" });
});

export const loginStatusStudent = asyncHandler(async (req, res) => {
  if (verifyToken(req.cookies.token)) {
    return res.status(200).json(true);
  } else {
    return res.status(401).json(false);
  }
});

export const sendOtpStudent = asyncHandler(async (req, res) => {
  const { id, reason } = req.body;

  if (!id || !reason) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let email_subject = "";
  let template = "";

  if (reason === "to_active") {
    email_subject = "OTP for Student ID Activation";
    template = "activeAccount";
  } else if (reason === "to_reset_password") {
    email_subject = "OTP for Student ID Password Reset";
    template = "resetPassword";
  } else {
    return res.status(400).json({
      message: "Invalid reason",
    });
  }

  const std = await Student.findById(id);
  const stdLogin = await StudentLogin.findById(id);

  if (!std || std.length < 1 || !stdLogin) {
    return res.status(404).json({ message: "Invalid student ID" });
  }

  if (reason === "to_active" && stdLogin.length > 0) {
    return res.status(401).json({
      message: "Your ID is already active. No need to active it again.",
    });
  }
  if (reason === "to_reset_password" && stdLogin.length < 1) {
    return res
      .status(401)
      .json({ message: "Your ID is not active yet. Active it first." });
  }
  if (std[0].is_dismissed) {
    return res.status(401).json({ message: "Your ID is dismissed!" });
  }

  let otp = generateOtp();

  const resOtpTok = await StudentLogin.findTokenById(id);
  if (!resOtpTok) {
    return res.status(500).json({ message: "Unable to send OTP" });
  }

  if (resOtpTok.length == 0) {
    const result = await StudentLogin.insertOpt(id, otp);
    if (!result) {
      return res.status(500).json({ message: "Unable to send OTP" });
    }
  } else {
    if (
      new Date() > new Date(resOtpTok[0].expired_date) ||
      resOtpTok[0].try_count >= 3
    ) {
      const result = await StudentLogin.updateOtp(id, otp);
      if (!result) {
        return res.status(500).json({ message: "Unable to send OTP" });
      }
    } else {
      otp = resOtpTok[0].token;
    }
  }

  const details = {
    subject: email_subject,
    send_to: std[0].email, // user email
    reply_to: "noreply@gmail.com", // noreply email
    template: template,
    name: std[0].first_name + " " + std[0].last_name,
    token: opt,
  };

  const info = await sendEmail(details);
  if (!info) {
    return res.status(500).json({ message: "Error sending OTP" });
  }

  if (info.accepted.length > 0) {
    return res.status(200).json({
      message: `OTP sent successfully to ${std[0].email}`,
    });
  }

  return res.status(200).json({ message: "OTP sent successfully" });
});
