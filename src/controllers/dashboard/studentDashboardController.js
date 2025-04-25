import asyncHandler from "express-async-handler";

import studentDashboard from "../../querys/studentDashboard.js";

export const classSchedule = asyncHandler(async (req, res) => {
  if (!req.std) {
    return res.status(401).json({ message: "Not authorized, please login!" });
  }
  const { id } = req.std;
  const { semester_year, semester_season } = req.body;
  if (!semester) {
    return res.status(400).json({ message: "Semester is required!" });
  }
  // Assuming you have a function to get the class schedule
  const schedule = await studentDashboard.getClassSchedule(
    id,
    semester_year,
    semester_season,
  );
});
