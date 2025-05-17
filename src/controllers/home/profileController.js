import asyncHandler from "express-async-handler";
import StudentProfile from "../../models/studentProfile.js";

export default class ProfileController {
  static profile() {
    return asyncHandler(async (req, res) => {
      if (!req.std) {
        return res
          .status(401)
          .json({ message: "Not authorized, please login!" });
      }
      const { id } = req.std;
      const result = await StudentProfile.getAll(id);
      if (!result) {
        return res.status(404).json({ message: "Student profile not found!" });
      }

      res.status(200).json(result);
    });
  }
}
