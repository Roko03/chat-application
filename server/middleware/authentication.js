const { UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const userId = req.session.userId;

  if (!userId) {
    throw new UnauthenticatedError("Korisnik nije verificiran");
  }

  next();
};

module.exports = auth;
