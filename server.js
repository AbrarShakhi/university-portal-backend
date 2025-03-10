import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import errorHandler from "./src/helpers/errorhandler.js";

const subRoute = "/api/debug";

function useRoutes(routeDir, app) {
  const routeFiles = fs.readdirSync(routeDir);

  routeFiles.forEach((file) => {
    // use dynamic import
    import(`${routeDir}/${file}`)
      .then((route) => {
        app.use(subRoute, route.default);
      })
      .catch((err) => {
        console.log("Failed to load route file", err);
      });
  });
}

function initServer() {
  dotenv.config();
  const port = process.env.SERVER_PORT || 8000;
  const app = express();

  // middleware
  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  // error handler middleware
  app.use(errorHandler);
  useRoutes("./src/routes", app);

  return async () => {
    try {
      await connect();

      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.log("Failed to start server.....", error.message);
      process.exit(1);
    }
  };
}

const server = initServer();
server();
