import express from "express";

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
router.post("/login", studentLoginHandler);

/**
 * @requires None
 * @response Cookie
 */
router.get("/logout", logoutHandler);

/**
 *
 */
router.post("/activate", studentActivateHandler);
export default router;
