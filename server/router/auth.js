const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getUser,
  refreshSession,
} = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").get(getUser).post(login);

router.route("/refresh").post(refreshSession);

router.route("/logout").post(logout);

module.exports = router;
