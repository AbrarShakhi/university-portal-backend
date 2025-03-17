import express from "express";
import asyncHandler from "express-async-handler";

import {
  login,
  logout,
  activate,
} from "../controllers/auth/studentController.js";

const router = express.Router();


router.post("/login", asyncHandler(login));
router.get("/logout", asyncHandler(logout));
router.post("/activate", asyncHandler(activate));

export default router;
