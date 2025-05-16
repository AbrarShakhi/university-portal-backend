import asyncHandler from "express-async-handler";

import studentDashboard from "../../models/studentSchedule.js";

export default class ClassScheduleController {
  /**
   * @method GET
   */
  static classSchedule() {
    return asyncHandler(async (req, res) => {
      if (!req.std) {
        return res
          .status(401)
          .json({ message: "Not authorized, please login!" });
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

    if (schedule) {
      return res.status(200).json({
        message: "Class schedule retrieved successfully",
        data: schedule,
      });
    } else {
      return res.status(404).json({ message: "Class schedule not found" });
    }
  }
}
