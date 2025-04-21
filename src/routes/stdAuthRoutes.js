import express from "express";

import {
  loginStudent,
  logoutStudent,
  loginStatusStudent,
  sendOtpStudent,
  activateAccountStudent,
  forgetPasswordStudent,
} from "../controllers/auth/studentController.js";
import { changePasswordStudent } from "../controllers/auth/protectedStudentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginStudent);
router.get("/logout", logoutStudent);
router.get("/login-status", loginStatusStudent);

router.patch("/resend-otp/reason=:reason", sendOtpStudent);

router.patch("/change-password", protect, changePasswordStudent);
router.post("/activate-account/otp=:otp", activateAccountStudent);
router.post("/forgot-password/otp=:otp", forgetPasswordStudent);

export default router;
