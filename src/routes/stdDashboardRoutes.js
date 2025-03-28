import express from "express";
import asyncHandler from "express-async-handler";

import { classSchedule } from "../controllers/dashboard/studentDashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/class-schedule",
  asyncHandler(protect),
  asyncHandler(classSchedule),
);

export default router;
