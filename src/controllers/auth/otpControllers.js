import asyncHandler from "express-async-handler";

import Student from "./../../querys/student.js";
import StudentLogin from "./../../querys/studentLogin.js";
import sendEmail from "../../utility/emailManager.js";
import OtpManager from "../../utility/otpManager.js";

export default class OtpController {
  static sendOtpStudent() {
    return asyncHandler(async (req, res) => {
      const { id } = req.body;
      const { reason } = req.params;

      if (!id || !reason) {
        return res.status(400).json({ message: "All fields are required" });
      }

      let email_subject = "";
      let template = "";

      if (reason === "to_active") {
        email_subject = "Activate your Student Accout";
        template = "activeAccount";
      } else if (reason === "to_reset_password") {
        email_subject = "OTP for Student Password Reset";
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

      let otp = OtpManager.generateOtp();

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
        token: otp,
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

      return res.status(200).json({ message: "NO email sentss" });
    });
  }

  static activateAccountStudent() {
    return asyncHandler(async (req, res) => {
      const { id, password } = req.body;
      const { otp } = req.params;

      if (!id || !otp) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const std = await Student.findById(id);
      if (!std || std.length < 1) {
        return res.status(404).json({ message: "Invalid student ID" });
      }
      if (std[0].is_dismissed) {
        return res.status(401).json({ message: "Your ID is dismissed!" });
      }
      const stdLogin = await StudentLogin.findById(id);
      if (stdLogin && stdLogin.length > 0) {
        return res.status(401).json({
          message: "Your ID is already active. No need to active it again.",
        });
      }
      const storedOtp = await StudentLogin.findTokenById(id);
      if (!storedOtp || storedOtp.length < 1) {
        return res.status(401).json({ message: "Invalid OTP" });
      }
      const { otpStat, err_msg } = OtpManager.validateOtp(storedOtp[0], otp);
      if (otpStat === true) {
        if (!StudentLogin.insertStudent(id, password)) {
          return res.status(500).json({ message: "Unable to active account" });
        }
        StudentLogin.deleteToken(id);
        return res.status(200).json({
          message: "Account activated successfully",
        });
      }
      StudentLogin.incrementTryCount(id);
      return res.status(401).json({ message: err_msg });
    });
  }

  static forgetPasswordStudent() {
    return asyncHandler(async (req, res) => {
      const { id, password } = req.body;
      const { otp } = req.params;

      if (!id || !otp || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const std = await Student.findById(id);
      if (!std || std.length < 1) {
        return res.status(404).json({ message: "Invalid student ID" });
      }

      const stdLogin = await StudentLogin.findById(id);
      if (!stdLogin || stdLogin.length < 1) {
        return res.status(401).json({ message: "Your ID is not active yet." });
      }
      if (std[0].is_dismissed) {
        return res.status(401).json({ message: "Your ID is dismissed!" });
      }

      const passRes = isValidPassword(password);
      if (passRes !== true) {
        return res.status(400).json({ message: passRes });
      }

      const storedOtp = await StudentLogin.findTokenById(id);
      if (!storedOtp || storedOtp.length < 1) {
        return res.status(401).json({ message: "Invalid OTP" });
      }
      const { otpStat, err_msg } = OtpManager.validateOtp(storedOtp[0], otp);
      if (otpStat === true) {
        if (!StudentLogin.updateById(id, password)) {
          return res.status(500).json({ message: "Unable change password" });
        }
        StudentLogin.deleteToken(id);
        return res.status(200).json({
          message: "password changed successfully",
        });
      }
      StudentLogin.incrementTryCount(id);
      return res.status(401).json({ message: err_msg });
    });
  }
}
