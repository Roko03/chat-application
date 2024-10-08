const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  await User.create({ ...req.body });

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Korisnik uspješno kreiran" });
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
  res.status(StatusCodes.OK).send({ message: "Uspješna prijava", user });
};

const logout = async (req, res) => {
  if (!req.session.userId) {
    throw new NotFoundError("Korisnik ne postoji");
  }

  req.session.destroy((err) => {
    if (err) {
      throw new UnauthenticatedError("Nešto je pošlo po krivu");
    }

    res.clearCookie("sessionId");
    res.status(StatusCodes.OK).json({ message: "Korisnik uspješno odjavljen" });
  });
};

const getUser = async (req, res) => {
  const userId = req.session.userId;
  const { sessionId } = req.cookies;

  if (!sessionId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Sesija ne postoji" });
  }

  const user = await User.findOne({ _id: userId }).select(
    "_id username email password"
  );

  if (!user) {
    throw new NotFoundError("Korisnik ne postoji");
  }

  res.status(StatusCodes.OK).json({ user });
};

const refreshSession = async (req, res) => {
  const { sessionId } = req.cookies;

  if (!sessionId || !req.session.userId) {
    throw new NotFoundError("Sesija ne postoji");
  }

  return req.session.regenerate((err) => {
    if (err) {
      throw new UnauthenticatedError("Nešto je pošlo po krivu");
    }

    res.status(StatusCodes.OK).send(req.session.userId);
  });
};

module.exports = {
  register,
  login,
  logout,
  getUser,
  refreshSession,
};
