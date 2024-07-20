const express = require("express");
const router = express.Router();

const { getConversation } = require("../controllers/conversation");

router.route("/:id").get(getConversation);

module.exports = router;
