export default function errorHandler(err, req, res, next) {
  // check if response headers have already been sent to the client
  if (res.headersSent) {
    return next(err);
  }

  // set the status code of the response
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
