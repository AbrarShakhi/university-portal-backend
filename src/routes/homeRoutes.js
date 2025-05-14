import express from "express";

import ClassScheduleController from "./../controllers/home/classScheduleController.js";
import AuthMiddleware from "./../middleware/authMiddleware.js";

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

    this.#router.get("/tution-fees", AuthMiddleware.protect());
    this.#router.get("/tution-history", AuthMiddleware.protect());

    this.#router.get("/std-profile", AuthMiddleware.protect());

    this.#router.get("/list-faculty", AuthMiddleware.protect());
    this.#router.get("/info-faculty", AuthMiddleware.protect());

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
