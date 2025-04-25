import express from "express";

import {
  loginStudent,
  logoutStudent,
} from "../controllers/auth/private/loginControllers.js";
import {
  sendOtpStudent,
  activateAccountStudent,
  forgetPasswordStudent,
} from "../controllers/auth/private/otpControllers.js";
import { homeStudent } from "../controllers/auth/public/homeController.js";
import { changePasswordStudent } from "../controllers/auth/public/passwordController.js";
import { TokenVerify } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginStudent);
router.get("/logout", logoutStudent);

router.patch("/resend-otp/reason=:reason", sendOtpStudent);

router.patch("/change-password", TokenVerify, changePasswordStudent);
router.post("/activate-account/otp=:otp", activateAccountStudent);
router.post("/forgot-password/otp=:otp", forgetPasswordStudent);

router.get("/std-home", TokenVerify, homeStudent);

export default router;
