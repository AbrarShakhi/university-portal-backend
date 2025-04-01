import express from "express";
import asyncHandler from "express-async-handler";

import {
  loginStudent,
  logoutStudent,
  loginStatusStudent,
} from "../controllers/auth/studentController.js";
import { changePasswordStudent } from "../controllers/auth/protectedStudentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", asyncHandler(loginStudent));
router.get("/logout", asyncHandler(logoutStudent));
router.get("/login-status", asyncHandler(loginStatusStudent));

router.patch(
  "/change-password",
  asyncHandler(protect),
  asyncHandler(changePasswordStudent),
);

export default router;
