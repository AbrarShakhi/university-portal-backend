import asyncHandler from "express-async-handler";
import { Test } from "../../models/auth/query.studuent.js";

export const selectTestDB = asyncHandler(async (req, res) => {
  const rows = await Test.GetFromTest();
  if (rows) {
    res.status(200).json(rows);
  } else {
    res.status(404).json({ message: "rows not found" });
  }
});

export const insertTestDB = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const db_res = await Test.InsertTest(name);

  if (db_res) {
    res.status(201).json({ message: `${name} added succesfully` });
  } else {
    res.status(404).json({ message: `${name} add unsucessfull` });
  }
});

export const deleteTestDB = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const db_res = await Test.DeleteTest(id);
  if (db_res) {
    res.status(201).json({ message: `${id} deleted` });
  } else {
    res.status(404).json({ message: `${id} not deleted` });
  }
});
