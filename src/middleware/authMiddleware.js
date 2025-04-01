import Student from "../models/querys/student.js";
import { verifyToken } from "../helpers/tokenManager.js";
import StudentLogin from "../models/querys/studentLogin.js";

export async function protect(req, res, next) {
  try {
    const { id } = req.body;
    const stat = verifyToken(req.cookies.token);

    const stdLogin = await StudentLogin.findById(id);
    if (!stdLogin) {
      return res.status(404).json({ message: "Invalid student ID" });
    }
    if (!stdLogin.is_active) {
      return res
        .status(401)
        .json({ message: "Your ID is not active yet. Active it first." });
    }
    if (stdLogin.is_dismissed) {
      return res.status(401).json({ message: "Your ID is dismissed!" });
    }

    if (!stat) {
      return res.status(401).json({ message: "Not authorized, please login!" });
    }

    const std = await Student.findById(id);
    // check if std exists
    if (!std) {
      return res.status(404).json({ message: "Student not found!" });
    }

    // set student details in the request object
    req.std = std;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed!" });
  }
}
