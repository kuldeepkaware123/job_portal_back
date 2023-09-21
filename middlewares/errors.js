exports.generatedErrors = (err, eq, res, next) => {
  const statusCode = err.statusCode || 500;

  if (err.name === "MongoServerError" && err.message.includes("E11000")) {
    err.message = "User is with this email already exists";
  }

  res.status(statusCode).json({
    message: err.message,
    errName: err.name,
  });
};
