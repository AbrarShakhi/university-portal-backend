import Student from "../models/querys/student.js";
import { verifyToken } from "../helpers/tokenManager.js";
import StudentLogin from "../models/querys/studentLogin.js";

export async function protect(req, res, next) {
  try {
    const { id } = req.body;
    const stat = verifyToken(req.cookies.token);

    const stdExists = await Student.findById(id);
    if (!stdExists && stdExists.length < 1) {
      return res.status(404).json({ message: "Invalid student ID" });
    }

    const stdLogin = await StudentLogin.findById(id);
    if (!stdLogin || stdLogin.length < 1) {
      return res
        .status(401)
        .json({ message: "Your ID is not active yet. Active it first." });
    }

    if (stdExists[0].is_dismissed) {
      return res.status(401).json({ message: "Your ID is dismissed!" });
    }

    if (!stat) {
      return res.status(401).json({ message: "Not authorized, please login!" });
    }

    req.std = stdExists[0];
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed!" });
  }
}
