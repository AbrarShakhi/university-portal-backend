import express from "express";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get(
  "/test",
  asyncHandler(async (req, res) => {
    res.status(200).json({ message: "HELLo tHERE" });
  })
);

export default router;
