import express from "express";

import LoginController from "../controllers/auth/loginController.js";
import OtpController from "../controllers/auth/otpControllers.js";
import HomeController from "../controllers/auth/homeController.js";
import PasswordController from "../controllers/auth/passwordController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

class StdAuthRoutes {
  #router = undefined;

  constructor() {
    this.#router = express.Router();
    this.#initializeRoutes();
  }

  #initializeRoutes() {
    this.#router.post("/auth/login", LoginController.loginStudent());
    this.#router.get("/auth/logout", LoginController.logoutStudent());

    this.#router.patch(
      "/auth/resend-otp/reason=:reason",
      OtpController.sendOtpStudent(),
    );

    this.#router.patch(
      "/auth/change-password",
      AuthMiddleware.protect(),
      PasswordController.changePasswordStudent(),
    );
    this.#router.post(
      "/auth/activate-account/otp=:otp",
      OtpController.activateAccountStudent(),
    );
    this.#router.post(
      "/auth/forgot-password/otp=:otp",
      OtpController.forgetPasswordStudent(),
    );

    this.#router.get(
      "/std-home",
      AuthMiddleware.protect(),
      HomeController.homeStudent(),
    );
  }

  getRouter() {
    return this.#router;
  }
}

const router = new StdAuthRoutes().getRouter();
export default router;
