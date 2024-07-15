const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlewMiddleware = require("./middleware/error-handler");

app.get("/", (req, res) => {
  res.json("Ej");
});

app.use(notFoundMiddleware);
app.use(errorHandlewMiddleware);
