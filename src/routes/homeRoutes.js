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

    this.#router.get("/all-instructor", AuthMiddleware.protect());
  }

  getRouter() {
    return this.#router;
  }
}

const router = new StdAuthRoutes().getRouter();
export default router;
