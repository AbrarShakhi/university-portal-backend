import asyncHandler from "express-async-handler";
import { stdLoginMdl } from "../../models/auth/studentModel.js";

export const stdLoginCtrl = asyncHandler(async (req, res) => {
  const rows = await stdLoginMdl.GetFromTest();
  if (rows) {
    res.status(200).json(rows);
  } else {
    res.status(404).json({ message: "Unable to get data" });
  }
});
