const CustomApiError = require("./custom-error");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");
const ForbiddenError = require("./forbidden-error");

module.exports = {
  CustomApiError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  ForbiddenError,
};
