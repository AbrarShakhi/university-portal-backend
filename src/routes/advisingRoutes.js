import express from "express";

import AuthMiddleware from "../middleware/authMiddleware.js";

class StdAuthRoutes {
  #router = undefined;

  constructor() {
    this.#router = express.Router();
    this.#initializeRoutes();
  }

  #initializeRoutes() {}

  getRouter() {
    return this.#router;
  }
}

const router = new StdAuthRoutes().getRouter();
export default router;
