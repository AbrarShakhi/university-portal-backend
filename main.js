import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "node:fs";
import cookieParser from "cookie-parser";
import path from "node:path";

import database from "./src/db/database.js";
import ErrorHandler from "./src/middleware/errorhandler.js";

/**
SERVER_PORT
JWT_SECRET
DB_USER
DB_HOST
DB_NAME
DB_PASSWORD
DB_PORT
CLIENT_URL
APP_EMAIL
EMAIL_PASS
NODE_ENV
 */

class Main {
  constructor() {
    dotenv.config();

    this.app = express();
    this.subRoute = "/api/v1";

    this.port = process.env.SERVER_PORT;
    this.route_dir = path.join(process.cwd(), "src", "routes");

    this.#init();
  }

  #init() {
    this.app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(ErrorHandler.handleError);

    fs.readdirSync(this.route_dir).forEach((file) => {
      import(path.join(this.route_dir, file))
        .then((route) => {
          this.app.use(this.subRoute, route.default);
        })
        .catch((err) => {
          console.log("Failed to load route file", err);
        });
    });
  }

  async start() {
    try {
      await database.connect();

      this.app.listen(this.port, () => {
        console.log(`Server is running on this.port ${this.port}`);
      });
    } catch (error) {
      console.log("Failed to start server database.....", error.message);
      process.exit(1);
    }
  }
}

new Main().start();
