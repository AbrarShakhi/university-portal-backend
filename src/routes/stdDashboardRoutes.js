import express from "express";
import asyncHandler from "express-async-handler";

import { classSchedule } from "../controllers/dashboard/studentDashboardController.js";
import { TokenVerify } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/class-schedule", TokenVerify, classSchedule);

export default router;
