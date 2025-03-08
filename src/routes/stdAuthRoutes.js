import express from "express";

import { stdLoginCtrl } from "../controllers/auth/studentController.js";

const router = express.Router();

router.get("/login", stdLoginCtrl);

export default router;
