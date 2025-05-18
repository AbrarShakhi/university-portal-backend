import asyncHandler from "express-async-handler";

import FacultyEval from "../../models/facultyEval.js";
import Options from "../../models/options.js";

export default class FacultyEvalController {
  static list() {
    return asyncHandler(async (req, res) => {
      if (!req.std) {
        return res
          .status(401)
          .json({ message: "Not authorized, please login!" });
      }
      const { id } = req.std;
      const { year, season } = await Options.get();
      const faculty = await FacultyEval.list(id, year, season);
      if (!faculty) {
        return res.status(404).json({ message: "No faculty found!" });
      }
      res.status(200).json(faculty);
    });
  }

  static evaluate() {
    return asyncHandler(async (req, res) => {
      if (!req.std) {
        return res
          .status(401)
          .json({ message: "Not authorized, please login!" });
      }
      const { id } = req.std;
      const { faculty_short_id } = req.params;
      const { rating } = req.body;
      const { year, season } = await Options.get();
      const facultyList = await FacultyEval.list(id, year, season);
      if (!facultyList.includes(faculty_short_id)) {
        return res
          .status(403)
          .json({ message: "You can not evaluate this faculty!" });
      }
      if (rating < 0 || rating > 10) {
        return res
          .status(400)
          .json({ message: "Rating must be between 0 and 10!" });
      }
      const evalRes = await FacultyEval.evaluate(
        id,
        faculty_short_id,
        rating,
        year,
        season,
      );
      if (!evalRes) {
        return res.status(404).json({ message: "No evaluation found!" });
      }
      res.status(200).json({ message: "Evaluation submitted successfully" });
    });
  }
}
