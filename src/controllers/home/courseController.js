import asyncHandler from "express-async-handler";

import Courses from "../../models/courses.js";

export default class CourseController {
  static async list() {
    return asyncHandler(async (req, res) => {
      const { dept_short_name, semester, year } = req.params;
      if (!dept_short_name || !semester || !year) {
        return res
          .status(400)
          .json({ message: "Missing required parameters!" });
      }

      const courses = await Courses.list(dept_short_name, semester, year);
      if (!courses) {
        return res.status(404).json({ message: "No courses found!" });
      }
      res.status(200).json(courses);
    });
  }

  static async info() {
    return asyncHandler(async (req, res) => {
      const { course_id, semester, year } = req.params;
      if (!course_id || !semester || !year) {
        return res
          .status(400)
          .json({ message: "Missing required parameters!" });
      }

      const course = await Courses.info(course_id, semester, year);
      if (!course) {
        return res.status(404).json({ message: "Course not found!" });
      }
      res.status(200).json(course);
    });
  }
}
