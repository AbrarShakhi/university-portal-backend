import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "node:fs";
import cookieParser from "cookie-parser";
import path from "node:path";
import { pathToFileURL } from "node:url";

import database from "./src/db/database.js";
import ErrorHandler from "./src/middleware/errorhandler.js";

class Main {
  constructor() {
    dotenv.config();

    this.app = express();
    this.subRoute = "/api/v1";

    this.port = process.env.SERVER_PORT;
    this.route_dir = path.join(process.cwd(), "src", "routes");

    this.#init();
    this.#useRoutes();
    // this.#useRoutesWindows();
  }

  #useRoutesWindows() {
    fs.readdirSync(this.route_dir).forEach((file) => {
      const filePath = path.join(this.route_dir, file);

      const fileURL = pathToFileURL(filePath).href;

      import(fileURL)
        .then((route) => {
          if (route.default) {
            this.app.use(this.subRoute, route.default);
            console.log(`Successfully loaded route: ${filePath}`);
          } else {
            console.warn(
              `Route file ${filePath} does not have a default export.`,
            );
          }
        })
        .catch((err) => {
          console.error(`Failed to load route file ${filePath}:`, err);
        });
    });
  }

  #useRoutes() {
    fs.readdirSync(this.route_dir).forEach((file) => {
      const filePath = path.join(this.route_dir, file);
      const fileURL = pathToFileURL(filePath).href; // Always convert to file:// URL

      import(fileURL)
        .then((route) => {
          if (route.default) {
            this.app.use(this.subRoute, route.default);
            console.log(`Successfully loaded route: ${filePath}`);
          } else {
            console.warn(
              `Route file ${filePath} does not have a default export.`,
            );
          }
        })
        .catch((err) => {
          console.error(`Failed to load route file ${filePath}:`, err);
        });
    });
  }

  #init() {
    this.app.use(
      cors({
        origin:
          process.env.NODE_ENV === "production"
            ? "your-production-frontend-url"
            : "http://localhost:5173", // or whatever port your frontend runs on
        credentials: true,
      }),
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(ErrorHandler.handleError);
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
