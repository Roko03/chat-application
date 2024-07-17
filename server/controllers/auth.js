const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Korisnik uspješno kreiran", user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Molimo unesite email ili šifru");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Korisnik ne postoji");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Netočna šifra");
  }

  req.session.userId = user._id;
  res.set("Set-Cookie", `session=${req.session.id}`);
  res
    .status(StatusCodes.OK)
    .json({ message: "Uspješno prijavljen", sessionId: req.session.id });
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw new UnauthenticatedError("Nešto je pošlo po krivu");
    }

    res.set("Set-Cookie", `session=; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    res.status(StatusCodes.OK).json({ message: "Korisnik uspješno odjavljen" });
  });
};

module.exports = {
  register,
  login,
  logout,
};
