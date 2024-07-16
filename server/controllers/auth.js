const { BadRequestError, NotFoundError } = require("../errors");
const User = require("../models/User");

const register = async (req, res) => {
  res.status(200).json({ message: "Yes" });
};

const login = async (req, res) => {
  res.status(200).json({ message: "Logiran si" });
};

const logout = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
};
