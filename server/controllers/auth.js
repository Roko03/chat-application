const { BadRequestError, NotFoundError } = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Korisnik uspješno kreiran", user });
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
