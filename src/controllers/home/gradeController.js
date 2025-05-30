import asyncHandler from "express-async-handler";

import GradeReport from "../../models/gradeReport.js";
import CgpaCalculator from "../../utility/cgpaCalculator.js";

export default class gradeController {
  static report() {
    return asyncHandler(async (req, res) => {
      if (!req.std) {
        return res
          .status(401)
          .json({ message: "Not authorized, please login!" });
      }

      const { id } = req.std;
      const reportRes = await GradeReport.report(id);

      if (!reportRes) {
        return res.status(501).json({
          message: "Something wend wrong",
        });
      }

      const semesterCGPA =
        CgpaCalculator.calculateFromSQLForEachSemesterYear(reportRes);
      const totalCGPA = CgpaCalculator.calculateFromSQL(reportRes);

      return res.status(200).json({
        success: true,
        data: {
          courses: reportRes,
          semesterWiseResults: semesterCGPA,
          cumulativeCGPA: totalCGPA,
        },
      });
    });
  }
}
