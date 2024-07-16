const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Nešto je pošlo po krivu" });
};

module.exports = errorHandlerMiddleware;
