import asyncHandler from "express-async-handler";

import StudentLedger from "../../models/studentLedger.js";

export default class AccountLedgerController {
  /**
   * @method GET
   */
  static tuitionHistory() {
    return asyncHandler(async (req, res) => {
      if (!req.std) {
        return res
          .status(401)
          .json({ message: "Not authorized, please login!" });
      }
      const { id } = req.std;
      const history = await StudentLedger.tuitionHistory(id);
      if (!history) {
        return res
          .status(404)
          .json({ message: "No tuition history found!" });
      }
      res.status(200).json(history);
    });
  }
  /**
   * @method GET
   */
  static tuitionFees() {
    return asyncHandler(async (req, res) => {
      if (!req.std) {
        return res
          .status(401)
          .json({ message: "Not authorized, please login!" });
      }
      const { id } = req.std;
      const fees = await StudentLedger.tuitionFees(id);
      if (!fees) {
        return res
          .status(404)
          .json({ message: "No tuition fees found!" });
      }
      res.status(200).json(fees);
    });
  }
}
