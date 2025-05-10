import express from "express";

import studentDashboardController from "../controllers/dashboard/studentDashboardController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

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
      studentDashboardController.classSchedule(),
    );
  }

  getRouter() {
    return this.#router;
  }
}

const router = new StdAuthRoutes().getRouter();
export default router;
