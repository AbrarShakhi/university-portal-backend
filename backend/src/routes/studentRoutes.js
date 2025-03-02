import express from "express";

import {
  selectTestDB,
  insertTestDB,
  deleteTestDB,
} from "../controllers/auth/studentController.js";

const router = express.Router();

router.get("/test", selectTestDB);
router.post("/test", insertTestDB);
router.delete("/test", deleteTestDB);

export default router;
