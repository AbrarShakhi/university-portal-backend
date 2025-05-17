import asyncHandler from "express-async-handler";

import Faculty from "../../models/faculty.js";

export default class FacultyController {
  static list() {
    return asyncHandler(async (req, res) => {
      const faculties = await Faculty.list();
      if (!faculties) {
        return res.status(404).json({ message: "No faculties found!" });
      }
      res.status(200).json(faculties);
    });
  }

  static info() {
    return asyncHandler(async (req, res) => {
      const { faculty_short_id } = req.params;
      const faculty = await Faculty.info(faculty_short_id);
      if (!faculty) {
        return res.status(404).json({ message: "Faculty not found!" });
      }
      res.status(200).json(faculty);
    });
  }

  static teaches() {
    return asyncHandler(async (req, res) => {
      const { faculty_short_id, semester, year } = req.params;
      if (!faculty_short_id || !semester || !year) {
        return res
          .status(400)
          .json({ message: "Missing required parameters!" });
      }

      const teaches = await Faculty.teaches(faculty_short_id, semester, year);
      if (!teaches) {
        return res.status(404).json({ message: "No teaches found!" });
      }
      res.status(200).json(teaches);
    });
  }
}
