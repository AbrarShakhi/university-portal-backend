import express from "express";
import asyncHandler from "express-async-handler";

import {
  studentLoginHandler,
  logoutHandler,
  studentActivateHandler,
} from "../controllers/auth/studentController.js";

const router = express.Router();

/**
 * @requires { id: "****-*-**-***", password: "*******" }
 * @response
 */
router.post("/login", asyncHandler(studentLoginHandler));

/**
 * @requires None
 * @response Cookie
 */
router.get("/logout", asyncHandler(logoutHandler));

/**
 *
 */
router.post("/activate", asyncHandler(studentActivateHandler));

export default router;
