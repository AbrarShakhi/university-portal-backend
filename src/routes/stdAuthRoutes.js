import express from "express";

import { StudentLoginHandler } from "../controllers/auth/studentController.js";

const router = express.Router();

/**
 * @requires { id: "****-*-**-***", password: "*******" }
 * @response
 */
router.post("/login", StudentLoginHandler);

export default router;
