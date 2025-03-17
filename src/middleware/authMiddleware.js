import Student from "../models/querys/student.js";
import { verifyToken } from "../helpers/tokenManager.js";

export async function protect(req, res, next) {
  try {
    const { id } = req.body;
    const stat = verifyToken(req.cookies.token);

    if (!stat) {
      res.status(401).json({ message: "Not authorized, please login!" });
    }

    const std = await Student.findById(id);

    // check if std exists
    if (!std) {
      res.status(404).json({ message: "Student not found!" });
    }

    // set student details in the request object
    req.std = std;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed!" });
  }
}
