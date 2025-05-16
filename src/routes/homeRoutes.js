import express from "express";

import ClassScheduleController from "./../controllers/home/classScheduleController.js";
import AuthMiddleware from "./../middleware/authMiddleware.js";
import AccountLedgerController from "./../controllers/home/accountLedgerController.js";
import ProfileController from "../controllers/home/profileController.js";
import FacultyController from "../controllers/home/facultyController.js";

class StdAuthRoutes {
  #router = undefined;

  constructor() {
    this.#router = express.Router();
    this.#initializeRoutes();
  }

  #initializeRoutes() {
    this.#router.get(
      "/class-schedule",
      AuthMiddleware.protect(),
      ClassScheduleController.classSchedule(),
    );

    this.#router.get(
      "/tution-fees",
      AuthMiddleware.protect(),
      AccountLedgerController.tuitionFees(),
    );
    this.#router.get(
      "/tution-history",
      AuthMiddleware.protect(),
      AccountLedgerController.tuitionHistory(),
    );

    this.#router.get(
      "/std-profile",
      AuthMiddleware.protect(),
      ProfileController.profile(),
    );

    this.#router.get(
      "/list-faculty",
      AuthMiddleware.protect(),
      FacultyController.list(),
    );
    this.#router.get(
      "/info-faculty/:faculty_short_id",
      AuthMiddleware.protect(),
      FacultyController.info(),
    );
    this.#router.get(
      "/teaches/:faculty_short_id/:semester/:year",
      AuthMiddleware.protect(),
      FacultyController.teaches(),
    );

    this.#router.get("/list-courses", AuthMiddleware.protect());
    this.#router.get("/info-courses", AuthMiddleware.protect());

    this.#router.get("/grade-report", AuthMiddleware.protect());

    this.#router.get("/eval-faculty-list", AuthMiddleware.protect());
  }

  getRouter() {
    return this.#router;
  }
}

const router = new StdAuthRoutes().getRouter();
export default router;
