import express from "express";

import {
  loginStudent,
  logoutStudent,
  loginStatusStudent,
  sendOtpStudent,
} from "../controllers/auth/studentController.js";
import { changePasswordStudent } from "../controllers/auth/protectedStudentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginStudent);
router.get("/logout", logoutStudent);
router.get("/login-status", loginStatusStudent);

router.post("/resend-otp/:reason", sendOtpStudent);

router.patch("/change-password", protect, changePasswordStudent);
router.post("/activate-account");
router.post("/forgot-password");

export default router;
