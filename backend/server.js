import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import errorHandler from "./src/helpers/errorhandler.js";

function initServer() {
  dotenv.config();
  const port = process.env.PORT || 8000;
  const app = express();

  // middleware
  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  // error handler middleware
  app.use(errorHandler);

  return async () => {
    try {
      await connect();

      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.log("Failed to strt server.....", error.message);
      process.exit(1);
    }
  };
}

const server = initServer();
server();
