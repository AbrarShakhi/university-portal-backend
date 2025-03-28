import express from "express";
import asyncHandler from "express-async-handler";

import {
  loginStudent,
  logoutStudent,
  loginStatusStudent,
} from "../controllers/auth/studentController.js";

const router = express.Router();

router.post("/login", asyncHandler(loginStudent));
router.get("/logout", asyncHandler(logoutStudent));
router.get("/login-status", asyncHandler(loginStatusStudent));

export default router;
