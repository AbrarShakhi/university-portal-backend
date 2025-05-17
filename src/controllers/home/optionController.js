import asyncHandler from "express-async-handler";

import Options from "../../models/options.js";

export default class OptionController {
  static currentSemester() {
    return asyncHandler(async (req, res) => {
      if (!req.std) {
        return res
          .status(401)
          .json({ message: "Not authorized, please login!" });
      }
      const option = await Options.get();
      if (!option) {
        return res
          .status(404)
          .json({ message: "Current semester not found!" });
      }
      const { season, year } = option;
      res.status(200).json({ season, year });
    });
  }

  static isAdvising() {
    return asyncHandler(async (req, res) => {
        if (!req.std) {
            return res
              .status(401)
              .json({ message: "Not authorized, please login!" });
      }

      const option = await Options.get();
      if (!option) {
        return res
          .status(404)
          .json({ message: "Options not found!" });
      }
      const { is_advising } = option;
      res.status(200).json({ is_advising });
    });
  }

  static isFacEval() {
    return asyncHandler(async (req, res) => {
        if (!req.std) {
            return res
              .status(401)
              .json({ message: "Not authorized, please login!" });
      }

      const option = await Options.get();
      if (!option) {
        return res
          .status(404)
          .json({ message: "Options not found!" });
      }
      const { is_fac_eval } = option;
      res.status(200).json({ is_fac_eval });
    });
  }
}
