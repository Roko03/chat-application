const express = require("express");
const router = express.Router();

const { createMessage } = require("../controllers/message");

router.route("/:id/message").post(createMessage);

module.exports = router;
