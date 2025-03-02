import asyncHandler from "express-async-handler";
import { Test } from "../../models/auth/query.studuent.js";

export const selectTestDB = asyncHandler(async (req, res) => {
  const rows = await Test.GetFromTest();
  if (rows) res.status(200).json(rows);
  else res.status(404).json({ message: "rows not found" });
});

export const insertTestDB = asyncHandler(async (req, res) => {
  const { name } = req.body;
  Test.InsertTest(name);
  res.status(201).json({ message: `${name} added succesfully` });
});

export const deleteTestDB = asyncHandler(async (req, res) => {
  const { id } = req.body;
  Test.DeleteTest(id);
  res.status(201).json({ message: `${id} deleted` });
});
