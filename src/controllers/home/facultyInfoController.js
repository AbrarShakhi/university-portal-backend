import asyncHandler from "express-async-handler";

import studentDashboard from "../../querys/studentDashboard.js";

export default class FacultyInfoController {
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
      const { faculty_short_id } = req.body;
      if (!faculty_short_id) {
        return res
          .status(400)
          .json({ message: "faculty_short_id is required!" });
      }
      // Assuming you have a function to get the class schedule
      const schedule = await studentDashboard.getClassSchedule(
        id,
        semester_year,
        semester_season,
      );
    });
  }
}
