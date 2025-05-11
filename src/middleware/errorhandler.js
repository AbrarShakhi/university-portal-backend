export default class ErrorHandler {
  static handleError(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }

    const statusCode =
      res.statusCode && res.statusCode >= 400 ? res.statusCode : 500;
    res.status(statusCode);

    if (process.env.NODE_ENV !== "production") {
      console.log(err);
    }

    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
}
