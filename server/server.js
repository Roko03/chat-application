const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");

app.get("/", (req, res) => {
  res.json("Ej");
});

app.use(notFoundMiddleware);
