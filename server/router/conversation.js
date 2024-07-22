const express = require("express");
const router = express.Router();

const {
  getConversation,
  makeConversation,
} = require("../controllers/conversation");

router.route("/:id").get(getConversation).post(makeConversation);

module.exports = router;
