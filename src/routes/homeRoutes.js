import express from "express";

import ClassScheduleController from "./../controllers/home/classScheduleController.js";
import AuthMiddleware from "./../middleware/authMiddleware.js";
import AccountLedgerController from "./../controllers/home/accountLedgerController.js";
import ProfileController from "../controllers/home/profileController.js";
import FacultyController from "../controllers/home/facultyController.js";
import CourseController from "../controllers/home/courseController.js";
import gradeController from "../controllers/home/gradeController.js";
import OptionController from "../controllers/home/optionController.js";

class StdAuthRoutes {
  #router = undefined;

  constructor() {
    this.#router = express.Router();
    this.#initializeRoutes();
  }

  #initializeRoutes() {
    /**
     * @TAKES: { semester_year, semester_season } = req.body;
     * @returns: { message: "Class schedule retrieved successfully", data: schedule (array) }
     */
    this.#router.get(
      "/class-schedule",
      AuthMiddleware.protect(),
      ClassScheduleController.classSchedule(),
    );

    /**
     * @TAKES: NOTHING
     * @returns: {totalFees: 343, totalPaid: 53, dueAmount: 67, currency: 'BDT'}
     */
    this.#router.get(
      "/tution-fees",
      AuthMiddleware.protect(),
      AccountLedgerController.tuitionFees(),
    );
    /**
     * @TAKES: NOTHING
     * @returns: {array of objects}
     */
    this.#router.get(
      "/tution-history",
      AuthMiddleware.protect(),
      AccountLedgerController.tuitionHistory(),
    );

    /**
     * @TAKES: NOTHING
     * @returns: only one objects
     */
    this.#router.get(
      "/std-profile",
      AuthMiddleware.protect(),
      ProfileController.profile(),
    );

    /**
     * @TAKES: NOTHING
     * @returns: {array of objects}
     */
    this.#router.get(
      "/list-faculty",
      AuthMiddleware.protect(),
      FacultyController.list(),
    );
    /**
     * @TAKES:  { faculty_short_id } = req.params;
     * @returns: only one object
     */
    this.#router.get(
      "/info-faculty/:faculty_short_id",
      AuthMiddleware.protect(),
      FacultyController.info(),
    );
    /**
     * @TAKES: { faculty_short_id, semester, year } = req.params;
     * @returns: {array of objects}
     */
    this.#router.get(
      "/teaches/:faculty_short_id/:semester/:year",
      AuthMiddleware.protect(),
      FacultyController.teaches(),
    );

    /**
     * @TAKES: { dept_short_name, semester, year } = req.params;
     * @returns: {array of objects}
     */
    this.#router.get(
      "/list-courses/:dept_short_name/:semester/:year",
      AuthMiddleware.protect(),
      CourseController.list(),
    );
    /**
     * @TAKES: { course_id, semester, year } = req.params;
     * @returns: array on objects
     */
    this.#router.get(
      "/info-courses/:course_id/:semester/:year",
      AuthMiddleware.protect(),
      CourseController.info(),
    );

    /**
     * @TAKES: NOTHING
     * @returns: {
          success: true,
          data: { courses: reportRes, semesterWiseResults: semesterCGPA, cumulativeCGPA: totalCGPA}
        }
     */
    this.#router.get(
      "/grade-report",
      AuthMiddleware.protect(),
      gradeController.report(),
    );

    /**
     * @TAKES: NOTHINGS
     * #returns
     */
    this.#router.get(
      "/current-semester",
      AuthMiddleware.protect(),
      OptionController.currentSemester(),
    );
    /**
     * @TAKES: NOTHINGS
     * @returns: Boolean
     */
    this.#router.get(
      "/is-advising",
      AuthMiddleware.protect(),
      OptionController.isAdvising(),
    );
    /**
     * @TAKES: NOTHINGS
     * @returns: Boolean
     */
    this.#router.get(
      "/is-fac-eval",
      AuthMiddleware.protect(),
      OptionController.isFacEval(),
    );

    // this.#router.get("/eval-faculty-list", AuthMiddleware.protect());
  }

  getRouter() {
    return this.#router;
  }
}

const router = new StdAuthRoutes().getRouter();
export default router;
